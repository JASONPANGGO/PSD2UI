/**
 * 抛物线组件 - 编辑器菜单拓展
 * @author JingBin
 * @argument 第一个参数为自定义的脚本组件类名
 * @argument 第二个参数为重载的绘制函数
 */
G.extend.inspector('ps.Parabola', function () {
    var self = this,
        target = self.target;

    var gui = qc.editor.gui;

    // 标题分割线-start
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }),
        gui.text('抛物线', { align: 'center' }),
        gui.divider({ color: "#333333" })
    ]);

    // 绘制默认控件
    self.defaultDraw();

    // 抛射X轴速度
    var SpeedTxtX, SpeedX;
    gui.columnWidths = ['60+0.1', '120+0.2'];
    gui.line([
        SpeedTxtX = gui.text('SpeedX', { for: 'SpeedX', max: target.speedMax.x, min: target.speedMin.x }),
        SpeedX = gui.numberInput({ id: 'SpeedX', value: target.speedX }),
    ]);
    // 抛射X轴速度值改变
    SpeedX.onValueChanged = function (newValue) {
        target.speedX = newValue;
        target.refresh();
    };

    // 抛射Y轴速度
    var SpeedTxtY, SpeedY;
    gui.columnWidths = ['60+0.1', '120+0.2'];
    gui.line([
        SpeedTxtY = gui.text('SpeedY', { for: 'SpeedY', max: target.speedMax.y, min: target.speedMin.y }),
        SpeedY = gui.numberInput({ id: 'SpeedY', value: target.speedY }),
    ]);
    // 抛射Y轴速度值改变
    SpeedY.onValueChanged = function (newValue) {
        target.SpeedY = newValue;
        // target.refresh();
    };

    // 抛射速度最小值
    gui.columnWidths = ['60+0.1', '10+0.05', '50+0.05', '10+0.05', '50+0.05'];
    var SpeedMinX, SpeedMinY;
    gui.line([
        gui.text('SpeedMin'),
        gui.text('X'),
        SpeedMinX = gui.numberInput({ id: 'X', value: target.speedMin.x }),
        gui.text('Y'),
        SpeedMinY = gui.numberInput({ id: 'Y', value: target.speedMin.y }),
    ]);
    // 抛射速度X轴最小值改变
    SpeedMinX.onValueChanged = function (newValue) {
        SpeedTxtX.min = newValue;
        SpeedX.min = newValue;
        target.speedMin.x = newValue;
        // target.refresh();
    };
    // 抛射速度Y轴最小值改变
    SpeedMinY.onValueChanged = function (newValue) {
        SpeedTxtY.min = newValue;
        SpeedY.min = newValue;
        target.speedMin.y = newValue;
        // target.refresh();
    };

    // 抛射速度最大值
    gui.columnWidths = ['60+0.1', '10+0.05', '50+0.05', '10+0.05', '50+0.05'];
    var SpeedMaxX, SpeedMaxY;
    gui.line([
        gui.text('SpeedMax'),
        gui.text('X'),
        SpeedMaxX = gui.numberInput({ id: 'X', value: target.speedMax.x }),
        gui.text('Y'),
        SpeedMaxY = gui.numberInput({ id: 'Y', value: target.speedMax.y }),
    ]);
    // 抛射速度X轴最大值改变
    SpeedMaxX.onValueChanged = function (newValue) {
        SpeedTxtX.max = newValue;
        SpeedX.max = newValue;
        target.speedMax.x = newValue;
        // target.refresh();
    };
    // 抛射速度Y轴最大值改变
    SpeedMaxY.onValueChanged = function (newValue) {
        SpeedTxtY.max = newValue;
        SpeedY.max = newValue;
        target.speedMax.y = newValue;
        // target.refresh();
    };

    // 抛射类型
    gui.columnWidths = ['60+0.1', '120+0.2'];
    var dropDownList;

    var ParabolaType = { JOYSTICK: 0, MOUSE_UP: 1, TIME_LOOP: 2 };

    gui.line([
        gui.text('抛射控制类型'),
        dropDownList = gui.dropDownList({
            items: [
                { label: '摇杆控制', value: ParabolaType.JOYSTICK },
                { label: '鼠标离开', value: ParabolaType.MOUSE_UP },
                { label: '按时间间隔循环', value: ParabolaType.TIME_LOOP },
            ],
            value: target.parabolaType
        })
    ]);
    // 值变化回调函数
    dropDownList.onValueChanged = function (newValue) {
        target.parabolaType = newValue;
    };

    // 抛物线颜色
    gui.columnWidths = ['60+0.1', '120+0.2'];
    var colorPicker;
    gui.line([
        gui.text('color'),
        colorPicker = gui.colorPicker({
            value: target.color
        })
    ]);
    // 抛物线颜色值改变
    colorPicker.onValueChanged = function (newValue) {
        target.color = newValue;
        target.refresh();
    };

    // 空行
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.empty({ colspan: 3 })
    ]);

    // 刷新按钮
    gui.columnWidths = ["70+0.1"];
    gui.line([
        playBtn = gui.button('刷新'),
    ]);
    // 注册点击事件
    playBtn.on('click', function () {
        target.refresh();
    });

    // 标题分割线-end
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }, { colspan: 3 })
    ]);
});