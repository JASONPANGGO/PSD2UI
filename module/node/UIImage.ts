import { NodeParams } from "./Data";
import { TextureType, NumberType } from "./SerializerType";
import qcNode from './qcNode'
import { UUIDv4 } from "../util";
import { imageLayer, groupLayer } from "../psd/layer";
import Scene from "./Scene";
import config from "../../config";
import util from "../../util";



export default class UIImage extends qcNode {

    texture: TextureType
    frame: any = null
    imageType: NumberType = [3, 0]
    skewX: NumberType = [3, null]
    skewY: NumberType = [3, null]

    constructor(imageLayer: imageLayer, scene: Scene, parent?: groupLayer) {
        super(imageLayer)
        this.class = "qc.UIImage"
        const url: string = (config.resource + util.tranSrc(imageLayer.src)).replace(/\\/g, '/')
        const binUrl: string = url.replace(/.png|.jpg|.jpeg/g, '.bin')


        // const uuid:
        // this.texture = [10, binUrl, uuid, 0]

    }


}

