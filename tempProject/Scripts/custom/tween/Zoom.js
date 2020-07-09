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
         * 循环缩放组件
         * @author VaMP
         */
        var Zoom = /** @class */ (function (_super) {
            __extends(Zoom, _super);
            function Zoom() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /** 自动放大缩小比例，0为不缩放。默认为0.1 */
                _this.scale = 0.1;
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    scale: qc.Serializer.NUMBER,
                    duration: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
            }
            /** 播放 */
            Zoom.prototype.play = function () {
                if (!this.tween) {
                    this.tween = ps.Tween.zoom(this.gameObject, this.scale, this.duration, this.delay);
                }
                else {
                    this.resume();
                }
            };
            return Zoom;
        }(tween.TweenBase));
        tween.Zoom = Zoom;
        qc.registerBehaviour('ps.tween.Zoom', Zoom);
        Zoom["__menu"] = 'CustomTween/Zoom';
    })(tween = ps.tween || (ps.tween = {}));
})(ps || (ps = {}));
