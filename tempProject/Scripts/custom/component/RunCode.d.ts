declare namespace ps {
    /**
     * 可以运行代码的组件
     * @author VaMP
     */
    class RunCode extends ps.Behaviour {
        awakeCode: string;
        onStartCode: string;
        onDownCode: string;
        onEndCode: string;
        /** 序列化 */
        private serializableFields;
        awake(): void;
        onStart(): void;
        onDown(): void;
        onEnd(result: boolean): void;
    }
}
