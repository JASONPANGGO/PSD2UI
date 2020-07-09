declare namespace ps {
    /**
     * 全屏触摸遮罩
     * @author VaMP
     */
    class TouchMask extends ps.Behaviour {
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        onDown(): void;
    }
}
