declare namespace ps {
    /**
     * 事件侦听器
     * @author VaMP
     */
    class EventDispatcher {
        /** 调试打印 */
        debugPrint: boolean;
        static ALL: string;
        private singalList;
        /**
         * 注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
         * @param type		事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         * @param priority		优先级
         */
        add(type: string | number, listener: Function, listenerContext?: Object, priority?: number): qc.SignalBinding;
        /**
         * 注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
         * @param type		事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         * @param priority		优先级
         */
        addOnce(type: string | number, listener: Function, listenerContext?: Object, priority?: number): qc.SignalBinding;
        /**
         * 检测是否注册了侦听器
         * @param type		事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         */
        has(type: string | number, listener: Function, listenerContext?: Object): boolean;
        /**
         * 移除侦听器
         * @param type 事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         */
        remove(type: string | number, listener: Function, listenerContext?: Object): void;
        /**
         * 移除指定类型的所有侦听器
         * @param type 事件的类型。不指定则为全部
         */
        removeAll(type?: string | number): void;
        /**
         * 派发事件。
         * @param type	事件类型。
         * @param params	回调数据。
         */
        dispatch(type: string | number, ...params: any[]): void;
        /**
         * 获取指定类型的侦听器
         * @param type 	事件类型。
         * @param autoCreate 是否自动创建
         */
        getSingal(type: string | number, autoCreate?: boolean): qc.Signal;
        destroy(): void;
    }
}
