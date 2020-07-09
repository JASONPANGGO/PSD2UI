declare namespace ps.tween {
    /**
     * 出现组件，目前有两种模式,放大出现与渐现出现
     * @author VaMP
     */
    class Show extends ps.tween.TweenBase {
        type: "zoom" | "alpha";
        endValue: number;
        private oldValue;
        /** 序列化 */
        protected serializableFields: Object;
        play(): void;
        reset(): void;
    }
}
