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
         * 循环缓动组件基类
         * @author VaMP
         */
        var TweenBase = /** @class */ (function (_super) {
            __extends(TweenBase, _super);
            function TweenBase() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.playOnAwake = true;
                // 花费的时间
                _this.duration = 500;
                // 延迟执行时间，默认0
                _this.delay = 0;
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    playOnStart: qc.Serializer.BOOLEAN,
                    duration: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
            }
            TweenBase.prototype.awake = function () {
                if (this.playOnAwake)
                    this.play();
            };
            TweenBase.prototype.onEnable = function () {
                if (this.tween)
                    this.resume();
            };
            TweenBase.prototype.onDisable = function () {
                if (this.tween)
                    this.pause();
            };
            /**
             * 播放
             */
            TweenBase.prototype.play = function () {
            };
            /**
             * 暂停
             */
            TweenBase.prototype.pause = function () {
                if (this.tween)
                    this.tween.pause();
            };
            /**
             * 恢复
             */
            TweenBase.prototype.resume = function () {
                if (this.tween)
                    this.tween.resume();
            };
            TweenBase.prototype.onDestroy = function () {
                if (this.tween)
                    this.tween.stop();
            };
            return TweenBase;
        }(ps.Behaviour));
        tween.TweenBase = TweenBase;
    })(tween = ps.tween || (ps.tween = {}));
})(ps || (ps = {}));
