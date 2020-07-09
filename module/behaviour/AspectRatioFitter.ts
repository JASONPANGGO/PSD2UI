import Behaviour from "./Behaviour";


enum AspectRatioFitterType {
    NONE = 0,
    WIDTH_CONTROLS_HEIGHT = 1,
    HEIGHT_CONTROLS_WIDTH = 2,
    FIT_IN_PARENT = 3,
    ENVELOPE_PARENT = 4
}

export default class AspectRatioFitter extends Behaviour {


    constructor(data: AspectRatioFitterType) {
        super()

        this.class = "qc.AspectRatioFitter"
        this.data = {
            ...this.data,
            "mode": [
                3,
                data
            ],
            "ratio": [
                3,
                1
            ]
        }

    }
}