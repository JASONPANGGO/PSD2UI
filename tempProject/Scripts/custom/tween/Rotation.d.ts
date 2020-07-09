declare namespace ps.tween {
    /**
     * 循环旋转组件
     * @author VaMP
     */
    class Rotation extends TweenBase {
        /** 角速度,默认为100，1秒转100度 */
        speed: number;
        /** 序列化 */
        protected serializableFields: Object;
        /** 播放 */
        play(): void;
    }
}
