import { UUIDv4 } from "../util";

export interface StringType {
    [index: number]: 7 | string
}

export interface NumberType {
    [index: number]: 3 | number
}

export interface BooleanType {
    [index: number]: 5 | boolean
}

export interface ColorType {
    [index: number]: 14 | number
}

export interface AutoType {
    [index: number]: any
}

export interface script {
    clazz: string,
    data: string
}

export interface ScriptType {
    clazz: string,
    data: UUIDv4
}

export interface TextureType {
    [index: number]: 10 | 0 | string
}
