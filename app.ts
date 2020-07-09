import path from 'path'
import fs from 'fs-extra'
import { Base64 } from 'js-base64'
import config, { onlyVisible } from './config'
import util from './util'
import { convert } from './lib'
import {
    UIImage, qcNode, UIText, imageLayer, groupLayer, textLayer, Scene, GlobalUrlMap
} from './module/index'
import Behaviour from './module/behaviour/Behaviour'
import Layout from './module/behaviour/Layout'
import AspectRatioFitter from './module/behaviour/AspectRatioFitter'
import { PsdLayers } from './module/psd/layer'


const projectName: string = 'PSDtoUI_' + Date.now()
const tempProjectPath: string = path.join(process.env.PLAYSMART_PATH, 'tempProject/')

function getScene(stateUrl: string): Scene {
    return JSON.parse(fs.readFileSync(path.join(tempProjectPath + stateUrl)).toString()) as Scene
}

const world: Scene = getScene(config.world)
const ending: Scene = getScene(config.ending)
const globalUrlMap: GlobalUrlMap = JSON.parse(fs.readFileSync(path.join(tempProjectPath + config.globalUrlMap)).toString().split(' = ')[1].replace(/;/g, '')) as GlobalUrlMap
const gamePlay: qcNode = world.data.children[0].data.children[0]



function copyTemp(): void {
    const targetPath: string = path.join(config.output, projectName)
    console.log('输出项目位于\n' + targetPath)
    console.log('正在复制模板项目...')
    fs.copySync(tempProjectPath, targetPath)
    console.log('复制完成')
}

function layerToScene(layer: imageLayer | groupLayer | textLayer, scene?: Scene, parent?: groupLayer): qcNode | UIText | UIImage {

    let currentNode: qcNode | UIText | UIImage

    switch (layer.type) {
        case 'layer':
            currentNode = new UIImage(layer, scene, parent)
            break;
        case 'text':
            currentNode = new UIText(layer, parent)
            break;
        case 'group':
            if (layer.children && layer.children.length) {
                if (onlyVisible && !layer.visible) break;
                const group: qcNode = new qcNode(layer, parent)
                if (group.data.name[1].toString().toLowerCase() === 'ending') {
                    scene = ending
                } else {
                    scene = world
                }
                layer.children.forEach(child => {
                    let nextNode: qcNode | UIText | UIImage = layerToScene(child, scene, layer)
                    if (nextNode) group.data.children.unshift(nextNode)
                })
                currentNode = group
            }
            break;
        default:
            break;
    }

    layer.script && Object.keys(layer.script).forEach(scriptName => {
        let behaviour: Behaviour
        switch (scriptName) {
            case 'Layout':
                behaviour = new Layout(layer.script['Layout'])
                break;
            case 'AspectRatioFitter':
                behaviour = new AspectRatioFitter(layer.script['AspectRatioFitter'])
                break;
            default:
                break;
        }
        currentNode.data.scripts.push({
            clazz: behaviour.class,
            data: behaviour.data.uuid[1]
        })
        currentNode.__json = currentNode.__json ? currentNode.__json : {}
        currentNode.__json[behaviour.data.uuid[1]] = behaviour
    })

    return currentNode
}

function covertPSD(): Promise<PsdLayers> {
    console.time('psd解析耗时')
    const psdFile = process.argv.slice(2)[0]
    return new Promise((res, rej) => {
        console.log('正在转换 PSD 文件:', psdFile)
        convert(psdFile, config.output + projectName).then((layers) => {
            console.log('完成转换 PSD 文件')
            console.timeEnd('psd解析耗时')
            res(layers)
        }).catch(console.error);
    })
}

async function run() {

    copyTemp()
    let layer: PsdLayers = await covertPSD()
}
// private readonly tempProjectName = path.join(process.env.PLAYSMART_PATH, 'tempProject/')