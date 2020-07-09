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
    /**
     * 光环组件，设置enable可控制光圈的发射与停止
     * @author VaMP
     */
    var Halo = /** @class */ (function (_super) {
        __extends(Halo, _super);
        function Halo(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._interval = 500;
            /** 单个光圈持续时间，默认为1000 */
            _this.duration = 1000;
            /** 光圈的缩放，X为起始缩放，默认为1，Y为结束缩放，默认为5 */
            _this.scale = new qc.Point(0, 5);
            /** 序列化 */
            _this.serializableFields = {
                texture: qc.Serializer.TEXTURE,
                interval: qc.Serializer.NUMBER,
                duration: qc.Serializer.NUMBER,
                scale: qc.Serializer.POINT,
            };
            _this.runInEditor = true;
            return _this;
        }
        Object.defineProperty(Halo.prototype, "interval", {
            /** 发射间隔时间，默认为500 */
            get: function () {
                return this._interval;
            },
            set: function (v) {
                this._interval = v;
                this.emission();
            },
            enumerable: true,
            configurable: true
        });
        Halo.prototype.awake = function () {
            this.gameObject.removeChildren();
            this.emission();
        };
        /**
         * 发射光圈
         */
        Halo.prototype.emission = function () {
            if (this.timerEvent)
                ps.timer.remove(this.timerEvent);
            this.timerEvent = ps.timer.loop(this.interval, this.createHalo, this);
        };
        /**
         * 创建一个光圈
         */
        Halo.prototype.createHalo = function () {
            if (!this.enable)
                return;
            var halo = new qc.UIImage(qc_game);
            this.gameObject.addChild(halo);
            halo.texture = this.texture;
            halo.pivotX = 0.5;
            halo.pivotY = 0.5;
            halo.scaleX = this.scale.x;
            halo.scaleY = this.scale.x;
            ps.Tween.to(halo, { scale: this.scale.y, alpha: 0 }, this.duration).onComplete.addOnce(function () {
                halo.removeSelf();
            });
        };
        return Halo;
    }(ps.Behaviour));
    ps.Halo = Halo;
    qc.registerBehaviour('ps.Halo', Halo);
    Halo["__menu"] = 'Custom/Halo';
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
