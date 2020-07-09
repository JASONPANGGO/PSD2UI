declare namespace ps {
    /**
     * 游戏状态控制,继承EventDispatcher，切换状态时会发送相应事件
     * @author VaMP
     */
    class GameState extends ps.EventDispatcher {
        private static readonly WAITING;
        private static readonly PLAYING;
        private static readonly ENDED;
        static readonly READY = "ready";
        static readonly GAMESTART = "gameStart";
        static readonly START = "start";
        static readonly END = "end";
        static readonly RETRY = "retry";
        /** 游戏状态 */
        protected _state: string;
        /** 自动结束游戏定时器事件 */
        private autoEndTimerEvnet;
        /** 游戏状态 */
        get state(): string;
        get isWaiting(): boolean;
        get isPlaying(): boolean;
        get isEnded(): boolean;
        /** 准备就绪 */
        ready(): boolean;
        /** 开始 */
        start(): boolean;
        /** ending结果 */
        result: boolean;
        /** 结束 */
        end(result?: boolean): boolean;
        /** 重试 */
        retry(): void;
        /** 重置为初始值（移除事件监听与状态 */
        reset(): void;
    }
}
