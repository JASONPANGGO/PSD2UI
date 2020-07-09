interface baseLayer {
    type: 'layer' | 'group' | 'text',
    visible: boolean,
    opacity: number,
    blendingMode: string,
    name: string,
    left: number,
    right: number,
    top: number,
    bottom: number,
    height: number,
    width: number,
    mask: Object,
    script: Object
}

export interface imageLayer extends baseLayer {
    type: 'layer',
    src: string,
    image: Object
}

export interface textLayer extends baseLayer {
    type: 'text',
    text: {
        value: string,
        font: {
            name: string,
            sizes: [number, number],
            colors: Array<Array<number>>,
            alignment: string[]
        },
        left: number,
        top: number,
        right: number,
        bottom: number,
        transform: {
            xx: number,
            xy: number,
            yx: number,
            yy: number,
            tx: number,
            ty: number,
        },
        image: Object
    }
}

export interface groupLayer extends baseLayer {
    type: 'group',
    children: Array<imageLayer | textLayer | groupLayer>
}

export interface PsdLayers {
    children: Array<groupLayer | imageLayer | textLayer>,
    document: {
        width: number,
        height: number,
        resources: {
            layerComps: Array<any>,
            guides: Array<any>,
            slices: Array<any>
        }
    }
}