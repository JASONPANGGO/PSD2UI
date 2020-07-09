declare namespace ps {
    /**
     * 定时器模块，有单次，多次，循环定时器
     * @author VaMP
     */
    class Timer {
        /**
            * 添加一个定时器，执行一次后即刻销毁
            * @param delay 延迟执行的时间，单位：毫秒
            * @param cb 定时器到了后的处理
            * @param context 回调上下文
            * @param params 定时器的参数列表，回调时会原样带回
            * @return {qc.TimerEvent} 定时器对象
            */
        once(delay: number, cb: Function, context?: Object, ...params: any[]): qc.TimerEvent;
        /**
         * 添加一个定时器，循环不休止的调用
         * @param delay 延迟执行的时间，单位：毫秒
         * @param cb 定时器到了后的处理
         * @param context 回调上下文
         * @param params 定时器的参数列表，回调时会原样带回
         * @return {qc.TimerEvent} 定时器对象
         */
        loop(delay: number, cb: Function, context?: Object, ...params: any[]): qc.TimerEvent;
        /**
         * 添加一个定时器，执行数次后销毁
         * @param times 要执行的次数,0或-1为无限次循环
         * @param delay 延迟执行的时间，单位：毫秒
         * @param cb 定时器到了后的处理
         * @param context 回调上下文
         * @param params 定时器的参数列表，回调时会原样带回
         */
        times(times: number, delay: number, cb: Function, context?: Object, ...params: any[]): qc.TimerEvent;
        /**
         * 移除定时器
         * @param timeEvent
         */
        remove(timeEvent: qc.TimerEvent): void;
        private frameList;
        /**
         * 更新列表
         * @param delta 离上一帧的间隔时间
         */
        update(delta: number): void;
        /**
         * 添加一个定时器，每帧调用
         * @param cb
         */
        frameLoop(cb: Function, context?: Object): void;
        /**
         * 移除帧定时器
         * @param cb 对象
         */
        removeFrameLoop(cb: Function): void;
    }
    /** 定时器实例 */
    export let timer: Timer;
    export {};
}
