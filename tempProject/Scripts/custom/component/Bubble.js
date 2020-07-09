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
    var btn;
    (function (btn) {
        /**
         * 冒泡组件
         */
        var Bubble = /** @class */ (function (_super) {
            __extends(Bubble, _super);
            function Bubble(gameObject) {
                var _this = _super.call(this, gameObject) || this;
                /** 调试模式 */
                _this.debug = false;
                /** 持续漂浮Y值（范围为0或空时，不触发漂浮） */
                _this.floatY = -30;
                /** 持续漂浮时间（每次漂浮时间）（秒） */
                _this.floatT = .5;
                _this.serializableFields = {
                    debug: qc.Serializer.BOOLEAN,
                    floatY: qc.Serializer.NUMBER,
                    floatT: qc.Serializer.NUMBER
                };
                // Init the behaviour
                _this.gameObject.interactive = true;
                return _this;
            }
            Bubble.prototype.awake = function () {
                this.initScaleX = this.gameObject.scaleX || 1;
                this.initScaleY = this.gameObject.scaleY || 1;
                this.initY = this.gameObject.y || 0;
            };
            Bubble.prototype.onDown = function () {
                if (!this.debug) {
                    return;
                }
                if (this.clickIde) {
                    this.hide();
                }
                else {
                    this.show();
                }
                this.clickIde = !this.clickIde;
            };
            /** 显示 */
            Bubble.prototype.show = function () {
                var _this = this;
                var tw = this.gameObject.addScript("qc.TweenScale");
                this.gameObject.y = this.initY;
                this.gameObject.visible = true;
                // tw.from = new qc.Point(0, 0);
                this.gameObject.scaleX = this.gameObject.scaleY = 0;
                tw.to = new qc.Point(this.initScaleX, this.initScaleY);
                tw.duration = .2;
                tw.onFinished.addOnce(function () {
                    tw.destroy();
                    _this.float();
                });
                tw.enable = true;
            };
            /** 持续漂浮 */
            Bubble.prototype.float = function () {
                if (!this.floatY) {
                    return;
                }
                var tw = this.gameObject.addScript("qc.TweenPosition");
                tw.from = new qc.Point(this.gameObject.x, this.initY);
                tw.to = new qc.Point(this.gameObject.x, this.initY + this.floatY);
                tw.moveAxis = qc.TweenPosition.ONLY_Y;
                tw.style = qc.Tween.STYLE_PINGPONG;
                tw.duration = this.floatT;
                tw.enable = true;
            };
            /** 隐藏 */
            Bubble.prototype.hide = function (destory) {
                var _this = this;
                var _tw = this.gameObject.getScript("qc.TweenPosition");
                if (_tw) {
                    _tw.destroy();
                }
                this.gameObject.y = this.initY;
                var tw = this.gameObject.addScript("qc.TweenScale");
                tw.from = new qc.Point(this.initScaleX, this.initScaleY);
                tw.to = new qc.Point(0, 0);
                tw.duration = .2;
                tw.onFinished.addOnce(function () {
                    tw.destroy();
                    _this.gameObject.visible = false;
                    _this.gameObject.y = _this.initY;
                    _this.gameObject.scaleX = _this.initScaleX;
                    _this.gameObject.scaleY = _this.initScaleY;
                    if (destory) {
                        _this.gameObject.destroy();
                    }
                    if (_this.debug) {
                        _this.game.timer.add(500, _this.show, _this);
                    }
                });
                tw.enable = true;
            };
            return Bubble;
        }(qc.Behaviour));
        btn.Bubble = Bubble;
        qc.registerBehaviour('ps.btn.Bubble', Bubble);
        Bubble["__menu"] = 'Btn/Bubble';
    })(btn = ps.btn || (ps.btn = {}));
})(ps || (ps = {}));
