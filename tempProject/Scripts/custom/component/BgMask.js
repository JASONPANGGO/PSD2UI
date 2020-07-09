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
     * 背景颜色组件
     * @author VaMP
     */
    var BgMask = /** @class */ (function (_super) {
        __extends(BgMask, _super);
        function BgMask(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._color = new qc.Color("000000");
            /** 序列化 */
            _this.serializableFields = {
                color: qc.Serializer.COLOR
            };
            _this.runInEditor = true;
            return _this;
        }
        BgMask.prototype.awake = function () {
            this.refresh();
        };
        Object.defineProperty(BgMask.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (c) {
                this._color = c;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        BgMask.prototype.refresh = function () {
            var graphics = this.gameObject;
            graphics.clear();
            graphics.beginFill(this.color.toNumber(false));
            graphics.drawRect(0, 0, ps.DESIGN_LONG, ps.DESIGN_LONG);
            graphics.endFill();
        };
        return BgMask;
    }(qc.Behaviour));
    ps.BgMask = BgMask;
    qc.registerBehaviour('ps.BgMask', BgMask);
    BgMask["__menu"] = 'Custom/BgMask';
})(ps || (ps = {}));
