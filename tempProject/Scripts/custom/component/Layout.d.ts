declare namespace ps {
    /**
     * 布局组件
     * @author VaMP
     */
    class Layout extends qc.Behaviour {
        private inited;
        /**
         * 设置布局
         * @param obj 要布局的对象
         * @param key 要设置的属性,left,right,top,bottom等
         * @param value 值
         */
        static setLayout(obj: qc.Node | any, key: string, value: number | string): void;
        autoSize: boolean;
        private serializableFields;
        /** 默认布局数据 */
        private layoutDef;
        /** 布局数据 */
        private layout;
        private layoutData;
        constructor(gameObject: qc.Node);
        awake(): void;
        onEnable(): void;
        /**
         * 获取布局数据
         * @param otype
         * @param mtype
         */
        getData(otype?: orientationType, mtype?: mobileType): LayoutData;
        get left(): number;
        set left(v: number);
        get top(): number;
        set top(v: number);
        get right(): number;
        set right(v: number);
        get bottom(): number;
        set bottom(v: number);
        get centerX(): number;
        set centerX(v: number);
        get centerY(): number;
        set centerY(v: number);
        get percX(): number;
        set percX(v: number);
        get percY(): number;
        set percY(v: number);
        get scaleXY(): number;
        set scaleXY(v: number);
        /** 刷新布局 */
        refresh(): void;
        /** 使用布局数据 */
        private useData;
        /**
         * 把字符串转换为LayoutData
         * @param rawdata 原始数据（字符串)
         */
        private parseData;
    }
    /** 布局数据 */
    class LayoutData {
        /** 屏幕方向 */
        otype?: orientationType;
        /** 屏幕类型 */
        mtype?: mobileType;
        /** 从组件左边到其内容区域左边之间的水平距离 */
        left?: number;
        /** 从组件右边到其内容区域右边之间的水平距离 */
        right?: number;
        /** 从组件顶边到其内容区域顶边之间的垂直距离 */
        top?: number;
        /** 从组件底边到其内容区域底边之间的垂直距离 */
        bottom?: number;
        /** 在父容器中，此对象的水平方向中轴线与父容器的水平方向中心线的距离 */
        centerX?: number;
        /** 在父容器中，此对象的垂直方向中轴线与父容器的垂直方向中心线的距离 */
        centerY?: number;
        /** 在父容器中百分比水平位置,0-1 */
        percX?: number;
        /** 在父容器中百分比垂直位置,0-1 */
        percY?: number;
        x?: number | string;
        y?: number;
        rotation?: number;
        width?: number;
        height?: number;
        scaleX?: number;
        scaleY?: number;
        scaleXY?: number;
        /**
         * 克隆布局数据
         */
        clone(): LayoutData;
        /**
         * 合并布局数据
         * @param data 要合并的数据
         */
        merge(data: LayoutData): void;
    }
}
