declare namespace ps.btn {
    /**
     * 冒泡组件
     */
    class Bubble extends qc.Behaviour {
        /** 调试模式 */
        debug: boolean;
        /** 持续漂浮Y值（范围为0或空时，不触发漂浮） */
        floatY: number;
        /** 持续漂浮时间（每次漂浮时间）（秒） */
        floatT: number;
        /** 目标初始缩放X值 */
        private initScaleX;
        /** 目标初始缩放Y值 */
        private initScaleY;
        /** 目标初始Y值 */
        private initY;
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        private clickIde;
        onDown(): void;
        /** 显示 */
        show(): void;
        /** 持续漂浮 */
        private float;
        /** 隐藏 */
        hide(destory?: boolean): void;
    }
}
