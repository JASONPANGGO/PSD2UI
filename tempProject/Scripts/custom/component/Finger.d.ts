declare namespace ps {
    /**
     * 指引手指组件，设置目标对象来进行移动，旋转屏幕可自动适配
     * @author VaMP
     */
    class Finger extends ps.Behaviour {
        /** 显示，隐藏渐变效果持续时长 */
        showAniTime: number;
        isShow: boolean;
        private onceCB;
        private loopCB;
        private tweener;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        private awake;
        /**
         * 显示
         * @param resetScale 重置缩放值
         */
        show(resetScale?: boolean): void;
        /** 隐藏 */
        hide(): void;
        /**
         * 设置手指缩放值
         * @param x 缩放值X
         * @param y 缩放值Y
         */
        setScale(x: number, y?: number): void;
        /**
         * 显示缩放效果
         * @param scale
         * @param time
         */
        showScaleEffect(scale?: number, time?: number): void;
        /**
         * 停止缩放效果
         */
        stopScaleEffect(): void;
        /**
         * 移动到目标对象位置，有适配
         * @param target 目标对象
         * @param duration 移动时间，0为瞬间到达，默认0
         * @param offset 偏移坐标值，默认（0,0）
         * @param pivot 指引轴心值，默认使用目标对象轴心
         */
        moveToTarget0(target: qc.Node, duration?: number, offset?: qc.Point, pivot?: qc.Point): void;
        /**
         * 移动到坐标位置
         * @param x
         * @param y
         * @param duration 移动时间，0为瞬间到达，默认0
         */
        moveToPoint0(x: number, y: number, duration?: number): void;
        /**
         * 等待时间（什么都不做
         * @param duration 持续时间
         */
        waitTime(duration: any): this;
        /**
         * 显示
         * @param duration 持续时间，默认200
         */
        showImg(duration?: number): this;
        /**
         * 隐藏
         * @param duration 持续时间，默认200
         */
        hideImg(duration?: number): this;
        /**
         * 缩放
         * @param scale 缩放到的值
         * @param duration 持续时间，默认200
         */
        scaleImg(scale: number, duration?: number): this;
        /**
        * 移动到目标对象的位置
        * @param target 目标对象
        * @param duration 移动时长
        * @param offset 坐标偏移量
        * @param pivot 指引轴心值，默认使用目标对象轴心
        */
        moveToTarget(target: qc.Node, duration?: number, offset?: qc.Point, pivot?: qc.Point): this;
        /**
         * 移动到目标点
         * @param x 坐标X
         * @param y 坐标Y
         * @param duration 移动时长
         */
        moveToPoint(x: number, y: number, duration?: number): this;
        /**
         * 清理缓动
         */
        clearTweener(): this;
        /**
         * 开始流程
         * @param cb
         */
        startLoop(cb?: Function): void;
        private onResize;
        private reset;
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
pl状态回调(onInit、onStart、onEnding、onRetry、onResize)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/ 
