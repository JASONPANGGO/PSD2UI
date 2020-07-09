declare namespace ps.tween {
    /**
     * 循环缩放组件
     * @author VaMP
     */
    class Zoom extends TweenBase {
        /** 自动放大缩小比例，0为不缩放。默认为0.1 */
        scale: number;
        /** 序列化 */
        protected serializableFields: Object;
        /** 播放 */
        play(): void;
    }
}
