const Base64 = require('js-base64').Base64;
const util = require('./util')
const fs = require('fs')
const config = require('./config')
const path = require('path')
const PSD = require("psd");

const fsp = require('fs').promises

/**
 * 添加资源并生成图片结点
 * @param {psNode} node PhotoShop结点 
 */
function UIImage(node, parent, scene, globalUrlMap, projectName, world) {
    if (!node.src) return
    if (config.onlyVisible && !node.visible) return
    const url = path.join(config.resource, node.src.replace(/@.*\./g, '.')).replace(/\\/g, '/')
    const binUrl = url.replace(/.png|.jpg|.jpeg/g, '.bin')

    // 在globalUrlMap中寻找当前资源，如果没有的话生成一个uuid并插进去
    let uuid = Object.keys(globalUrlMap).find(key => globalUrlMap[key] === binUrl)
    if (!uuid) {
        const uuidGenerator = util.uuid()
        uuid = uuidGenerator.generate()
    }

    scene = scene ? scene : world
    scene.dependences[uuid] = {
        key: binUrl,
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
    const imgBinPath = path.join(config.output, projectName, binUrl)
    fs.writeFileSync(imgBinPath, `[${bin}]`)
    // 写入.bin.meta文件
    fs.writeFileSync(imgBinPath + '.meta', `${JSON.stringify(meta)}`)

    let name = node.name.replace(/@.*\./g, '.')
    let width = node.width
    let height = node.height
    let pivotX = pivotY = config.allPivotCenter ? .5 : 0
    let minAnchorX = minAnchorY = maxAnchorX = maxAnchorY = config.allPivotCenter ? .5 : 0
    let x = anchoredX = node.left + width * pivotX
    let y = anchoredY = node.top + height * pivotY
    if (parent) {
        x = anchoredX -= parent.left
        y = anchoredY -= parent.top
        anchoredX -= parent.width * minAnchorX
        anchoredY -= parent.height * minAnchorY
    }
    let alpha = node.opacity
    let visible = node.visible

    if (node.isExactfit) {
        minAnchorX = minAnchorY = 0
        maxAnchorX = maxAnchorY = 1
    }

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
                pivotX,
                pivotY,
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
                minAnchorX,
                minAnchorY,
                maxAnchorX,
                maxAnchorY
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
 * 多语言
 */
function Languages() {
    return {
        "class": "ps.Languages",
        "data": {
            "uuid": [
                7,
                util.uuidv4()
            ],
            "enable": true,
            "langKey": [
                7,
                null
            ]
        }
    }
}



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
    return {
        "class": "ps.Layout",
        "data": {
            "uuid": [
                7,
                util.uuidv4()
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



function MovieClip(data) {
    return {
        "class": "ps.MovieClip",
        "data": {
            "uuid": [
                7,
                util.uuidv4()
            ],
            "enable": true,
            "path": [
                7,
                data.path
            ],
            "interval": [
                3,
                100
            ],
            "actionNames": [
                9,
                {
                    [data.frameName]: data.frameCount
                }
            ],
            "data": [
                9,
                {
                    allFramePlaySmart: data.data,
                    [data.frameName]: data.data
                }
            ],
            "defActionName": [
                7,
                data.frameName
            ],
            "defPlay": [
                5,
                false
            ],
            "defLoop": [
                5,
                false
            ],
            "backplay": [
                5,
                false
            ],
            "autoDestory": [
                5,
                false
            ]
        }
    }
}


/**
 * 对PhotoShop的组生成空结点
 * @param {psNode} node PhotoShop结点 
 */
function qcNode(node, parent, position) {
    if (config.onlyVisible && !node.visible) return
    let name = node.name
    let width = node.width
    let height = node.height
    let pivotX = pivotY = config.allPivotCenter ? .5 : 0
    let minAnchorX = minAnchorY = maxAnchorX = maxAnchorY = config.allPivotCenter ? .5 : 0
    let x = anchoredX = node.left + width * pivotX
    let y = anchoredY = node.top + height * pivotY
    if (parent) {
        x = anchoredX -= parent.left
        y = anchoredY -= parent.top
        anchoredX -= parent.width * minAnchorX
        anchoredY -= parent.height * minAnchorY
    }
    let alpha = node.opacity
    let visible = node.visible

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
                name
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
            "position": position ? position : [
                pivotX,
                pivotY,
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
                minAnchorX,
                minAnchorY,
                maxAnchorX,
                maxAnchorY
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
    let pivotX = pivotY = config.allPivotCenter ? .5 : 0
    let minAnchorX = minAnchorY = maxAnchorX = maxAnchorY = config.allPivotCenter ? .5 : 0
    let x = anchoredX = node.left + width * pivotX
    let y = anchoredY = node.top + height * pivotY
    if (parent) {
        x = anchoredX -= parent.left
        y = anchoredY -= parent.top
        anchoredX -= parent.width * minAnchorX
        anchoredY -= parent.height * minAnchorY
    }
    const alignH = config.allPivotCenter ? 2 : 0

    let text = node.text.value.replace(/\r/g, '\\r').replace(/\n/g, '\\n');
    let fontFamily = node.text.font.name
    let fontSize = node.text.font && node.text.font.sizes && node.text.font.sizes[0]
    let color = new util.Color(node.text.font.colors[0]).toNumber()
    let alpha = node.opacity
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
                alpha
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
                pivotX,
                pivotY,
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
                minAnchorX,
                minAnchorY,
                maxAnchorX,
                maxAnchorY
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
                alignH
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


function resolvePSDfromDir(psdPath) {
    function findFile(sourcePath, rule) {
        if (sourcePath.match(rule)) return sourcePath
        const isDir = p => fs.statSync(p).isDirectory() && !p.match('__MACOSX')
        const flat = arr => {
            let res = []
            arr.forEach(e => {
                if (Array.isArray(e)) {
                    res = res.concat(flat(e))
                } else {
                    res.push(e)
                }
            })
            return res
        }
        if (!isDir(sourcePath)) return
        const filePaths = fs.readdirSync(sourcePath).map(filename => path.join(sourcePath, filename)).filter(filepath => filepath.match(rule) || isDir(filepath))
        return flat(filePaths.map(p => findFile(p, rule)))
    }
    const layerTrees = {}
    const psdFiles = findFile(psdPath, /\.psd$/)
    if (psdFiles.length !== 2) throw new Error('-src 传入参数有误')
    psdFiles.forEach(psdFilePath => {
        const psd = PSD.fromFile(psdFilePath)
        psd.parse()
        const tree = psd.tree()
        const key = tree.width < tree.height ? 'p' : 'l'
        layerTrees[key] = tree
    })

    /** 竖版PSD */
    RootLayers = layerTrees.p.export()
    /** 横版PSD */
    const layersL = layerTrees.l.export()

    /** 合并两棵树 */
    for (let i = 0; i < RootLayers.children.length; i++) {
        resolveNode(RootLayers.children[i], RootLayers, layersL.children[i], layersL);
    }

    return {
        tree: layerTrees.p,
        RootLayers
    }
}

/**
 * 解析横、竖版PSD
 * @param {*} layersP 竖版节点
 * @param {*} pParent 竖版父级节点
 * @param {*} layersL 横版节点
 * @param {*} lParent 横版父级节点
 */
function resolveNode(layersP, pParent, layersL, lParent) {
    if (!layersP || !layersL) {
        console.warn('横、竖版psd，图层存在至少一个为空，请对比横竖版图层差异！');
        console.warn('竖版：', layersP && layersP.name, '横版：', layersL && layersL.name);
        return;
    }
    if (layersP.name !== layersL.name) {
        console.warn('横、竖版psd，图层名不同，请对比当前图层或上一个图层！');
        console.warn('竖版：', layersP.name, '横版：', layersL.name);
    }
    layersP.name = util.formatStr(layersP.name);
    if (['start', 'game', 'ending'].includes(layersP.name) && pParent.document) {
        layersP.width = pParent.document.width
        layersP.height = pParent.document.height
        layersP.left = layersP.top = 0
        layersP.right = layersP.width
        layersP.bottom = layersP.height

        layersL.width = lParent.document.width
        layersL.height = lParent.document.height
        layersL.left = layersL.top = 0
        layersL.right = layersL.width
        layersL.bottom = layersL.height
    } else {
        /** CTA */
        const nameAnalyzer = require("./resolveName")
        nameAnalyzer.resolveCTA(layersP.name, layersP)
        nameAnalyzer.resolveCTA(layersL.name, layersL)

        /** 竖版适配值 */
        let layoutP = ''
        /** 横版适配值 */
        let layoutL = ''

        const canLayout = layersP.left - pParent.left != layersL.left - lParent.left ||
            layersP.top - pParent.top != layersL.top - lParent.top
        if (canLayout) {
            /** 横向位置 */
            layoutP += returnLayoutX(layersP, pParent)
            layoutL += returnLayoutX(layersL, lParent)
            /** 纵向位置 */
            layoutP = util.finisFillNote(layoutP, ',')
            layoutL = util.finisFillNote(layoutL, ',')
            layoutP += returnLayoutY(layersP, pParent)
            layoutL += returnLayoutY(layersL, lParent)
        }
        /** 宽度适配 */
        if (layersP.width != layersL.width) {
            layoutP = util.finisFillNote(layoutP, ',')
            layoutL = util.finisFillNote(layoutL, ',')
            layoutP += `width:${layersP.width}`
            layoutL += `width:${layersL.width}`
        }
        /** 高度适配 */
        if (layersP.height != layersL.height) {
            layoutP = util.finisFillNote(layoutP, ',')
            layoutL = util.finisFillNote(layoutL, ',')
            layoutP += `height:${layersP.height}`
            layoutL += `height:${layersL.height}`
        }

        /** 竖版适配 */
        if (layoutP) {
            if (layersP.name.indexOf('@') === -1) layersP.name += '@'
            else layersP.name = util.finisFillNote(layersP.name, ';', '；')
            layersP.name += `p:${layoutP}`
        }
        /** 横版适配 */
        if (layoutL) {
            if (layersP.name.indexOf('@') === -1) layersP.name += '@'
            else layersP.name = util.finisFillNote(layersP.name, ';', '；')
            layersP.name += `l:${layoutL}`
        }
    }

    if (layersP.children) {
        for (let i = 0; i < layersP.children.length; i++) {
            resolveNode(layersP.children[i], layersP, layersL.children[i], layersL);
        }
    }
}

/**
 * 计算节点横向位置适配值
 * @param {*} node 当前节点
 * @param {*} parent 当前父级节点
 * @returns {string} 横向适配值
 */
function returnLayoutX(node, parent) {
    const dir = {}
    dir.left = node.left - parent.left
    dir.centerX = dir.left + (node.width - parent.width) / 2
    dir.right = parent.width - dir.left - node.width
    const min = Math.min.apply(Math, Object.values(dir).map(v => Math.abs(v)))
    const minKey = config.allLayoutCenterXY ? 'centerX' : Object.keys(dir).find(key => Math.abs(dir[key]) === min)
    const value = Math.abs(dir[minKey]) < 5 ? 0 : dir[minKey]
    return `${minKey}:${value}`
}

/**
 * 计算节点纵向位置适配值
 * @param {*} node 当前节点
 * @param {*} parent 当前父级节点
 * @returns {string} 横向适配值
 */
function returnLayoutY(node, parent) {
    const dir = {}
    dir.top = node.top - parent.top
    dir.centerY = dir.top + (node.height - parent.height) / 2
    dir.bottom = parent.height - dir.top - node.height
    const min = Math.min.apply(Math, Object.values(dir).map(v => Math.abs(v)))
    const minKey = config.allLayoutCenterXY ? 'centerY' : Object.keys(dir).find(key => Math.abs(dir[key]) === min)
    const value = Math.abs(dir[minKey]) < 5 ? 0 : dir[minKey]
    return `${minKey}:${value}`
}


function resolveStage(nodeName, stage) {
    stage = stage || 'game'
    if (['start', 'ending'].includes(nodeName)) {
        stage = nodeName
    }
    return stage
}

function resolveGroup(nodeName, group) {
    if (group) return group
    if (nodeName.includes('group_')) {
        group = nodeName
    }
    return group
}

function resolveLayersType(psdNode, layers) {
    if (psdNode.isGroup()) {
        layers.type = "group"
    } else {
        if (psdNode.get("typeTool")) {
            layers.type = "text"
        } else if (!psdNode.isEmpty()) {
            layers.type = "layer"
        }
    }
    return layers.type
}

async function png2bin(pngPath, globalUrlMap, scene) {
    try {
        const binUrl = pngPath.replace(/.png|.jpg|.jpeg/g, '.bin')
        // 在globalUrlMap中寻找当前资源，如果没有的话生成一个uuid并插进去
        let uuid = Object.keys(globalUrlMap).find(key => globalUrlMap[key] === binUrl)
        if (!uuid) {
            const uuidGenerator = util.uuid()
            uuid = uuidGenerator.generate()
        }

        globalUrlMap[uuid] = binUrl

        if (scene) {
            scene.dependences[uuid] = {
                key: binUrl,
                uuid: uuid
            }
        }

        const meta = {
            uuid: uuid,
            type: 3,
            source: [pngPath.slice(-4)]
        }
        const bin = [`"${JSON.stringify(meta).replace(/\"/g, `\\"`)}"`, '"{}"',
        `"${Base64.toBase64(fs.readFileSync(path.join(config.output, config.projectName, pngPath)).toString())}"`
        ]

        const imgBinPath = path.join(config.output, config.projectName, binUrl)

        fs.writeFileSync(imgBinPath, `[${bin}]`)
        fs.writeFileSync(imgBinPath + '.meta', `${JSON.stringify(meta)}`)

        return {
            bin: binUrl,
            uuid
        }


    } catch (error) {
        console.log(error);
        throw error
    }

}


module.exports = {
    UIImage,
    Languages,
    AspectRatioFitter,
    Layout,
    MovieClip,
    qcNode,
    UIText,
    resolvePSDfromDir,
    resolveStage,
    resolveGroup,
    resolveLayersType,
    png2bin
}