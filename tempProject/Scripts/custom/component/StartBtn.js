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
     * 开始按钮组件
     * @author VaMP
     */
    var StartBtn = /** @class */ (function (_super) {
        __extends(StartBtn, _super);
        function StartBtn(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {};
            return _this;
        }
        StartBtn.prototype.awake = function () {
            this.gameObject.interactive = true;
        };
        StartBtn.prototype.onDown = function () {
            ps.Tween.hideAlpha(ps.start, 300, 0, "remove");
            ps.mainState.start();
        };
        return StartBtn;
    }(ps.Behaviour));
    ps.StartBtn = StartBtn;
    qc.registerBehaviour('ps.StartBtn', StartBtn);
    StartBtn["__menu"] = 'Btn/StartBtn';
})(ps || (ps = {}));
