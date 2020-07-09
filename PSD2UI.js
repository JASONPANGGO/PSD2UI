(function () {
    const Base64 = require('js-base64').Base64;
    const fs = require('fs-extra')
    const util = require('./util')
    const config = require('./config')
    const projectName = 'PSDtoUI_' + Date.now()
    const path = require('path')
    const tempProjectName = path.join(process.env.PLAYSMART_PATH, 'tempProject/')
    const {
        convert
    } = require("./lib.js");
    /** PS所有图层配置 */
    let stageWidth, stageHeight

    // 拿到要做修改的场景对象
    const world = JSON.parse(fs.readFileSync(tempProjectName + config.world).toString())
    const ending = JSON.parse(fs.readFileSync(tempProjectName + config.ending).toString())

    // 拿到globalUrlMap的资源映射对象
    const globalUrlMap = JSON.parse(fs.readFileSync(tempProjectName + config.globalUrlMap).toString().split(' = ')[1].replace(/;/g, ''))

    // gamePlay结点
    const gamePlay = world.data.children[0].data.children[0]


    function AspectRatioFitter(data) {
        return {
            "class": "qc.AspectRatioFitter",
            "data": {
                "uuid": [
                    7,
                    util.uuidv4()
                ],
                "enable": true,
                "mode": [
                    3,
                    data
                ],
                "ratio": [
                    3,
                    1
                ]
            }
        }
    }

    function Layout(data) {
        const uuid = util.uuidv4()

        return {
            "class": "ps.Layout",
            "data": {
                "uuid": [
                    7,
                    uuid
                ],
                "enable": true,
                "autoSize": [
                    5,
                    false
                ],
                "left": [
                    7,
                    null
                ],
                "top": [
                    7,
                    null
                ],
                "right": [
                    7,
                    null
                ],
                "bottom": [
                    7,
                    null
                ],
                "centerX": [
                    7,
                    null
                ],
                "centerY": [
                    7,
                    null
                ],
                "percX": [
                    7,
                    null
                ],
                "percY": [
                    7,
                    null
                ],
                "scaleXY": [
                    7,
                    null
                ],
                "layout": [
                    9,
                    Object.assign({
                        "pdef": "",
                        "pipx": "",
                        "ppad": "",
                        "ldef": "",
                        "lipx": "",
                        "lpad": ""
                    }, data)
                ]
            }
        }
    }

    /**
     * 添加资源并生成图片结点
     * @param {psNode} node PhotoShop结点 
     */
    function UIImage(node, parent, scene) {
        if (!node.src) return
        if (config.onlyVisible && !node.visible) return
        let url = config.resource + node.src //util.tranSrc(node.src)
        url = url.replace(/\\/g, '/')
        const binUrl = url.replace(/.png|.jpg|.jpeg/g, '.bin')

        // 在globalUrlMap中寻找当前资源，如果没有的话生成一个uuid并插进去
        let uuid = Object.keys(globalUrlMap).find(key => globalUrlMap[key] === binUrl)
        if (!uuid) {
            const uuidGenerator = util.uuid()
            uuid = uuidGenerator.generate()
        }

        scene = scene ? scene : world
        scene.dependences[uuid] = {
            key: url,
            uuid: uuid
        }
        globalUrlMap[uuid] = binUrl

        const meta = {
            uuid: uuid,
            type: 3,
            source: [url.slice(-4)]
        }
        const bin = [`"${JSON.stringify(meta).replace(/\"/g, `\\"`)}"`, '"{}"',
            `"${Base64.toBase64(fs.readFileSync(path.join(config.output, projectName, url)).toString())}"`
        ]

        // 写入.bin文件
        fs.writeFileSync(config.output + projectName + '/' + binUrl, `[${bin}]`)
        // 写入.bin.meta文件
        fs.writeFileSync(config.output + projectName + '/' + binUrl + '.meta', `${JSON.stringify(meta)}`)


        let name = node.name.match('@') ? node.name.split('@')[0] : node.name
        let width = node.width
        let height = node.height
        let x = anchoredX = node.left
        let y = anchoredY = node.top
        if (parent) {
            x = anchoredX = node.left - parent.left
            y = anchoredY = node.top - parent.top
        }
        let alpha = node.opacity
        let visible = node.visible

        // 返回一个UIImage结点
        return {
            class: "qc.UIImage",
            data: {
                "_prefab": [
                    7,
                    ""
                ],
                "__lock": [
                    5,
                    null
                ],
                "name": [
                    7,
                    name
                ],
                "uniqueName": [
                    7,
                    ""
                ],
                "ignoreDestroy": [
                    5,
                    false
                ],
                "alpha": [
                    3,
                    alpha
                ],
                "visible": [
                    5,
                    visible
                ],
                "colorTint": [
                    14,
                    16777215
                ],
                "static": [
                    5,
                    false
                ],
                "scripts": [],
                "position": [
                    0,
                    0,
                    anchoredX,
                    anchoredY,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "scaleX": [
                    3,
                    1
                ],
                "scaleY": [
                    3,
                    1
                ],
                "rotation": [
                    3,
                    0
                ],
                "interactive": [
                    5,
                    false
                ],
                "isFiltersThrough": [
                    5,
                    null
                ],
                "children": [],
                "texture": [
                    10,
                    binUrl,
                    uuid,
                    0
                ],
                "frame": null,
                "imageType": [
                    3,
                    0
                ],
                "skewX": [
                    3,
                    null
                ],
                "skewY": [
                    3,
                    null
                ]
            }
        }
    }

    /**
     * 对PhotoShop的组生成空结点
     * @param {psNode} node PhotoShop结点 
     */
    function qcNode(node, parent) {
        if (config.onlyVisible && !node.visible) return
        let name = node.name.match('@') ? node.name.split('@')[0] : node.name
        let width = node.width
        let height = node.height
        let x = anchoredX = node.left
        let y = anchoredY = node.top
        let visible = node.visible
        if (parent) {
            x = anchoredX = node.left - parent.left
            y = anchoredY = node.top - parent.top
        }

        return {
            "class": "qc.Node",
            "data": {
                "_prefab": [
                    7,
                    ""
                ],
                "__lock": [
                    5,
                    null
                ],
                "name": [
                    7,
                    name
                ],
                "uniqueName": [
                    7,
                    ""
                ],
                "ignoreDestroy": [
                    5,
                    false
                ],
                "alpha": [
                    3,
                    1
                ],
                "visible": [
                    5,
                    visible
                ],
                "colorTint": [
                    14,
                    16777215
                ],
                "static": [
                    5,
                    false
                ],
                "scripts": [],
                "position": [
                    0,
                    0,
                    anchoredX,
                    anchoredY,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "scaleX": [
                    3,
                    1
                ],
                "scaleY": [
                    3,
                    1
                ],
                "rotation": [
                    3,
                    0
                ],
                "interactive": [
                    5,
                    false
                ],
                "isFiltersThrough": [
                    5,
                    null
                ],
                "children": []
            }

        }
    }

    /**
     * 对PhotoShop的文本图层生成文本结点
     * @param {psNode} node PhotoShop结点 
     */
    function UIText(node, parent) {
        if (config.onlyVisible && !node.visible) return
        let name = node.name
        let width = node.width
        let height = node.height
        let x = anchoredX = node.left
        let y = anchoredY = node.top
        if (parent) {
            x = anchoredX = node.left - parent.left
            y = anchoredY = node.top - parent.top
        }
        let text = node.text.value
        let fontFamily = node.text.font.name
        let fontSize = node.text.font && node.text.font.sizes && node.text.font.sizes[0]
        let color = new util.Color(node.text.font.colors[0]).toNumber()
        let visible = node.visible

        return {
            "class": "qc.UIText",
            "data": {
                "uuid": "1378e8c6-61c3-4b78-b274-ddc77fed43b6",
                "_prefab": [
                    7,
                    ""
                ],
                "__lock": [
                    5,
                    null
                ],
                "name": [
                    7,
                    name
                ],
                "uniqueName": [
                    7,
                    ""
                ],
                "ignoreDestroy": [
                    5,
                    false
                ],
                "alpha": [
                    3,
                    1
                ],
                "visible": [
                    5,
                    visible
                ],
                "colorTint": [
                    14,
                    0
                ],
                "static": [
                    5,
                    false
                ],
                "scripts": [],
                "position": [
                    0,
                    0,
                    anchoredX,
                    anchoredY,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                "scaleX": [
                    3,
                    1
                ],
                "scaleY": [
                    3,
                    1
                ],
                "rotation": [
                    3,
                    0
                ],
                "interactive": [
                    5,
                    false
                ],
                "isFiltersThrough": [
                    5,
                    null
                ],
                "children": [],
                "fontFamily": [
                    3,
                    0
                ],
                "alignH": [
                    3,
                    0
                ],
                "alignV": [
                    3,
                    2
                ],
                "font": [
                    32,
                    fontFamily,
                    null
                ],
                "bold": [
                    5,
                    false
                ],
                "fontSize": [
                    3,
                    fontSize
                ],
                "color": [
                    14,
                    color
                ],
                "text": [
                    7,
                    text
                ],
                "lineSpacing": [
                    3,
                    0
                ],
                "wrap": [
                    5,
                    false
                ],
                "enableGlow": [
                    5,
                    false
                ],
                "startColor": [
                    14,
                    4294901760
                ],
                "endColor": [
                    14,
                    4278190080
                ],
                "gradient": [
                    5,
                    false
                ],
                "stroke": [
                    14,
                    4278190080
                ],
                "strokeThickness": [
                    3,
                    0
                ],
                "glowColor": [
                    14,
                    4294901760
                ],
                "autoSize": [
                    5,
                    false
                ],
                "shadowColor": [
                    14,
                    2147483648
                ],
                "shadowBlur": [
                    3,
                    10
                ],
                "shadowOffsetX": [
                    3,
                    3
                ],
                "shadowOffsetY": [
                    3,
                    3
                ],
                "enableShadow": [
                    5,
                    false
                ]
            }
        }

    }

    /**
     * 拷贝一份模板项目
     */
    function copyTemp() {
        console.log('输出项目位于' + config.output + projectName)
        console.log('正在复制模板项目...')
        fs.copySync(tempProjectName, config.output + projectName)
        console.log('复制完成')
    }

    /**
     * 转换PSD文件
     */
    function convertPSD() {
        console.time('psd解析耗时')
        const psdFile = process.argv.slice(2)[0]
        return new Promise((res, rej) => {
            console.log('正在转换 PSD 文件:', psdFile)
            convert(psdFile, config.output + projectName).then((layers) => {
                console.log('完成转换 PSD 文件')
                console.timeEnd('psd解析耗时')
                res(layers)
            }).catch(console.err);
        })
    }

    /**
     * 把PhotoShop结点转换为playsmart场景结点，递归
     * @param {Object} node PhotoShop的结点
     * @param {Object} parent 当前PhotoShop的结点的父节点
     * @param {Object} scene 转换到的目标场景文件
     */
    function psdNodeToScene(node, parent, scene) {
        let currentNode
        if (node.type === 'layer') {
            if (node.text) {
                // 文本结点
                currentNode = UIText(node, parent)
            } else {
                // 图片结点
                currentNode = UIImage(node, parent, scene)
            }
        } else if (node.type === 'group') {
            // 组结点
            if (node.children && node.children.length) {
                // 当前结点的子结点
                const group = qcNode(node, parent)
                if (group) {
                    if (group.data.name[1].toLowerCase() === 'ending') {
                        scene = ending
                    } else {
                        scene = world
                    }
                    node.children.forEach(child => {
                        let newNode = psdNodeToScene(child, node, scene)
                        if (newNode) group.data.children.unshift(newNode)
                    })
                }
                currentNode = group
            }
        }
        node.script && Object.keys(node.script).forEach(scriptName => {
            let script, clazzName
            switch (scriptName) {
                case 'Layout':
                    script = Layout(node.script['Layout'])
                    clazzName = 'ps.Layout'
                    break;
                case 'AspectRatioFitter':
                    script = AspectRatioFitter(node.script['AspectRatioFitter'])
                    clazzName = 'qc.AspectRatioFitter'
                    break;
                default:
                    break;
            }
            currentNode.data.scripts.push({
                "clazz": clazzName,
                "data": script.data.uuid[1]
            })
            currentNode['__json'] = currentNode['__json'] ? currentNode['__json'] : {}
            currentNode['__json'][script.data.uuid[1]] = script
        })

        return currentNode
    }

    /**
     * 更新场景文件包括 .state .bin .bin.state .prefab
     * @param {string} url 
     * @param {Object} scene 
     */
    function updateSceneFile(url, scene) {
        const suffixReg = /\..*/
        const sceneUrl = path.join(config.output, projectName, url)
        fs.writeFileSync(sceneUrl, JSON.stringify(scene))
        const meta = fs.readFileSync(sceneUrl.replace(suffixReg, '.bin.meta')).toString().trim()
        fs.writeFileSync(sceneUrl.replace(suffixReg, '.bin'), `["${meta.replace(/\"/g, '\\"')}","${JSON.stringify(scene).replace(/\"/g, '\\"')}"]`)
    }

    /**
     * 入口
     */
    async function run() {
        console.log('开始')
        copyTemp()
        let PsLayers = await convertPSD()

        stageWidth = PsLayers.document.width
        stageHeight = PsLayers.document.height


        // 清除结点
        gamePlay.data.children = []
        ending.data.children = []

        PsLayers.children && PsLayers.children.forEach(node => {
            let group = psdNodeToScene(node)
            if (group) {
                if (group.data.name[1].toLowerCase() === 'ending') {
                    ending.data.children.unshift(...group.data.children)
                } else {
                    gamePlay.data.children.unshift(group)
                }
            }
        })

        console.log('写入文件...')
        // 写入globalUrlMap.js
        fs.writeFileSync(path.join(config.output, projectName, config.globalUrlMap), 'window.urlMapConfig = ' + JSON.stringify(globalUrlMap))

        updateSceneFile(config.world, world)
        updateSceneFile(config.ending, ending)
        try {
            updateSceneFile(config.scene_editor, world)
        } catch (error) {
            console.log(error)
        }

        console.log('完成')
    }

    run()
})()