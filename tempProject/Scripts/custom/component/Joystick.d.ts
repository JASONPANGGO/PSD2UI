/** 摇杆事件 */
declare enum JoystickEvent {
    ON_DOWN = "JoystickOnDown",
    ON_DRAG = "JoystickOnDrag",
    ON_UP = "JoystickOnUp"
}
/** 摇杆显示类型 */
declare enum JoystickType {
    FIX = 0,
    AUTO = 1,
    AUTO_HIDE = 2
}
declare namespace ps {
    /**
     * 摇杆组件
     * @description 触摸出现摇杆
     * @author JingBin
     */
    class Joystick extends ps.Behaviour {
        ball: qc.UIImage;
        ballTexture: qc.Texture;
        circle: qc.UIImage;
        circleTexture: qc.Texture;
        private _showType;
        private circleRadius;
        private ballRadius;
        private centerX;
        private centerY;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        private createJoystick;
        get showType(): JoystickType;
        set showType(type: JoystickType);
        private initShowType;
        childrenCreated(): void;
        private startX;
        private startY;
        private touchID;
        onDown(e: qc.PointerEvent): void;
        private p1;
        private p2;
        private moveBall;
        onDrag(e: qc.DragEvent): void;
        onUp(e: qc.DragEndEvent): void;
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
