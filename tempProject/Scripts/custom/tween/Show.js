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
         * 出现组件，目前有两种模式,放大出现与渐现出现
         * @author VaMP
         */
        var Show = /** @class */ (function (_super) {
            __extends(Show, _super);
            function Show() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.type = "zoom";
                _this.endValue = 1;
                _this.oldValue = { alpha: undefined, scaleX: undefined, scaleY: undefined };
                /** 序列化 */
                _this.serializableFields = {
                    playOnAwake: qc.Serializer.BOOLEAN,
                    type: qc.Serializer.STRING,
                    duration: qc.Serializer.NUMBER,
                    endValue: qc.Serializer.NUMBER,
                    delay: qc.Serializer.NUMBER,
                };
                return _this;
            }
            Show.prototype.play = function () {
                if (!this.tween) {
                    this.oldValue.alpha = this.gameObject.alpha;
                    this.oldValue.scaleX = this.gameObject.scaleX;
                    this.oldValue.scaleY = this.gameObject.scaleY;
                    switch (this.type) {
                        case "zoom":
                            this.tween = ps.Tween.showZoom(this, this.duration, this.endValue, this.delay);
                            break;
                        case "alpha":
                            this.tween = ps.Tween.showAlpha(this, this.duration, this.endValue, this.delay);
                            break;
                    }
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
            Show.prototype.reset = function () {
                this.tween = undefined;
                for (var key in this.oldValue) {
                    if (this.oldValue[key] != undefined)
                        this.gameObject[key] = this.oldValue[key];
                }
            };
            return Show;
        }(ps.tween.TweenBase));
        tween.Show = Show;
        qc.registerBehaviour('ps.tween.Show', Show);
        Show["__menu"] = 'CustomTween/Show';
    })(tween = ps.tween || (ps.tween = {}));
})(ps || (ps = {}));
