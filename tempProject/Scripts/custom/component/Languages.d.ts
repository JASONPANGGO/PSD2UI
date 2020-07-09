declare namespace ps {
    /**
     * 多语言响应式组件
     * @author JingBin
     */
    class Languages extends ps.Behaviour {
        private langKey;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        refresh(key: string): void;
        getRes(): JSON;
    }
}
