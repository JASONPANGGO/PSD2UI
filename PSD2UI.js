#!/usr/bin/env node

const { version } = require('./package.json');
const { UIImage,
    Languages,
    AspectRatioFitter,
    Layout,
    MovieClip,
    qcNode,
    UIText, png2bin } = require('./playsmart');
const { startSaveLogs } = require('./util');

/**
 * 入口
 */
async function psd2ui({ src, template, output, name, quality, playsmart, traceheap, logs, allPivotCenter, allLayoutCenterXY }) {


    const fs = require('fs-extra')
    const util = require('./util')
    const config = require('./config')
    const path = require('path')

    const {
        convert
    } = require("./lib.js");

    // 获取用户传递的参数配置
    resolveConfig({ src, template, output, name, quality, playsmart, traceheap, logs, allPivotCenter, allLayoutCenterXY })

    // 是否使用PlaySmart模板
    const projectName = config.projectName
    const tempProjectName = config.tempProjectName

    // 拿到要做修改的场景对象
    const start = JSON.parse(fs.readFileSync(path.join(tempProjectName, config.startPrefab)).toString())
    const world = JSON.parse(fs.readFileSync(path.join(tempProjectName, config.gamePlayState)).toString())
    const ending = JSON.parse(fs.readFileSync(path.join(tempProjectName, config.endingPrefab)).toString())

    // 拿到globalUrlMap的资源映射对象
    const globalUrlMap = config.isPlaysmart ? JSON.parse(fs.readFileSync(path.join(tempProjectName, config.globalUrlMap)).toString().split(' = ')[1].replace(/;/g, '')) : {}

    // UIRoot节点
    const UIRoot = world.data.children[0]

    // gamePlay结点
    const gamePlay = world.data.children[0].data.children[0]

    // 项目设置
    const project_setting = JSON.parse(fs.readFileSync(path.join(tempProjectName, config.project_setting)).toString())

    // 启用多语言系统
    let useLanguages = false

    // 输出项目的地址
    const projectPath = path.join(config.output, projectName)

    /**
     * 拷贝一份模板项目
     */
    function copyTemp() {
        console.log('输出项目位于: ' + path.resolve(projectPath))
        console.log('正在复制模板项目...')
        fs.ensureDirSync(config.output)
        fs.copySync(tempProjectName, projectPath)
        console.log('复制完成')
        util.remove(path.join(config.output, projectName, '.git'), '.git 文件夹')
    }

    /**
     * 转换PSD文件
     */
    function convertPSD(psdFilePath, outputPath) {
        console.time('psd解析耗时')
        return new Promise((res, rej) => {
            console.log('正在转换 PSD 文件:', psdFilePath)
            convert(psdFilePath, outputPath).then((layers) => {
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
    async function psdNodeToScene(node, parent, scene) {
        try {

            let currentNode
            if (node.type === 'text') {
                // 文本结点
                currentNode = UIText(node, parent)
            } else if (node.type === 'layer') {
                // 图片结点
                currentNode = UIImage(node, parent, scene, globalUrlMap, projectName, world)
            } else if (node.type === 'group') {
                if (node.isXLZ) {
                    let childNode = node.children.find(c => {
                        c.name = util.formatStr(c.name)
                        return c.name.match(/_1$/)
                    })

                    const png2binRes = await Promise.all(node.children.map(child => png2bin(path.join(config.resource, child.src), globalUrlMap)))

                    png2binRes.sort((a, b) => {
                        const getNum = string => Number(string.split('_').pop().replace('.bin', ''))
                        return getNum(a.bin) - getNum(b.bin)
                    })

                    childNode.script = {
                        MovieClip: {
                            path: config.resource + childNode.src.substr(0, childNode.src.lastIndexOf('\\')).replace(/\\/g, '/'),
                            frameCount: node.children.length,
                            frameName: childNode.name.replace(/\\/g, '/').split('/')[0].replace('xlz_', ''),
                            data: png2binRes.map(({ bin }) => bin).join(',')
                        }
                    }

                    childNode.name = childNode.script.MovieClip.frameName

                    return await psdNodeToScene(childNode, node, scene)
                }
                // 组结点
                if (node.children && node.children.length) {
                    // 当前结点的子结点
                    const group = qcNode(node, parent)
                    if (group) {
                        if (group.data.name[1].toLowerCase() === 'ending') {
                            scene = ending
                        } else if (group.data.name[1].toLowerCase() === 'start') {
                            scene = start
                        } else {
                            scene = world
                        }
                        node.children.forEach(async child => {
                            let newNode = await psdNodeToScene(child, node, scene)
                            if (newNode) group.data.children.unshift(newNode)
                        })
                    }
                    currentNode = group
                }
            }
            if (!currentNode) return
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
                    case 'Languages':
                        useLanguages = true
                        script = Languages()
                        clazzName = 'ps.Languages'
                        break;
                    case 'MovieClip':
                        script = MovieClip(node.script['MovieClip'])
                        clazzName = 'ps.MovieClip'
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


        } catch (error) {
            throw error
        }
    }
    /**
     * 更新场景文件包括 .state .bin .bin.state .prefab
     * @param {string} url 
     * @param {Object} scene 
     */
    function updateSceneFile(url, scene) {
        const suffixReg = /\..*/
        const sceneUrl = path.join(config.output, projectName, url)
        fs.ensureFileSync(sceneUrl, JSON.stringify(scene))
        fs.ensureFileSync(sceneUrl.replace(suffixReg, '.bin'))
        fs.ensureFileSync(sceneUrl.replace(suffixReg, '.bin.meta'))

        fs.writeFileSync(sceneUrl, JSON.stringify(scene))

        const binUrl = url.replace(suffixReg, '.bin')
        const uuidKv = Object.entries(globalUrlMap).filter(kv => { return kv[1] === binUrl })[0]
        const uuid = uuidKv ? uuidKv[0] : util.uuid().generate()

        let type = 1
        let source = '.state'
        if (scene !== world) {
            type = 2
            source = '.prefab'
        }
        fs.writeFileSync(sceneUrl.replace(suffixReg, '.bin.meta'), `{"uuid":"${uuid}","type":${type},"source":["${source}"]}`)
        const meta = util.formatStr(fs.readFileSync(sceneUrl.replace(suffixReg, '.bin.meta')).toString());
        fs.writeFileSync(sceneUrl.replace(suffixReg, '.bin'), `["${meta.replace(/\"/g, '\\"')}","${JSON.stringify(scene).replace(/\"/g, '\\"')}"]`)
    }

    function ensureUIRootScaleAdapter(UIRoot) {
        const ScaleAdapter = util.getScript(UIRoot, 'qc.ScaleAdapter')
        ScaleAdapter.data.referenceResolution = [24, 'qc.Point', [750, 750]]
        ScaleAdapter.data.manualType = [3, 3]
    }

    function clearResource() {
        // 删除原来的文件夹
        if (!config.isPlaysmart) {
            util.removeSync(path.join(config.output, projectName, config.start))
            util.removeSync(path.join(config.output, projectName, config.game))
            util.removeSync(path.join(config.output, projectName, config.ending))
        }
    }

    async function resolveLayersToScene(PsLayers) {

        let hasStart = false
        let hasEnding = false
        const stageWidth = PsLayers.document.width
        const stageHeight = PsLayers.document.height

        if (PsLayers.children) {
            const transNodeTask = PsLayers.children.map(node => {
                return (async () => {
                    let diffX, diffY
                    if (['start', 'game', 'ending'].includes(node.name)) {
                        node.width = stageWidth
                        node.height = stageHeight
                        diffX = node.left
                        diffY = node.top
                    }
                    const stageGroup = await psdNodeToScene(node)
                    if (stageGroup) {
                        if (diffX != void 0 && diffY != void 0) {
                            stageGroup.data.children.forEach((child) => {
                                child.data.position[2] += diffX
                                child.data.position[3] += diffY
                                child.data.position[4] += diffX
                                child.data.position[5] += diffY
                            })
                        }
                        const suffixReg = /\..*/
                        if (stageGroup.data.name[1].toLowerCase() === 'ending') {
                            hasEnding = true
                            globalUrlMap[ending.data._prefab[1]] = config.endingPrefab.replace(suffixReg, '.bin')
                            ending.data.children.unshift(...stageGroup.data.children)
                        } else if (stageGroup.data.name[1].toLowerCase() === 'start') {
                            hasStart = true
                            globalUrlMap[start.data._prefab[1]] = config.startPrefab.replace(suffixReg, '.bin')
                            start.data.children.unshift(...stageGroup.data.children)
                        } else {
                            gamePlay.data.children = []
                            gamePlay.data.children.unshift(...stageGroup.data.children)
                        }
                    }
                })()
            })
            await Promise.all(transNodeTask)
        }

        return {
            hasStart, hasEnding
        }
    }

    function cleanNodes({ start, gamePlay, ending }) {

        // 清除结点
        ending.data.children = []
        start.data.children = []
        gamePlay.dependences = {}
        ending.dependences = {}
        start.dependences = {}
    }

    function handleLanguages() {
        // 写入project.setting，启用多语言系统
        if (useLanguages && config.autoUseLanguages) {
            project_setting.useLanguages = true
            fs.writeFileSync(path.join(config.output, projectName, config.project_setting), JSON.stringify(project_setting))
        }
    }

    function writeSceneFiles({ hasStart, hasEnding, UIRoot, world, globalUrlMap }) {
        // 写入globalUrlMap.js
        console.log('写入文件...')
        fs.writeFileSync(path.join(config.output, projectName, config.globalUrlMap), 'window.urlMapConfig = ' + JSON.stringify(globalUrlMap))

        if (hasStart) updateSceneFile(config.startPrefab, start)
        util.getScript(UIRoot, 'ps.MainConfig').data.hasStartPanel[1] = hasStart
        updateSceneFile(config.gamePlayState, world)
        if (hasEnding) updateSceneFile(config.endingPrefab, ending)
        util.getScript(UIRoot, 'ps.MainConfig').data.hasEndingPanel[1] = hasEnding
        if (fs.existsSync(path.join(config.output, projectName, config.scene_editor))) {
            updateSceneFile(config.scene_editor, world)
        }
    }

    function resolveConfig({ src, template, output, name, quality, playsmart, traceheap, logs, allPivotCenter, allLayoutCenterXY }) {
        if (!src) throw Error('请传入psd文件路径[-src, [path]]')
        config.input = src
        config.tempProjectName = template || config.tempProjectName
        config.projectName = name || config.projectName
        config.output = output || config.output
        if (quality) {
            config.autoCompress = true
        }
        config.quality = quality || config.quality
        config.isPlaysmart = playsmart || config.isPlaysmart
        config.traceheap = traceheap || config.traceheap
        config.logs = logs || config.logs
        if (typeof allLayoutCenterXY === 'boolean') {
            config.allLayoutCenterXY = allLayoutCenterXY
        }
        if (typeof allPivotCenter === 'boolean') {
            config.allPivotCenter = allPivotCenter
        }

    }

    function checkGlobalUrlMap(globalUrlMap) {
        for (const [key, url] of Object.entries(globalUrlMap)) {
            const resourcePath = path.join(config.output, projectName, url)
            if (!fs.existsSync(resourcePath)) {
                delete globalUrlMap[key]
            }
        }
    }

    startSaveLogs()

    console.log('psd2ui version:', version);

    console.log('开始')

    // 拷贝模板项目
    copyTemp()

    console.log('模板：', tempProjectName);

    // 清除resource目录下的game,start,ending
    clearResource()

    // 利用psd.js解析.psd文件为图层树，以及存储图片资源
    const PsLayers = await convertPSD(config.input, projectPath)

    // 清除游戏场景下的start,gamePlay,ending节点的子节点
    cleanNodes({ start, gamePlay, ending })

    // 把psd图层树解析到场景树
    const { hasStart, hasEnding } = await resolveLayersToScene(PsLayers)

    // 修改UIRoot的ScaleAdapter，确保referenceResolution为1334*1334，manualType为4
    ensureUIRootScaleAdapter(UIRoot)

    // 分析是否启用多语言
    handleLanguages()

    // 检查globalUrlMap中是否有不存在的资源
    checkGlobalUrlMap(globalUrlMap)

    // 所有场景数据处理完成，写入文件
    writeSceneFiles({ hasStart, hasEnding, UIRoot, world, globalUrlMap })

    console.log('完成')

    return projectPath
}

module.exports = {
    psd2ui
}