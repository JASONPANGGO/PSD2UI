// 脚本显示扩展
// 第一个参数为自定义的脚本组件类名
// 第二个参数为重载的绘制函数
G.extend.inspector('ps.tween.Show', function () {
    var self = this,
        target = self.target;

    // 先调用默认的绘制方法
    self.defaultDraw();
    // 调用自己的绘制
    var gui = qc.editor.gui;
    //gui.columnWidths = [60, '60+0.1'];
    var dropDownList;
    gui.line([
        gui.text('类型'),
        dropDownList = gui.dropDownList({
            // items指定列表项
            items: ['zoom', 'alpha'],
            // value指定默认值
            value: target.type
        })
    ]);
    // 值变化回调函数
    dropDownList.onValueChanged = function (newValue) {
        target.type = newValue;
    };
    gui.columnWidths = ["70+0.1", "70+0.1"];
    var playBtn;
    var resetBtn;
    gui.line([
        playBtn = gui.button('运行/停止'),
        resetBtn = gui.button('重置'),
    ]);
    // 注册点击事件
    playBtn.on('click', function (e) {
        target.play();
    });
    resetBtn.on('click', function (e) {
        target.reset();
    });
});

