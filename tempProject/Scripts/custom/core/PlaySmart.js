/** 版本 */
var PS_VERSION = "0.6.2";
/** qc接口对象 */
var qc_game;
/** phaser接口对象 */
var game;
/** box2d物理世界对象 */
var box2d;
/** 场景对象根节点 */
var UIRoot;
/** playSmart框架 */
var ps;
(function (ps) {
    /** 渠道 */
    ps.CHANNEL = "local";
    /** 环境 */
    ps.ENV = "RELEASE";
    /** 全屏触摸遮罩 */
    var touchMask;
    /** 游戏状态控制 */
    ps.mainState = new ps.GameState;
    /** 项目配置 */
    ps.cfg = {
        AUDIO_PATH: "resource/audio",
        BGM_NAME: "bm_bgm",
        /** 自动播放BGM,默认自动播放 */
        AUTO_PLAY_BGM: true,
        /** 自动gameStart(调试用) */
        AUTO_GAMESTART: true,
        /** 显示fps数据 */
        SHOW_FPS: true,
        USE_CONFIG_JSON: true
    };
    /** 调试配置(方便调试用，在调试模式下会覆盖项目配置) */
    ps.debugCfg = {
        /** 自动gameStart(调试用) */
        AUTO_GAMESTART: true,
        /** 显示fps数据 */
        SHOW_FPS: false,
        USE_CONFIG_JSON: false
    };
    //-----------------------------------------------------
    ps.hasReady = false;
    ps.hasStart = false;
    ps.hasLaunch = false;
    /** 框架全局初始化接口 */
    function init() {
        // console.log("PlaySmart.init");
        if (ps.hasLaunch)
            return;
        game = qc_game["phaser"];
        box2d = qc_game["box2d"];
        if (qici.config.editor)
            ps.editor = window.parent["G"];
        //MW配置信息
        if (window["MW_CONFIG"]) {
            ps.CHANNEL = MW_CONFIG.channel;
        }
        if (window["playsound"] === false) {
            ps.Print.orange("playsound:false");
        }
        //打印信息
        printVersion();
    }
    ps.init = init;
    /** 加载结束 */
    function onLoaded() {
        console.log("config", ps.cfg);
        //
        ps.Audio.rootPath = ps.cfg.AUDIO_PATH;
        //
        UIRoot = qc_game.world.getChildAt(0);
        //编辑器模式下
        if (qici.config.editor) {
            ps.Print.green('gameReady');
            if (window["gameReady"])
                window["gameReady"]();
            return;
        }
        //创建开始界面
        createStartPrefab();
    }
    ps.onLoaded = onLoaded;
    function createStartPrefab() {
        var mainConfig = UIRoot.getScript(ps.MainConfig);
        if (!mainConfig.isCreateStartPrefab) {
            onStartPrefabLoaded();
            return;
        }
        if (mainConfig && mainConfig.startPrefab) {
            ps.start = qc_game.add.clone(mainConfig.startPrefab, UIRoot);
            onStartPrefabLoaded();
        }
        else {
            var url = 'resource/start/start.bin';
            //动态加载
            qc_game.assets.maxRetryTimes = 0;
            qc_game.assets.load(url, function (r) {
                if (r) {
                    ps.start = qc_game.add.clone(r, UIRoot);
                }
                else {
                    ps.Print.red("start开始界面不存在");
                }
                onStartPrefabLoaded();
            });
        }
    }
    ps.createStartPrefab = createStartPrefab;
    function onStartPrefabLoaded() {
        //触摸阻挡
        var mainConfig = UIRoot.getScript(ps.MainConfig);
        if (mainConfig && mainConfig.touchMaskPrefab) {
            touchMask = qc_game.add.clone(mainConfig.touchMaskPrefab, UIRoot);
        }
        //调试参数
        if (ps.ENV === "DEBUG") {
            ps.cfg.AUTO_GAMESTART = ps.debugCfg.AUTO_GAMESTART;
            ps.cfg.SHOW_FPS = ps.debugCfg.SHOW_FPS;
            ps.cfg.USE_CONFIG_JSON = ps.debugCfg.USE_CONFIG_JSON;
        }
        if (ps.cfg.AUTO_GAMESTART) {
            ps.Print.orange("AUTO_GAMESTART");
            window["gameStart"]();
        }
        //初始化动态参数
        if (ps.cfg.USE_CONFIG_JSON)
            ps.GameConfig.init();
        console.log("GAME_CFG", ps.cfg.USE_CONFIG_JSON, GAME_CFG);
        //初始化完成
        ps.hasReady = true;
        ps.mainState.ready();
        ps.Print.green('gameReady');
        if (window["gameReady"])
            window["gameReady"]();
        checkLaunch();
        //FPS工具
        if (ps.cfg.SHOW_FPS) {
            qc_game.assets.load('resource/prefab/FPS.bin', function (r) {
                qc_game.add.clone(r, UIRoot);
            });
        }
    }
    ps.onStartPrefabLoaded = onStartPrefabLoaded;
    /** 真正的启动游戏 */
    function checkLaunch() {
        if (qici.config.editor)
            return;
        if (ps.hasLaunch)
            return;
        if (ps.hasReady && ps.hasStart) {
            ps.Print.green('gameLaunch');
            ps.hasLaunch = true;
            //自动播放BGM
            if (ps.cfg.AUTO_PLAY_BGM != false)
                playBgSound();
            //开始游戏
            gameStart();
        }
    }
    ps.checkLaunch = checkLaunch;
    //PL接口集===============================================================
    /** 已发送埋点列表 */
    var actionRecords = {};
    /** 埋点接口 */
    function sendAction(action) {
        if (actionRecords[action])
            return;
        actionRecords[action] = true;
        ps.Print.blue('sendAction ' + action);
        if (window["HttpAPI"])
            window["HttpAPI"].sendPoint("action&action=" + action);
    }
    ps.sendAction = sendAction;
    /**
     * 全屏诱导点击,点击后自动跳转商店，发送GameEnd
     * @param endType null表示不弹出结束界面,默认win
     */
    function induce(endType) {
        if (endType === void 0) { endType = "win"; }
        qc_game.input.onPointerDown.add(function () {
            ps.install();
            if (endType) {
                switch (endType) {
                    case "win":
                        ps.gameEnd();
                        break;
                    case "lose":
                        ps.gameEnd(false);
                        break;
                    case "null":
                        ps.gameEnd(true, 0, false);
                        break;
                }
            }
        });
    }
    ps.induce = induce;
    /** 安装接口 */
    function install(autoGameEnd) {
        if (autoGameEnd === void 0) { autoGameEnd = false; }
        ps.Print.blue('install');
        if (window["install"])
            window["install"]();
        if (autoGameEnd)
            ps.gameEnd();
    }
    ps.install = install;
    /**
     * 试玩真正开始的接口
     */
    function gameStart() {
        if (touchMask)
            touchMask.visible = false;
        ps.mainState.dispatch(ps.GameState.GAMESTART);
        if (!ps.start)
            ps.mainState.start();
    }
    /**
     * 试玩结束接口,调用此接口会展示ending界面
     * @param result 试玩结果（成功失败),默认为true
     * @param delayShow ending界面延迟弹出时间
     * @param showEnding 展示ending界面，默认true
     */
    function gameEnd(result, delayShow, showEnding) {
        if (result === void 0) { result = true; }
        if (delayShow === void 0) { delayShow = 0; }
        if (showEnding === void 0) { showEnding = true; }
        if (!ps.mainState.end(result))
            return;
        ps.Print.blue("gameEnd " + result + " " + delayShow + " " + showEnding);
        if (window["gameEnd"])
            window["gameEnd"]();
        if (!showEnding)
            return;
        //
        ps.timer.once(delayShow, function () {
            //展示ending界面
            var mainConfig = UIRoot.getScript(ps.MainConfig);
            if (mainConfig && mainConfig.endingPrefab) {
                qc_game.add.clone(mainConfig.endingPrefab, UIRoot);
            }
            else {
                //动态加载
                qc_game.assets.load('resource/ending/ending.bin', function (r) {
                    qc_game.add.clone(r, UIRoot);
                });
            }
        });
    }
    ps.gameEnd = gameEnd;
    //游戏开始或者重新开始的时候调用
    function retry() {
        ps.Print.blue('retry');
        if (window["gameRetry"])
            window["gameRetry"]();
        ps.mainState.reset();
        //重新加载场景
        qc_game.scene.load(qc_game.scene.current, false, undefined, function () {
            ps.hasReady = false;
            ps.hasLaunch = false;
            //重置状态
            ps.mainState.retry();
            createStartPrefab();
        });
    }
    ps.retry = retry;
    //==============================================================
    /** 打印版本信息 */
    function printVersion() {
        var str = " PlaySmart v" + PS_VERSION + " ";
        str += "| jWebAudio " + jwv + " ";
        str += "| Channel " + ps.CHANNEL + " ";
        str += "| Env " + ps.ENV + " ";
        //str += `| enter ${config.ENTER_SCENE}`
        if (hasBase64())
            str += "| base64 ";
        //let colorList = ["#9854d8", "#6c2ca7", "#450f78"];
        var colorList = ["#fb8cb3", "#d44a52", "#871905"];
        //let colorList = ["#00cccc", "#00aaaa", "#006666"];
        console.log("%c %c %c" + str + "%c %c ", "background: " + colorList[0], "background: " + colorList[1], "color:#fff;background: " + colorList[2] + ";", "background: " + colorList[1], "background: " + colorList[0]);
    }
    ps.printVersion = printVersion;
})(ps || (ps = {}));
//SDK调用,游戏开始，一般用来播放背景音乐
function gameStart() {
    if (ps.hasStart) {
        ps.Print.red("ERROR:重复调用gameStart");
        return;
    }
    ps.Print.green('gameStart');
    ps.hasStart = true;
    //需要在gamestart的时候初始化webaudio   
    ps.Audio.playBGM(ps.cfg.BGM_NAME, "mp3", arguments[0]);
    ps.checkLaunch();
}
//SDK调用,游戏结束
function gameClose() {
    //sdk关闭的时候调用js的这个方法，一定要加上！不然安卓可能无法销毁音乐
    //停止所有音乐音效
    window["destorySound"]();
}
