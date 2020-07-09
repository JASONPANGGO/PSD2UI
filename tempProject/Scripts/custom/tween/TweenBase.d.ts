declare namespace ps.tween {
    /**
     * 循环缓动组件基类
     * @author VaMP
     */
    class TweenBase extends ps.Behaviour {
        playOnAwake: boolean;
        duration: number;
        delay: number;
        protected tween: Phaser.Tween;
        /** 序列化 */
        protected serializableFields: Object;
        awake(): void;
        onEnable(): void;
        onDisable(): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 恢复
         */
        resume(): void;
        onDestroy(): void;
    }
}
