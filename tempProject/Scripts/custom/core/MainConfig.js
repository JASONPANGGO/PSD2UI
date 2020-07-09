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
     * 项目配置
     * @author VaMP
     */
    var MainConfig = /** @class */ (function (_super) {
        __extends(MainConfig, _super);
        function MainConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * 游戏版本,自行填写
             */
            _this.version = "1";
            /** 自动gameStart(调试用) */
            _this.autoGameStart = true;
            /** 自动播放BGM */
            _this.autoPlayBgm = true;
            /** 背景音乐名字，默认bm_bgm */
            _this.bgmName = "bm_bgm";
            /** 显示fps */
            _this.showFps = false;
            /** 使用动态参数json文件 */
            _this.useConfigJson = true;
            /** 是否加载开始界面预制 */
            _this.isCreateStartPrefab = true;
            _this.serializableFields = {
                version: qc.Serializer.STRING,
                autoGameStart: qc.Serializer.BOOLEAN,
                showFps: qc.Serializer.BOOLEAN,
                useConfigJson: qc.Serializer.BOOLEAN,
                bgmName: qc.Serializer.STRING,
                autoPlayBgm: qc.Serializer.BOOLEAN,
                isCreateStartPrefab: qc.Serializer.BOOLEAN,
                startPrefab: qc.Serializer.PREFAB,
                endingPrefab: qc.Serializer.PREFAB,
                touchMaskPrefab: qc.Serializer.PREFAB,
            };
            return _this;
        }
        MainConfig.prototype.awake = function () {
            ps.cfg.AUTO_GAMESTART = this.autoGameStart;
            ps.cfg.SHOW_FPS = this.showFps;
            ps.cfg.USE_CONFIG_JSON = this.useConfigJson;
            //
            ps.cfg.BGM_NAME = this.bgmName;
            ps.cfg.AUTO_PLAY_BGM = this.autoPlayBgm;
            //根节点
            UIRoot = this.gameObject;
            //
            ps.Print.blue("game version " + this.version);
        };
        MainConfig.prototype.update = function () {
            ps.timer.update(this.game.time.deltaTime);
            ps.updateList.update(this.game.time.deltaTime);
        };
        return MainConfig;
    }(qc.Behaviour));
    ps.MainConfig = MainConfig;
    qc.registerBehaviour('ps.MainConfig', MainConfig);
    MainConfig["__menu"] = 'Custom/MainConfig';
})(ps || (ps = {}));
