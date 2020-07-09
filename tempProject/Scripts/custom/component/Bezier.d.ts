/** 贝塞尔曲线事件 */
declare enum BezierEvent {
    THROW_START = "throwStart"
}
/**
 * 贝塞尔曲线组件
 * @description 可用于绘制贝塞尔曲线，得到贝塞尔曲线轨迹上所有的点
 * @author JingBin
 */
declare namespace ps {
    class Bezier extends ps.Behaviour {
        articleTexture: qc.Texture;
        articleScale: number;
        orgPot: qc.Point;
        powerPot: qc.Point;
        tarPot: qc.Point;
        color: qc.Color;
        lineLen: number;
        potCntMax: number;
        speedX: number;
        speedY: number;
        article: qc.UIImage;
        private articlePool;
        graphics: qc.Graphics;
        curPot: qc.Point;
        private allPot;
        eventDisp: ps.EventDispatcher;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        refresh(): void;
        set factor(value: number);
        private initBezier;
        private joystickUp;
        private createArticle;
        private throwStart;
        /**
         * 已知某一点坐标，旋转角度，长度，求另一点坐标
         * @param orgPot
         * @param angle
         * @param len
         */
        private calculateCoordinatePoint;
        /**
         * 计算某一点旋转后的坐标点
         * @param pot
         * @param angle
         */
        private calculateRotate;
        /**
         * 计算相对坐标系的坐标
         * @param orgPot
         * @param relativeOrgPot
         */
        private calculateCoordinateRelativePoint;
        private chgAngle;
        private chgArticle;
        private secondPot;
        /** 绘制路径 */
        private drawPath;
        private drawPot;
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
