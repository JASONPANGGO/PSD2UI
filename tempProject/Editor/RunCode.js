// 脚本显示扩展
// 第一个参数为自定义的脚本组件类名
// 第二个参数为重载的绘制函数
G.extend.inspector('ps.RunCode', function () {
    var self = this,
        target = self.target;

    // 先调用默认的绘制方法
    //self.defaultDraw();
    // 调用自己的绘制
    var gui = qc.editor.gui;
    gui.columnWidths = [60, '60+0.1'];
    //------------------------------------------------
    var textArea;
    gui.line([
        gui.text('awake'),
        textArea = gui.textArea({ value: target.awakeCode })
    ], 60);
    // 值变化回调函数
    textArea.onValueChanged = function (newValue) {
        target.awakeCode = newValue;
    };
    //------------------------------------------------
    var textArea;
    gui.line([
        gui.text('onStart'),
        textArea = gui.textArea({ value: target.onStartCode })
    ], 60);
    // 值变化回调函数
    textArea.onValueChanged = function (newValue) {
        target.onStartCode = newValue;
    };
    //------------------------------------------------
    var textArea;
    gui.line([
        gui.text('onDown'),
        textArea = gui.textArea({ value: target.onDownCode })
    ], 60);
    // 值变化回调函数
    textArea.onValueChanged = function (newValue) {
        target.onDownCode = newValue;
    };
    //------------------------------------------------
    var textArea;
    gui.line([
        gui.text('onEnd'),
        textArea = gui.textArea({ value: target.onEndCode })
    ], 60);
    // 值变化回调函数
    textArea.onValueChanged = function (newValue) {
        target.onEndCode = newValue;
    };
    //------------------------------------------------
    gui.columnWidths = ["70+0.1", "70+0.1", "70+0.1", "70+0.1"];
    var awakeBtn;
    var onDownBtn;
    var onStartBtn;
    var onDownBtn;
    var onEndBtn;
    gui.line([
        awakeBtn = gui.button('awake'),
        onStartBtn = gui.button('onStart'),
        onDownBtn = gui.button('onDown'),
        onEndBtn = gui.button('onEnd'),
    ]);
    // 注册点击事件
    awakeBtn.on('click', function (e) {
        target.awake();
    });
    onStartBtn.on('click', function (e) {
        target.onStart();
    });
    onDownBtn.on('click', function (e) {
        target.onDown();
    });
    onEndBtn.on('click', function (e) {
        target.onEnd();
    });
});

