G.extend.inspector('ps.Layout', function () {
    var self = this,
        target = self.target;

    // 先调用默认的绘制方法
    self.defaultDraw();
    // 调用自己的绘制
    var gui = qc.editor.gui;
    var titleLine = gui.titleLine('当前布局');
    var inputs = {};
    function initText(key, clearList, min, max, step) {
        if (max == undefined) max = 1000;
        if (min == undefined) max = -100;
        //TODO 这个参数不生效
        if (step == undefined) step = 1;
        var input;
        titleLine.add(gui.line([
            gui.text(key, { for: key, min: min, max: max, step: step }),// for属性要与数字输入框的id保持一致
            input = gui.numberInput({ id: key, value: target[key] }) // 为数字输入框指定id
        ]));
        input.onValueChanged = function (newValue) {
            for (let key of clearList) {
                target[key] = undefined;
            }
            target[key] = newValue;
        };
        inputs[key] = input;
    }
    // initText("left", ["right", "centerX", "percX"]);
    // initText("right", ["left", "centerX", "percX"]);
    // initText("top", ["bottom", "centerY", "percY"]);
    // initText("bottom", ["top", "centerY", "percY"]);
    // initText("centerX", ["left", "right", "percX"]);
    // initText("centerY", ["top", "bottom", "percY"]);
    // initText("percX", ["left", "right", "centerX"], -2, 2, 0.05);
    // initText("percY", ["top", "bottom", "centerY"], -2, 2, 0.05);
    // initText("scaleXY", [], 0, 5, 0.05);
    //
    gui.columnWidths = ["70+0.1"];
    gui.line([
        playBtn = gui.button('刷新'),
    ]);
    
    playBtn.on('click', function () {
        target.awake();
    });
});