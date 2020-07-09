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
         * 循环移动组件
         * @author VaMP
         */
        var Move = /** @class */ (function (_super) {
            __extends(Move, _super);
            function Move() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.valueX = 0;
                _this.valueY = 0;
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    valueX: qc.Serializer.NUMBER,
                    valueY: qc.Serializer.NUMBER,
                    duration: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
            }
            /** 播放 */
            Move.prototype.play = function () {
                if (!this.tween) {
                    this.tween = ps.Tween.moveYoyo(this.gameObject, this.valueX, this.valueY, this.duration, this.delay);
                }
                else {
                    this.resume();
                }
            };
            return Move;
        }(tween.TweenBase));
        tween.Move = Move;
        qc.registerBehaviour('ps.tween.Move', Move);
        Move["__menu"] = 'CustomTween/Move';
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
*/ 
