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
     * 可以运行代码的组件
     * @author VaMP
     */
    var RunCode = /** @class */ (function (_super) {
        __extends(RunCode, _super);
        function RunCode() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.awakeCode = "";
            _this.onStartCode = "";
            _this.onDownCode = "";
            _this.onEndCode = "";
            /** 序列化 */
            _this.serializableFields = {
                awakeCode: qc.Serializer.STRING,
                onStartCode: qc.Serializer.STRING,
                onDownCode: qc.Serializer.STRING,
                onEndCode: qc.Serializer.STRING
            };
            return _this;
        }
        RunCode.prototype.awake = function () {
            new Function(this.awakeCode).bind(this)();
            if (this.onDownCode != "")
                this.gameObject.interactive = true;
        };
        RunCode.prototype.onStart = function () {
            new Function(this.onStartCode).bind(this)();
        };
        RunCode.prototype.onDown = function () {
            new Function(this.onDownCode).bind(this)();
        };
        RunCode.prototype.onEnd = function (result) {
            new Function("result", this.onEndCode).bind(this)(result);
        };
        return RunCode;
    }(ps.Behaviour));
    ps.RunCode = RunCode;
    qc.registerBehaviour('ps.RunCode', RunCode);
    RunCode["__menu"] = 'Custom/RunCode';
})(ps || (ps = {}));
