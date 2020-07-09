declare namespace ps {
    /**
     * 震动组件
     */
    class Shake extends qc.Behaviour {
        private initX;
        private initY;
        private duaringTime;
        private maxDis;
        private count;
        /**
         * 一秒震动次数
         */
        private rate;
        /**
         * 当前正在震动？
         */
        isShaking: boolean;
        playOnAwake: boolean;
        private evt;
        private serializableFields;
        constructor(gameObject: qc.Node);
        protected awake(): void;
        /**
         * 震动
         * @param        _duaringTime      震动持续时长（秒）
         * @param        _rate      震动频率(一秒震动多少次)
         * @param        _maxDis    震动最大距离
         */
        play(_duaringTime?: number, _rate?: number, _maxDis?: number): void;
        /**停止震动 */
        stop(): void;
        private shaking;
        private shakeComplete;
        onDestroy(): void;
        protected update(): void;
    }
}
