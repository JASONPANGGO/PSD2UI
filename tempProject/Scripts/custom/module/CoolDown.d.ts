declare namespace ps {
    class CoolDown extends ps.EventDispatcher {
        static FINISH: string;
        static DO: string;
        static DOFALSE: string;
        static RESET: string;
        /** 名字 */
        name: string | number;
        /** 冷却持续时间 */
        duration: number;
        /** 剩余时间 */
        remainingTime: number;
        /** 完成百分比 */
        get percentage(): number;
        /** 是否暂停 */
        isPause: boolean;
        /** 时间缩放 */
        timeScale: number;
        /**
         * 冷却时间模块
         * @param name 名字
         * @param duration 冷却持续时间
         * @author VaMP
         */
        constructor(name: string | number, duration: number);
        /**
         * 重新开始CD计时
         * @param duration 冷却持续时间,如不需要修改则不填
         */
        reset(duration?: number): void;
        /**
         * 重新开始CD计时并暂停
         */
        resetAndPause(): void;
        /** 是否在冷却期间内 */
        get inCD(): boolean;
        /** 是否可以执行操作 */
        get canDo(): boolean;
        /**
         * 更新倒计时
         * @param delta 更新间隔时间
         */
        update(delta: number): void;
        /** 执行操作,如果在CD期间，则执行失败 */
        do(): boolean;
        /** 恢复 */
        resume(): void;
        /** 暂停计时 */
        pause(): void;
        /** 刷新CD */
        refresh(): void;
        /** 销毁 */
        destroy(): void;
    }
}
