/**
 * 多语言响应式组件 - 编辑器菜单拓展
 * @author JingBin
 * @argument 第一个参数为自定义的脚本组件类名
 * @argument 第二个参数为重载的绘制函数
 */
G.extend.inspector('ps.Languages', function () {
    var self = this,
        target = self.target;

    var gui = qc.editor.gui;

    // 标题分割线-start
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }),
        gui.text('多语言响应式', { align: 'center' }),
        gui.divider({ color: "#333333" })
    ]);

    // 获取多语言配置key
    var res = target.getRes();
    var keyArr = [];
    if (res) {
        var languages = res.languages;
        if (languages) {
            for (var lang in languages) {
                var langCfg = languages[lang];
                if (langCfg) {
                    for (var key in langCfg) {
                        keyArr.push(key);
                    }
                    break;
                }
            }
        }
    }

    if (keyArr && keyArr.length > 0) {
        var key = target.langKey || keyArr[0];

        // 文本输入框
        // gui.columnWidths = ['60+0.1', '130+0.1'];
        gui.columnWidths = ['60+0.1', '80+0.1', '20+0.1'];
        var input;
        gui.line([
            gui.text('输入 key'),
            input = gui.stringInput({ value: key }), // value指定了默认值
            playBtn = gui.button('确定'),
        ]);
        target.input = input;
        // 值变化回调函数
        input.onValueChanged = function (newValue) {
            target.refresh(newValue);
            target.dropDownList.value = newValue;
        };

        // 刷新按钮
        // gui.columnWidths = ["70+0.1"];
        // gui.line([
        //     playBtn = gui.button('刷新'),
        // ]);
        // 注册点击事件
        playBtn.on('click', function () {
            target.awake();
            target.dropDownList.value = target.input.value;
        });

        // 下拉列表
        gui.columnWidths = ['60+0.1', '100+0.2'];
        var dropDownList;
        gui.line([
            gui.text('选择 key'),
            dropDownList = gui.dropDownList({
                // items指定列表项
                items: keyArr,
                // value指定默认值
                value: key
            })
        ]);
        target.dropDownList = dropDownList;
        // 值变化回调函数
        dropDownList.onValueChanged = function (newValue) {
            target.refresh(newValue);
            target.input.value = newValue;
        };
        //手动更新下
        target.refresh(key);
    } else {
        // 默认的绘制方法
        self.defaultDraw();
    }

    // 空行
    // gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    // gui.line([
    //     gui.empty({ colspan: 3 })
    // ]);

    // // 刷新按钮
    // gui.columnWidths = ["70+0.1"];
    // gui.line([
    //     playBtn = gui.button('刷新'),
    // ]);
    // // 注册点击事件
    // playBtn.on('click', function () {
    //     target.awake();
    //     target.dropDownList.value = target.input.value;
    // });

    // 标题分割线-end
    gui.columnWidths = ['60+0.1', '60+0.1', '60+0.1'];
    gui.line([
        gui.divider({ color: "#333333" }, { colspan: 3 })
    ]);
});