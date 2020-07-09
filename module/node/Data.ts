import { StringType, BooleanType, NumberType, ColorType, AutoType, ScriptType } from "./SerializerType"
import qcNode from "./qcNode"

interface Position {
    pivotX: number,
    pivotY: number,
    anchoredX: number,
    anchoredY: number,
    x: number,
    y: number,
    width: number,
    height: number
}

export interface NodeParams {
    name: string,
    visible: boolean,
    position: Partial<Position>,
    scripts: ScriptType,
    scaleX: number,
    scaleY: number,
    rotation: number,
    interactive: boolean,
    children: qcNode[]
}

export default class Data {

    readonly _prefab: StringType = [7, ""]
    readonly __lock: BooleanType = [5, null]
    name: StringType
    uniqueName: StringType = [7, ""]
    ignoreDestroy: BooleanType = [5, false]
    alpha: NumberType = [3, 1]
    visible: BooleanType
    colorTint: ColorType = [14, 16777215]
    position: AutoType
    scripts: Array<ScriptType> = []
    static: BooleanType = [5, false]
    scaleX: NumberType
    scaleY: NumberType
    rotation: NumberType = [3, 0]
    interactive: BooleanType = [5, false]
    isFiltersThrough: BooleanType = [5, null]
    children: qcNode[] = []

    constructor(params: Partial<NodeParams>) {
        this.name = [7, params.name || ""]
        this.visible = [5, params.visible || true]
        this.position = [
            params.position.pivotX || 0,
            params.position.pivotY || 0,
            params.position.anchoredX || 0,
            params.position.anchoredY || 0,
            params.position.x || 0,
            params.position.y || 0,
            params.position.width || 0,
            params.position.height || 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]
        // this.scripts = params.scripts || []
        this.scaleX = [3, params.scaleX || 1]
        this.scaleY = [3, params.scaleY || 1]
        this.rotation = [3, params.rotation || 0]
        this.interactive = [5, params.interactive || false]
        this.children = params.children || []
    }
}