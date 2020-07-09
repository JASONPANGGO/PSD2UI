var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ps;
(function (ps) {
    /**
     * 游戏配置管理类
     */
    var GameConfig = /** @class */ (function () {
        function GameConfig() {
        }
        /** 初始化游戏配置数据 */
        GameConfig.init = function () {
            if (this.config && this.config != {}) {
                GAME_CFG = {};
                GAME_CFG.playAgain = GameConfig.playAgain;
                for (var key in this.config) {
                    var item = this.config[key];
                    GAME_CFG[key] = item.value;
                }
            }
        };
        Object.defineProperty(GameConfig, "data", {
            /** 整个数据 */
            get: function () {
                var config = game.cache.getJSON("gameConfig");
                if (ps.Tools.objIsNull(config)) {
                    console.error("没有gameConfig文件 或 gameConfig文件配置为空");
                    return config;
                }
                var data = config;
                if (dcoData) {
                    if (!dcoData.param) {
                        data = ps.Tools.strToJson(config[Object.keys(config)[0]]);
                    }
                    else {
                        data = ps.Tools.strToJson(config[dcoData.param]);
                        if (ps.Tools.objIsNull(data))
                            data = ps.Tools.strToJson(config[Object.keys(config)[0]]);
                    }
                    // if (!ps.Tools.objIsNull(data) && !ps.Tools.objIsNull(data.value)) {
                    //     data = data.value;
                    // } else {
                    //     data = config;
                    // }
                }
                else if (ps.Tools.objIsNull(config.gameConfig)) {
                    data = ps.Tools.strToJson(config[Object.keys(config)[0]]);
                }
                return data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "config", {
            /** 获取当前难度配置数据 */
            get: function () {
                var data = this.data;
                if (!data)
                    return;
                var gameConfig = data.gameConfig;
                if (!gameConfig) {
                    console.error('游戏配置gameConfig字段不可省略');
                    return;
                }
                return gameConfig;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "autoEndTime", {
            /** 游戏自动结束时间，0代表不会自动结束 */
            get: function () {
                var data = this.data;
                if (!data || !data.autoEndTime || data.autoEndTime < 0)
                    return 0;
                return data.autoEndTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "playAgain", {
            /** 游戏可重玩次数，大于等于0为指定次数，-1为无限次数 */
            get: function () {
                var data = this.data;
                if (!data || !data.playAgain || data.playAgain < 0)
                    return 0;
                return data.playAgain;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * [已过时，请使用GAME_CFG.key] 获取值
         * @param key 参数名
         * @param rounding 取整，默认不取整
         */
        GameConfig.getValue = function (key, rounding) {
            if (rounding === void 0) { rounding = false; }
            if (!this.config[key]) {
                console.error("\u52A8\u6001\u53C2\u6570\u91CC\u9762\u6CA1\u6709" + key + "\u5B57\u6BB5");
                return;
            }
            if (rounding)
                return Math.round(this.config[key].value);
            return this.config[key].value;
        };
        /** 创建动态参数模板 */
        GameConfig.createTemplete = function () {
            var gb = {};
            gb.autoEndTime = 0;
            gb.playAgain = GAME_CFG.playAgain;
            gb.gameConfig = {};
            //生成动态参数模板
            for (var key in GAME_CFG) {
                if (key === "playAgain")
                    continue;
                var value = GAME_CFG[key];
                switch (typeof (value)) {
                    /** Slider */
                    case "number":
                        gb.gameConfig[key] = {
                            "type": "slider",
                            "value": value,
                            "min": 0,
                            "max": value * 2,
                            "desc": "slider 提示信息",
                        };
                        break;
                    /** 字符串 */
                    case "string":
                        /** 单选 */
                        gb.gameConfig[key] = {
                            "type": "radio",
                            "value": value,
                            "options": [
                                value
                            ],
                            "desc": "radio 提示信息",
                        };
                        /** 文本输入框 */
                        gb.gameConfig[key + "_input"] = {
                            "type": "input:text",
                            "value": value,
                            "desc": "input:text 提示信息",
                        };
                        break;
                    /** 开关 */
                    case "boolean":
                        gb.gameConfig[key] = {
                            "type": "switch",
                            "value": value,
                            "desc": "switch 提示信息",
                        };
                        break;
                    /** 数组 */
                    case "object":
                        if (Array.isArray(value)) {
                            if (value.length <= 0) {
                                value[0] = 0;
                            }
                            switch (typeof (value[0])) {
                                /** Slider数组 */
                                case "number":
                                    var minVal = Math.min.apply(Math, value);
                                    var maxVal = Math.max.apply(Math, value);
                                    gb.gameConfig[key] = {
                                        "type": "array",
                                        "subtype": "slider",
                                        "min": minVal,
                                        "max": maxVal,
                                        "value": value,
                                        "desc": "Slider数组 提示信息",
                                    };
                                    break;
                                /** 字符串数组 */
                                case "string":
                                    /** 文本输入框数组 */
                                    gb.gameConfig[key] = {
                                        "type": "array",
                                        "subtype": "input:text",
                                        "value": value,
                                        "desc": "文本输入框数组 提示信息",
                                    };
                                    /** 复选 */
                                    gb.gameConfig[key + "_checkbox"] = {
                                        "type": "checkbox",
                                        "value": value,
                                        "options": value,
                                        "desc": "checkbox 提示信息",
                                    };
                                    break;
                            }
                        }
                        break;
                    default:
                }
            }
            console.log(ps.Tools.jsonToStr(gb));
            console.log("可使用用户代码片段创建，指令如下");
            console.log("cfgSlider,cfgInput,cfgSwitch,cfgRadio,cfgCheckbox,cfgArray");
            console.log("说明文档：http://confluence.mobvista.com/pages/viewpage.action?pageId=30346816");
        };
        __decorate([
            ObsoleteMethod("GAME_CFG.key", "GameConfig.getValue")
        ], GameConfig, "getValue", null);
        return GameConfig;
    }());
    ps.GameConfig = GameConfig;
})(ps || (ps = {}));
