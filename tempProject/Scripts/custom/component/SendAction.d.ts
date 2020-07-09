declare namespace ps {
    /**
     * 埋点组件,挂载的对象被点击时，会发送埋点信息
     * @author VaMP
     */
    class SendAction extends ps.Behaviour {
        action: number;
        /** 序列化 */
        private serializableFields;
        awake(): void;
    }
}
