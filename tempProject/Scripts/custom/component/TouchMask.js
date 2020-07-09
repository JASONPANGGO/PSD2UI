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
     * 全屏触摸遮罩
     * @author VaMP
     */
    var TouchMask = /** @class */ (function (_super) {
        __extends(TouchMask, _super);
        function TouchMask(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {};
            _this.gameObject.interactive = true;
            return _this;
        }
        TouchMask.prototype.onDown = function () {
            ps.Print.red("游戏未开始,请调用gameStart()");
        };
        return TouchMask;
    }(ps.Behaviour));
    ps.TouchMask = TouchMask;
    qc.registerBehaviour('ps.TouchMask', TouchMask);
    TouchMask["__menu"] = 'Custom/TouchMask';
})(ps || (ps = {}));
