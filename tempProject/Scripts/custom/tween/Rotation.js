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
         * 循环旋转组件
         * @author VaMP
         */
        var Rotation = /** @class */ (function (_super) {
            __extends(Rotation, _super);
            function Rotation() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /** 角速度,默认为100，1秒转100度 */
                _this.speed = 100;
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    speed: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
                // awake() {
                //     //if (this.playOnAwake) this.play();
                // }
                // play() {
                //     this.playOnAwake = true;
                // }
                // update() {
                //     if (!this.playOnAwake) return ；
                //     let angle = Mathf.radianToAngle(this.gameObject.rotation);
                //     this.gameObject.rotation = Mathf.angleToRadian(angle + this.speed * qc_game.time.deltaTime / 1000);
                // }
            }
            /** 播放 */
            Rotation.prototype.play = function () {
                if (!this.tween) {
                    this.tween = ps.Tween.rotationLoop(this.gameObject, this.speed);
                }
                else {
                    this.resume();
                }
            };
            return Rotation;
        }(tween.TweenBase));
        tween.Rotation = Rotation;
        qc.registerBehaviour('ps.tween.Rotation', Rotation);
        Rotation["__menu"] = 'CustomTween/Rotation';
    })(tween = ps.tween || (ps.tween = {}));
})(ps || (ps = {}));
