declare namespace ps {
    /**
     * 震动工具
     * Example:
     * 震动目标obj，1秒内震动10次，震动最大距离10
     * ShakeTool.shakeObj(obj, 1000, 10, 10);
     */
    class ShakeTool {
        private initX;
        private initY;
        private target;
        private maxDisX;
        private maxDisY;
        private rate;
        private shakTw;
        private loopDelay;
        private completeDelay;
        /**
         * 震动显示对象
         * @param        target    震动目标对象
         * @param        duration      震动持续时长（毫秒）
         * @param        rate      震动频率(一秒震动多少次)
         * @param        maxDisX 震动x轴最大距离
         * @param        maxDisY 震动x轴最大距离
         */
        static shakeObj(target: qc.Node, duration: number, rate: number, maxDisX: number, maxDisY?: number): ShakeTool;
        /**
         * 震动显示对象
         *
         * @param {qc.Node} target 震动目标对象
         * @param {number} time 震动持续时长（毫秒）
         * @param {number} rate 震动频率(一秒震动多少次)
         * @param {number} maxDisX 震动x轴最大距离
         * @param {number} maxDisY 震动y轴最大距离
         */
        shakeObj(target: qc.Node, time: number, rate: number, maxDisX: number, maxDisY?: number): void;
        /**
         * 震动中
         */
        private shaking;
        /**
         * 震动完成
         */
        private shakeComplete;
        /**
         * 停止震动
         */
        stop(): void;
    }
}
