import qcNode from "./qcNode";
import { UUID, UUIDv4 } from "../util";

export default class Scene extends qcNode {
    dependences: {
        [index: string]: {
            key: UUID,
            uuid: UUID
        }
    }

}

/**
 * 键为UUID
 */
export class GlobalUrlMap {
    // UUID
    [index: string]: string
}