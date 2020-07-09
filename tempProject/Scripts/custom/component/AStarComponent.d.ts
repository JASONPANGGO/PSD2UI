declare namespace ps {
    /**
     * A*寻路地图组件
     * @author VaMP
     */
    class AStarComponent extends ps.Behaviour {
        rows: number;
        cols: number;
        data: string;
        editMode: boolean;
        isDrawAll: boolean;
        get cellWidth(): number;
        get cellHeight(): number;
        map: AStarMap;
        /** 本次要绘画的值 */
        private drawV;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        /**
         * 获取路径，返回值为路径点的集合，无法寻路则返回空数组
         * @param startX
         * @param startY
         * @param endX
         * @param endY
         */
        getPath(startX: number, startY: number, endX: number, endY: number): any[];
        private onDown;
        private onDrag;
        /** 根据事件计算点击的格子索引 */
        private calRowCol;
        /** 设置参数并且绘制出来 */
        setAndDraw(row: number, col: number): void;
        /**
        * 画出地图
        */
        drawAll(): void;
        drawPath(arr: {
            x: number;
            y: number;
        }[]): void;
        drawOne(row: number, col: number, v: number): void;
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
