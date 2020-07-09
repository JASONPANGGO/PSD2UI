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
     * 多语言响应式组件
     * @author JingBin
     */
    var Languages = /** @class */ (function (_super) {
        __extends(Languages, _super);
        function Languages(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            /** 序列化 */
            _this.serializableFields = {
                langKey: qc.Serializer.STRING
            };
            return _this;
            // this.runInEditor = true;
        }
        Languages.prototype.awake = function () {
            if (!this.game.config["loadLanguagesJson"])
                return;
            languagesMgr.updateLabel(this.gameObject, this.langKey);
        };
        Languages.prototype.refresh = function (key) {
            this.langKey = key;
            this.awake();
        };
        Languages.prototype.getRes = function () {
            if (!this.game.config["loadLanguagesJson"])
                return;
            return languagesMgr.getRes();
        };
        return Languages;
    }(ps.Behaviour));
    ps.Languages = Languages;
    qc.registerBehaviour('ps.Languages', Languages);
    Languages["__menu"] = 'Custom/Languages';
})(ps || (ps = {}));
