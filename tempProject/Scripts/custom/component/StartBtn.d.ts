declare namespace ps {
    /**
     * 开始按钮组件
     * @author VaMP
     */
    class StartBtn extends ps.Behaviour {
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        onDown(): void;
    }
}
