/** 版本 */
declare const PS_VERSION = "0.6.2";
/** qc接口对象 */
declare let qc_game: qc.Game;
/** phaser接口对象 */
declare let game: Phaser.Game;
/** box2d物理世界对象 */
declare let box2d: Box2DWorld;
/** 场景对象根节点 */
declare let UIRoot: qc.Node;
/** playSmart框架 */
declare namespace ps {
    /** 渠道 */
    let CHANNEL: string;
    /** 环境 */
    let ENV: "EDITOR" | "DEBUG" | "RELEASE";
    /** 编辑器对象，在编辑器的模式下才有 */
    let editor: {
        /** 编辑器场景 */
        scene: {
            gameSize: {
                width: number;
                height: number;
            };
        };
    };
    /** 开始界面 */
    let start: qc.Node;
    /** 结束界面 */
    let ending: qc.Node;
    /** 游戏状态控制 */
    let mainState: GameState;
    /** 项目配置 */
    let cfg: {
        AUDIO_PATH: string;
        BGM_NAME: string;
        /** 自动播放BGM,默认自动播放 */
        AUTO_PLAY_BGM: boolean;
        /** 自动gameStart(调试用) */
        AUTO_GAMESTART: boolean;
        /** 显示fps数据 */
        SHOW_FPS: boolean;
        USE_CONFIG_JSON: boolean;
    };
    /** 调试配置(方便调试用，在调试模式下会覆盖项目配置) */
    let debugCfg: {
        /** 自动gameStart(调试用) */
        AUTO_GAMESTART: boolean;
        /** 显示fps数据 */
        SHOW_FPS: boolean;
        USE_CONFIG_JSON: boolean;
    };
    let hasReady: boolean;
    let hasStart: boolean;
    let hasLaunch: boolean;
    /** 框架全局初始化接口 */
    function init(): void;
    /** 加载结束 */
    function onLoaded(): void;
    function createStartPrefab(): void;
    function onStartPrefabLoaded(): void;
    /** 真正的启动游戏 */
    function checkLaunch(): void;
    /** 埋点接口 */
    function sendAction(action: number): void;
    /**
     * 全屏诱导点击,点击后自动跳转商店，发送GameEnd
     * @param endType null表示不弹出结束界面,默认win
     */
    function induce(endType?: "win" | "lose" | "null"): void;
    /** 安装接口 */
    function install(autoGameEnd?: boolean): void;
    /**
     * 试玩结束接口,调用此接口会展示ending界面
     * @param result 试玩结果（成功失败),默认为true
     * @param delayShow ending界面延迟弹出时间
     * @param showEnding 展示ending界面，默认true
     */
    function gameEnd(result?: boolean, delayShow?: number, showEnding?: boolean): void;
    function retry(): void;
    /** 打印版本信息 */
    function printVersion(): void;
}
declare function gameStart(): void;
declare function gameClose(): void;
