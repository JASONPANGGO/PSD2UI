declare namespace ps {
    /**
     * 游戏配置管理类
     */
    class GameConfig {
        /** 初始化游戏配置数据 */
        static init(): void;
        /** 整个数据 */
        static get data(): any;
        /** 获取当前难度配置数据 */
        static get config(): Object;
        /** 游戏自动结束时间，0代表不会自动结束 */
        static get autoEndTime(): number;
        /** 游戏可重玩次数，大于等于0为指定次数，-1为无限次数 */
        static get playAgain(): number;
        /**
         * [已过时，请使用GAME_CFG.key] 获取值
         * @param key 参数名
         * @param rounding 取整，默认不取整
         */
        static getValue(key: string, rounding?: boolean): any;
        /** 创建动态参数模板 */
        static createTemplete(): void;
    }
}
