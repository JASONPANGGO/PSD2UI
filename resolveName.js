
const path = require('path')

module.exports = {
    checkResovable(name) {
        return name.match("@")
    },
    resolveCTA(name, layers) {
        if (name.match(/cta/)) {
            const ctaWidth = 620
            const ctaHeight = 250
            layers.left += (layers.width - ctaWidth) * .5
            layers.top += (layers.height - ctaHeight) * .5
            layers.width = ctaWidth
            layers.height = ctaHeight
        }
    },
    resolveAspectRatioFitter(string, layers) {
        // fixedWide | showAll | exactFit
        /**
         * Four modes to resize the node
         * @type {number}
         */
        const AspectRatioFitter = {
            NONE: 0,
            WIDTH_CONTROLS_HEIGHT: 1,
            HEIGHT_CONTROLS_WIDTH: 2,
            FIT_IN_PARENT: 3,
            ENVELOPE_PARENT: 4,
        };
        const ScaleMode = {
            showall: AspectRatioFitter.FIT_IN_PARENT,
            fixedwide: AspectRatioFitter.ENVELOPE_PARENT,
        };

        // 宽高比适配器
        if (Object.keys(ScaleMode).includes(string.toLowerCase())) {
            layers.script["AspectRatioFitter"] = ScaleMode[string.toLowerCase()];
        } else if (string.toLowerCase() === "exactfit") {
            layers.isExactfit = true
        } else {
            return false
        }
        layers.hasAspectRatio = true
        return true
    },
    resolveLayout(string, layers) {
        // Layout 适配组件
        const keyIdx = string.indexOf(':')
        if (keyIdx !== -1) {
            let key = string[keyIdx - 1].toString().toLowerCase()
            const data = string.slice(keyIdx + 1).toString()
            if (key === "l") {
                // landscape
                key = "ldef"
            } else if (key === "p") {
                // portrait
                key = "pdef"
            } else {
                throw new Error(`图层：“${nodeName}”中，适配值：“${keyValue[0]}”有误！！！`)
            }
            if (!layers.script["Layout"]) layers.script["Layout"] = {}
            layers.script["Layout"][key] = data
        }
    },
    resolveLanguages(string, layers) {
        // 多语言组件
        if (string.toLowerCase() === "lang")
            layers.script["Languages"] = true
    },
    resolveSuffix(string, layers) {
        // 图片资源后缀
        if (layers.type === "layer")
            if (string.toLowerCase() === "jpg") layers.suffix = "jpg";
    },
    resolveSize(string, layers) {
        if (string.toLowerCase() === 'size') {
            const sizeNodeIndex = layers.children.findIndex(c => c.name.toLowerCase() === 'size')
            const sizeNode = layers.children.splice(sizeNodeIndex, 1)[0]
            layers.children.forEach(child => {
                child.width = sizeNode.width
                child.height = sizeNode.height
                child.size = {
                    x: child.left - sizeNode.left,
                    y: child.top - sizeNode.top,
                    width: sizeNode.width,
                    height: sizeNode.height
                }
                child.left = sizeNode.left
                child.top = sizeNode.top
            })
        }
    },
    resolveXLZ(string, layers) {
        if (string.toLowerCase().includes('xlz')) {
            layers.children.forEach(child => {
                // 拼接1，2，3
                child.name = path.join(string, string + '_' + child.name)
            })
            layers.isXLZ = true
        }
    }
}