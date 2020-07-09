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
         * 循环旋转组件(帧更新类型)
         * @author VaMP
         */
        var RotationFrame = /** @class */ (function (_super) {
            __extends(RotationFrame, _super);
            function RotationFrame() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.playOnAwake = true;
                /** 角速度,默认为100，1秒转100度 */
                _this.speed = 100;
                // 延迟执行时间，默认0
                _this.delay = 0;
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    speed: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
            }
            RotationFrame.prototype.play = function () {
                var _this = this;
                if (this.delay) {
                    ps.timer.once(this.delay, function () {
                        _this.playOnAwake = true;
                    });
                }
                else {
                    this.playOnAwake = true;
                }
            };
            RotationFrame.prototype.update = function () {
                if (!this.playOnAwake)
                    return;
                var angle = ps.Mathf.radianToAngle(this.gameObject.rotation);
                this.gameObject.rotation = ps.Mathf.angleToRadian(angle + this.speed * this.game.time.deltaTime / 1000);
            };
            return RotationFrame;
        }(qc.Behaviour));
        tween.RotationFrame = RotationFrame;
        qc.registerBehaviour('ps.tween.RotationFrame', RotationFrame);
        RotationFrame["__menu"] = 'CustomTween/RotationFrame';
    })(tween = ps.tween || (ps.tween = {}));
})(ps || (ps = {}));
