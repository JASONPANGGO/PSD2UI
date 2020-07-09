import qcNode from "./qcNode";
import { textLayer, groupLayer } from "../psd/layer";
import { StringType, NumberType, ColorType } from "./SerializerType";

export default class UIText extends qcNode {

    text: StringType
    fontFamily: NumberType = [3, 0]
    font: [32, string, null]
    fontSize: NumberType
    color: ColorType
    lineSpacing: any = [
        3,
        0
    ]
    wrap: any = [
        5,
        false
    ]
    enableGlow: any = [
        5,
        false
    ]
    startColor: any = [
        14,
        4294901760
    ]
    endColor: any = [
        14,
        4278190080
    ]
    gradient: any = [
        5,
        false
    ]
    stroke: any = [
        14,
        4278190080
    ]
    strokeThickness: any = [
        3,
        0
    ]
    glowColor: any = [
        14,
        4294901760
    ]
    autoSize: any = [
        5,
        false
    ]
    shadowColor: any = [
        14,
        2147483648
    ]
    shadowBlur: any = [
        3,
        10
    ]
    shadowOffsetX: any = [
        3,
        3
    ]
    shadowOffsetY: any = [
        3,
        3
    ]
    enableShadow: any = [
        5,
        false
    ]

    constructor(textLayer: textLayer, parent?: groupLayer) {
        super(textLayer, parent)
        


    }
}