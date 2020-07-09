declare enum VideoEvent {
    PLAY_STAET = "playStart",
    PLAY_COMPLETE = "playComplete"
}
/**
 * 交互视频组件
 * @description 交互视频组件，交互视频模板使用
 * @author JingBin
 */
declare class VideoBeh extends ps.Behaviour {
    gameObject: qc.Dom;
    bgUrl: string;
    videoUrl: string;
    /** 视频播放类型：1:交互后播放，2:播放后交互, 3:循环播放 */
    playType: number;
    private gameDiv;
    private videoEle;
    private player;
    private videoLoaded;
    private curW;
    private curH;
    private currentW;
    private currentH;
    eventDisp: ps.EventDispatcher;
    /** 序列化 */
    private serializableFields;
    constructor(gameObject: qc.Node);
    /** 试玩初始化的处理 */
    onInit(): void;
    /** 试玩开始时的处理 */
    onStart(): void;
    onResize(): void;
    private resetGameStart;
    private isGameStart;
    private gameStart;
    /** 试玩结束时的处理 */
    onEnd(): void;
    /** 再来一次时的处理(onInit后,onStart前) */
    onRetry(): void;
    update(): void;
    refresh(): void;
    private onTouchInstallId;
    playVideo(): void;
    private playContinue;
    private playComplete;
    private isPlayToOver;
    private playToOver;
    private touchStage;
    private startTurned;
    /** 开始转场 */
    private startTurn;
    private _update;
    get getWinW(): number;
    get getWinH(): number;
    get isChartboost(): boolean;
    private initBg;
    private loadVideo;
    private loadVideoComplete;
    /** 初始化视频容器 */
    private initConVideo;
    /** 适配 DOM 节点 */
    private fitDOMElementInArea;
}
/**
帧回调（preUpdate、update、postUpdate）
如果实现了这几个函数，系统会自动每帧进行调度（当挂载的Node节点处于可见、并且本脚本的enable=true时）
初始化（awake）
如果实现了awake函数，系统会在Node节点构建完毕（反序列化完成后）自动调度
脚本可用/不可用（onEnable、onDisable）
当脚本的enable从false->true时，会自动调用onEnable函数；反之调用onDisable函数
ps:在awake结束时,如果当前脚本的enable为true，会自动调用onEnable函数
交互回调（onClick、onUp、onDown、onDrag、onDragStart、onDragEnd）
当挂载的Node具备交互时，一旦捕获相应的输入事件，这些函数会自动被调用
脚本析构（onDestroy）
当脚本被移除时，会自动调用onDestroy函数，用户可以定义必要的资源回收代码
//PlaySmart新增回调(继承ps.Behaviour)
pl状态回调(onInit、onStart、onEnding、onRetry)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/ 
