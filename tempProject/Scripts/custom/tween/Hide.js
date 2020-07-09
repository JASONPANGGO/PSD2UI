var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ps;
(function (ps) {
    var tween;
    (function (tween) {
        /**
         * 隐藏组件，目前有两种模式,缩小消失与渐隐消失
         * @author VaMP
         */
        var Hide = /** @class */ (function (_super) {
            __extends(Hide, _super);
            function Hide() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.type = "zoom";
                _this.oldValue = { alpha: undefined, scaleX: undefined, scaleY: undefined };
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    type: qc.Serializer.STRING,
                    duration: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
            }
            Hide.prototype.play = function () {
                if (!this.tween) {
                    this.oldValue.alpha = this.gameObject.alpha;
                    this.oldValue.scaleX = this.gameObject.scaleX;
                    this.oldValue.scaleY = this.gameObject.scaleY;
                    this.tween = ps.Tween.hide(this.type, this, this.duration, this.delay);
                }
                else {
                    if (!this.tween.isPaused) {
                        this.pause();
                    }
                    else {
                        this.resume();
                    }
                }
            };
            Hide.prototype.reset = function () {
                this.tween = undefined;
                for (var key in this.oldValue) {
                    if (this.oldValue[key] != undefined)
                        this.gameObject[key] = this.oldValue[key];
                }
            };
            return Hide;
        }(ps.tween.TweenBase));
        tween.Hide = Hide;
        qc.registerBehaviour('ps.tween.Hide', Hide);
        Hide["__menu"] = 'CustomTween/Hide';
    })(tween = ps.tween || (ps.tween = {}));
})(ps || (ps = {}));
/**
帧回调（preUpdate、update、postUpdate）
如果实现了这几个函数，系统会自动每帧进行调度（当挂载的Node节点处于可见、并且本脚本的enable=true时）
初始化（awake）
如果实现了awake函数，系统会在Node节点构建完毕（反序列化完成后）自动调度
脚本可用/不可用（onEnable、onDisable）
当脚本的enable从false->true时，会自动调用onEnable函数；反之调用onDisable函数
ps:在awake结束时,如果当前脚本的enable为true，会自动调用onEnable函数
交互回调（onClick、onUp、onDown、onDrag、onDragStart、onDragEnd）
当挂载的Node具备交互时，一旦捕获相应的输入事件，这些函数会自动被调用
脚本析构（onDestroy）
当脚本被移除时，会自动调用onDestroy函数，用户可以定义必要的资源回收代码
//PlaySmart新增回调(继承ps.Behaviour)
pl状态回调(onInit、onStart、onEnding、onRetry)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/ 
