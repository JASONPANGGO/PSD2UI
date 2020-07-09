/**
 * 摇杆组件 - 编辑器菜单拓展
 * @author JingBin
 * @argument 第一个参数为自定义的脚本组件类名
 * @argument 第二个参数为重载的绘制函数
 */
G.extend.inspector('ps.Joystick', function () {
    var self = this,
        target = self.target;

    var gui = qc.editor.gui;

    // 标题分割线-start
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }),
        gui.text('摇杆', { align: 'center' }),
        gui.divider({ color: "#333333" })
    ]);

    // 绘制默认控件
    self.defaultDraw();

    // 摇杆显示类型，下拉列表
    gui.columnWidths = ['60+0.1', '120+0.2'];
    var dropDownList;

    var JoystickType = { FIX: 0, AUTO: 1, AUTO_HIDE: 2 };

    gui.line([
        gui.text('摇杆显示类型'),
        dropDownList = gui.dropDownList({
            items: [
                { label: '固定位置', value: JoystickType.FIX },
                { label: '自由位置', value: JoystickType.AUTO },
                { label: '自由位置，隐藏摇杆', value: JoystickType.AUTO_HIDE },
            ],
            value: target.showType
        })
    ]);
    // 值变化回调函数
    dropDownList.onValueChanged = function (newValue) {
        target.showType = newValue;
    };

    // 刷新按钮
    gui.columnWidths = ["70+0.1"];
    gui.line([
        playBtn = gui.button('刷新'),
    ]);
    // 注册点击事件
    playBtn.on('click', function () {
        target.initShowType();
    });

    // 标题分割线-end
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }, { colspan: 3 })
    ]);
});