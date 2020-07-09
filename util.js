const path = require('path');

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
        // console.log(item)
        let saveUrl = item.name
        console.log('tranSrc', saveUrl)
        if (saveUrl.match(/^lang/)) {
            saveUrl = path.join('lang/' + saveUrl)
        } else if (saveUrl.match(/^xlz/)) {
            saveUrl = path.join(saveUrl.match(/xlz.*\D/)[0])
        }

        if (item.belongScene) {
            saveUrl = path.join(item.belongScene, saveUrl)
        }
        return saveUrl
    }


}