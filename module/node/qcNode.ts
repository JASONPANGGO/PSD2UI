import Data, { NodeParams } from "./Data"
import { groupLayer, imageLayer, textLayer } from "../psd/layer"
import { uuid } from "../../util"

export default class qcNode {

    class: string
    data: Data
    __json: any

    constructor(layer: groupLayer | imageLayer | textLayer, parent?: groupLayer) {
        this.class = "qc.Node"
        let x: number = parent ? layer.left - parent.left : layer.left
        let y: number = parent ? layer.top - parent.top : layer.top

        this.data = new Data({
            name: layer.name,
            visible: layer.visible,
            position: {
                width: layer.width,
                height: layer.height,
                x: x,
                y: y,
                anchoredX: x,
                anchoredY: y
            }
        })
    }


}