declare namespace ps {
    /**
     * CD管理器
     * @author  VaMP
     */
    class CDManager {
        private cdList;
        /**
         * 增加冷却时间，如果同名会重置之前的倒计时
         * @param name 名字
         * @param duration 冷却时间，单位是毫秒
         */
        addCD(name: string | number, duration: number): CoolDown;
        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
         * @param type		事件的类型。
         * @param cb	事件侦听函数。
         * @param caller	事件侦听函数的执行域。
         * @return 此 EventDispatcher 对象。
         */
        on(name: string | number, cb: Function, caller?: any): qc.SignalBinding;
        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
         * @param type		事件的类型。
         * @param cb	事件侦听函数。
         * @param caller	事件侦听函数的执行域。
         * @return 此 EventDispatcher 对象。
         */
        once(cb: Function, caller?: any): qc.SignalBinding;
        /**
         * 销毁
         * @param name 名字
         */
        destroy(name: string | number): void;
        /**
         * 获得倒计时对象
         * @param name 名字
         */
        getCD(name: string | number): CoolDown;
        /**
         * 当前剩余时间
         * @param name 名字
         */
        getRemainingTime(name: string | number): number;
        /**
         * 是否在冷却期间内
         * @param name 名字
         */
        inCD(name: string | number): boolean;
        /**
         * 是否可以执行操作
         * @param name 名字
         */
        canDo(name: string | number): boolean;
        /**
         * 执行操作
         * @param name 名字
         */
        do(name: string | number): boolean;
        /**
         * 更新倒计时
         * @param delta 更新间隔时间
         */
        update(delta: number): void;
    }
    /** CD管理器 */
    export let cdManager: CDManager;
    export {};
}
