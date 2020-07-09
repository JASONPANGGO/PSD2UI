import Behaviour from "./Behaviour";

export default class Layout extends Behaviour {

    constructor(data: any) {
        super()
        this.class = 'ps.Layout'
        this.data = {
            ...this.data,
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