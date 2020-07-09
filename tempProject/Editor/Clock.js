/**
 * 计时器组件 - 编辑器菜单拓展
 * @author JasonPang
 */
G.extend.inspector('ps.Clock', function () {

    var self = this,
        target = self.target;

    var gui = qc.editor.gui;

    var dropDownList
    var PrecisionType = {
        INTEGER: 0,
        HUNDRED_MS: 1,
        TEN_MS: 2
    }

    self.defaultDraw();
    
    gui.line([
        gui.text('精度'),
        dropDownList = gui.dropDownList({
            items: [{
                    label: '整数',
                    value: PrecisionType.INTEGER
                },
                {
                    label: '百毫秒',
                    value: PrecisionType.HUNDRED_MS
                },
                {
                    label: '十毫秒',
                    value: PrecisionType.TEN_MS
                }
            ],
            value: target.precision
        })
    ]);
    dropDownList.onValueChanged = function (newValue) {
        target.precision = newValue
    }

})