import { uuidv4, UUIDv4 } from "../util"

class BehaviourData {
    uuid: [7, UUIDv4]
    enable: boolean = true
}

export default class Behaviour {

    class: string
    data: BehaviourData | any

    constructor() {
        this.data.uuid = [7, uuidv4()]
    }
}