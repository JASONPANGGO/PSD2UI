declare namespace ps {
    /**
     * 光环组件，设置enable可控制光圈的发射与停止
     * @author VaMP
     */
    class Halo extends ps.Behaviour {
        /** 光圈纹理 */
        texture: qc.Texture;
        private _interval;
        set interval(v: number);
        /** 发射间隔时间，默认为500 */
        get interval(): number;
        /** 单个光圈持续时间，默认为1000 */
        duration: number;
        /** 光圈的缩放，X为起始缩放，默认为1，Y为结束缩放，默认为5 */
        scale: qc.Point;
        private timerEvent;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        /**
         * 发射光圈
         */
        private emission;
        /**
         * 创建一个光圈
         */
        private createHalo;
    }
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
