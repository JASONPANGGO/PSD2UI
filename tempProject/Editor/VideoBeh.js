/**
 * 交互视频组件 - 编辑器菜单拓展
 * @author JingBin
 * @argument 第一个参数为自定义的脚本组件类名
 * @argument 第二个参数为重载的绘制函数
 */
G.extend.inspector('ps.VideoBeh', function () {
    var self = this,
        target = self.target;

    var gui = qc.editor.gui;

    // 标题分割线-start
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }),
        gui.text('交互视频组件', { align: 'center' }),
        gui.divider({ color: "#333333" })
    ]);

    // 绘制默认控件
    self.defaultDraw();

    // 播放类型，下拉列表
    gui.columnWidths = ['60+0.1', '120+0.2'];
    var dropDownList;

    var VideoPlayType = { TOUCH_PLAY: 1, PLAY_TOUCH: 2, LOOP: 3 };

    gui.line([
        gui.text('播放类型'),
        dropDownList = gui.dropDownList({
            items: [
                { label: '交互后播放', value: VideoPlayType.TOUCH_PLAY },
                { label: '播放后交互', value: VideoPlayType.PLAY_TOUCH },
                { label: '循环播放', value: VideoPlayType.LOOP },
            ],
            value: target.playType
        })
    ]);
    if (dropDownList.value == void 0) {
        dropDownList.value = VideoPlayType.TOUCH_PLAY;
    }
    target.playType = dropDownList.value;
    console.log("播放类型", dropDownList, dropDownList.value);

    // 值变化回调函数
    dropDownList.onValueChanged = function (newValue) {
        target.playType = newValue;
    };

    // 空行
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.empty({ colspan: 3 })
    ]);

    // 刷新按钮
    gui.columnWidths = ["70+0.1"];
    gui.line([
        playBtn = gui.button('更新播放类型'),
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