/** 抛物线事件 */
declare enum ParabolaEvent {
    THROW_START = "throwStart"
}
/** 抛射控制类型 */
declare enum ParabolaType {
    JOYSTICK = 0,
    MOUSE_UP = 1,
    TIME_LOOP = 2
}
/**
 * 抛物线组件
 * @description 绘制抛物线，可用于物体抛射
 * @author JingBin
 */
declare namespace ps {
    class Parabola extends ps.Behaviour {
        articleTexture: qc.Texture;
        articleScale: number;
        gravity: number;
        parabolaAuto: boolean;
        parabolaParent: qc.Node;
        parabolaInterval: number;
        parabolaTimeMin: number;
        parabolaLittleTime: number;
        private _parabolaType;
        speedX: number;
        speedY: number;
        speedMin: {
            x: number;
            y: number;
        };
        speedMax: {
            x: number;
            y: number;
        };
        color: qc.Color;
        article: qc.UIImage;
        articleParabola: qc.UIImage[];
        private articlePool;
        private shapes;
        private parabolaTimer;
        private awaked;
        eventDisp: ps.EventDispatcher;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        update(): void;
        refresh(): void;
        get parabolaType(): ParabolaType;
        set parabolaType(type: ParabolaType);
        private initParabolaType;
        private joystickUp;
        private mouseUp;
        private timeFinish;
        private updateWeapon;
        private createArticle;
        private throwStart;
        private addParabola;
        private startPos;
        private chgAngle;
        private chgArticle;
        /** 绘制路径 */
        drawPath(stageX?: number, stageY?: number): void;
        private getGraphics;
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
}
