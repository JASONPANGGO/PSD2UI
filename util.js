const path = require('path');
const fs = require("fs-extra");
const os = require('os');
const { execSync } = require('child_process');
const prettyBytes = require('pretty-bytes');

const config = require('./config');
const { createCanvas, Image } = require('canvas');
const { projectName } = require('./config');



function hasArg(argName) {
    return process.argv.indexOf(argName) !== -1
}

function getArg(argName) {
    if (hasArg(argName)) {
        return process.argv[process.argv.indexOf(argName) + 1]
    }
}

module.exports = {
    /**
     * Fast UUID generator, RFC4122 version 4 compliant.
     * @author Jeff Ward (jcward.com).
     * @license MIT license
     * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
     **/
    uuid: function () {
        var self = {};
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        self.generate = function () {
            var str = '';
            for (var i = 0; i < 12; i++) {
                str += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            var num = (new Date().getTime() % 1000).toString();
            if (num.length == 1)
                num = "00" + num;
            else if (num.length == 2)
                num = "0" + num;
            return str + num;
        };

        return self;
    },
    /**
     * Creates and returns an RFC4122 version 4 compliant UUID.
     * 
     * The string is in the form: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` where each `x` is replaced with a random
     * hexadecimal digit from 0 to f, and `y` is replaced with a random hexadecimal digit from 8 to b.
     *
     * @function Phaser.Utils.String.UUID
     * @since 3.12.0
     *
     * @return {string} The UUID string.
     */
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = (c === 'x') ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    },
    /**
     * via qici引擎
     * 
     * 颜色的描述
     * 颜色值，可以是：
     * '#FFFFFF' '#ffffff' - 十六进制描述的字符串，不带alpha
     * '#00FFFFFF' '#00ffffff' - 十六进制描述的字符串，带alpha
     * [128, 10, 0] - 数组描述
     * [11, 128, 0, 0.5] - 数组描述
     * @param {number | undefined} color
     */
    Color: function (color) {
        this.alpha = 1;
        this._rgb = [0xFF, 0xFF, 0xFF];
        if (color == null) return;

        if (typeof color === 'number') {
            this._rgb[0] = color >> 16 & 0xFF;

            this._rgb[1] = color >> 8 & 0xFF;
            this._rgb[2] = color & 0xFF;
            this.alpha = (color >>> 24) / 255;
        } else if (color instanceof Array) {
            this.rgb = color;
        } else
            throw new Error('Invalid color');

        // 转换成场景需要的数字
        this.toNumber = function (alpha) {
            if (alpha)
                return ((this.alpha * 255) << 24 |
                    this.rgb[0] << 16 |
                    this.rgb[1] << 8 |
                    this.rgb[2]) >>> 0;

            return (this.rgb[0] << 16 |
                this.rgb[1] << 8 |
                this.rgb[2]) >>> 0;
        };
    },

    tranSrc: function (item) {
        let saveUrl = item.name
        saveUrl = saveUrl.replace(/@.*\./g, '.')
        if (item.group) {
            saveUrl = path.join(item.group, saveUrl)
        }
        if (saveUrl.match(/^lang/)) {
            saveUrl = path.join('lang', saveUrl)
        }
        if (saveUrl.match(/^xlz/)) {
            saveUrl = path.join(saveUrl.match(/xlz.*\D/)[0])
        }
        if (item.stage) {
            saveUrl = path.join(item.stage, saveUrl)
        }
        return saveUrl
    },

    remove: function (path, desc = path) {
        fs.stat(path, (err) => {
            if (!err) {
                fs.remove(path, (err) => {
                    if (err) console.error(`删除 ${desc} 出错！`, err)
                    else console.log(`已删除 ${desc}。`)
                })
            }
        })
    },

    removeSync: function (path) {
        if (fs.statSync(path).isDirectory()) {
            fs.removeSync(path)
        }
    },

    getScript: function (node, className) {
        const script = node.data.scripts.filter(kv => { return kv.clazz === className })[0]
        if (!script) return
        return node.__json[script.data]
    },

    genBuildId: function () {
        var magicNumber = Math.floor(Math.random() * 36)
            .toString(36)
            .substr(0, 1);
        var s1 = "0000" + Math.floor(Math.random() * 1679616).toString(36);
        var s2 = "000" + Math.floor(Math.random() * 46656).toString(36);
        var count = 0;
        for (var i = 0; i < 4; i++) {
            var c = Math.floor(Math.random() * 26);
            count += Math.pow(26, i) * (c + 10);
        }
        count +=
            Math.floor(Math.random() * 1000000) +
            Math.floor(Math.random() * 222640);

        return (
            magicNumber +
            s1.substr(s1.length - 4) +
            s2.substr(s2.length - 3) +
            count.toString(36)
        );
    },

    /**
     * 结尾补齐符号
     * @param {string} string 待补齐字符串
     * @param {string[]} notes 补齐符号，传入多个时，匹配其中一个，使用第一位字符补齐
     * @returns {string} 补齐后字符串
     */
    finisFillNote: function (str, ...notes) {
        if (str && notes && notes.length) {
            if (!notes.includes(str[str.length - 1])) str += notes[0]
            else {
                str = str.slice(0, str.length - 1)
                str += notes[0]
            }
        }
        return str
    },

    /** 
     * 格式化字符串
    */
    formatStr: function (str) {
        if (typeof str != 'string') return;
        str = str.trim(); //去除前后空格
        str = str.replace(/[\u200b-\u200f\uFEFF\u202a-\u202e]/g, ""); //过滤零宽度字符
        return str;
    },

    compressImg: function (fileUrl, quality) {
        switch (path.parse(fileUrl).ext) {
            case '.png':
                const pngquant = {
                    Darwin: 'bin/pngquant/darwin/pngquant',
                    Windows_NT: 'bin/pngquant/windows/pngquant.exe',
                    Linux: 'bin/pngquant/linux/pngquant'
                }
                const compressCommand = path.join(__dirname, pngquant[os.type()])
                const option = ['--speed', '1', '--force', '--strip', '--output', fileUrl, '--quality', quality]
                const command = [compressCommand, fileUrl, ...option].join(' ')
                try {
                    execSync(command)
                } catch (error) {
                    console.log('compress error:', command);
                }
                break;
            case '.jpg':
            case '.jpeg':
                const mozjpeg = {

                }
                break;
            default:
                break;
        }

    },

    hasArg,
    getArg,

    traceMemory() {
        if (!config.traceheap) return
        const {
            rss, heapTotal, heapUsed, external
        } = process.memoryUsage()
        process.stdout.write('\033c');
        console.log('======= 内存状况 =======');
        console.log('常驻集大小：', prettyBytes(rss));
        console.log('heapTotal:', prettyBytes(heapTotal));
        console.log('external:', prettyBytes(external));
        console.log('heapUsed/heapTotal：', (heapUsed / heapTotal * 100).toFixed(2) + '%');
        console.log('=======================');
    },

    drawCanvas({
        width,
        height,
        x,
        y,
        buffer
    }) {
        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = buffer
        ctx.drawImage(img, x, y)
        return canvas
    },

    startSaveLogs() {
        if (!config.logs) return
        const runws = fs.createWriteStream(path.join(config.output, projectName, 'psd2ui.run.log'), { flags: 'a' })
        const errws = fs.createWriteStream(path.join(config.output, projectName, 'psd2ui.error.log'), { flags: 'a' })
        process.stdout.pipe(runws)
        process.stderr.pipe(errws)

        runws.on('close', () => {
            console.log('日志保存在项目目录内');
        })
    }

}