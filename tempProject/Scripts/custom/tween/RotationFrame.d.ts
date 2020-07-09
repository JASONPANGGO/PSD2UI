declare namespace ps.tween {
    /**
     * 循环旋转组件(帧更新类型)
     * @author VaMP
     */
    class RotationFrame extends qc.Behaviour {
        playOnAwake: boolean;
        /** 角速度,默认为100，1秒转100度 */
        speed: number;
        delay: number;
        /** 序列化 */
        protected serializableFields: Object;
        play(): void;
        update(): void;
    }
}
