declare namespace ps {
    /** 游戏记录 */
    class Records {
        private static changes;
        private static data;
        private static event;
        /**
         * 获取记录的数据
         * @param key 记录名称
         */
        static getData(key: string): number;
        /**
        * 设置记录数据
        * @param key 记录名称
        * @param value 要设置的值
        */
        static setData(key: string, value: number): void;
        /**
         * 增加记录数据
         * @param key 记录名称
         * @param value 要增加的值，默认1
         */
        static addData(key: string, value?: number): number;
        /**
         * 监听记录变化事件
         * @param key 记录名称
         * @param listener 事件侦听函数
         * @param listenerContext 事件侦听函数的执行域
         */
        static listen(key: string, listener: Function, listenerContext?: Object): void;
        private static addChange;
        /**
         * 打印所有数据
         */
        static printData(): void;
        /**
         * 打印数据变化记录
         */
        static printChange(): void;
    }
}
