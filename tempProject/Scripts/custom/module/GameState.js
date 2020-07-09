var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ps;
(function (ps) {
    /**
     * 游戏状态控制,继承EventDispatcher，切换状态时会发送相应事件
     * @author VaMP
     */
    var GameState = /** @class */ (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** ending结果 */
            _this.result = true;
            return _this;
        }
        Object.defineProperty(GameState.prototype, "state", {
            /** 游戏状态 */
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "isWaiting", {
            get: function () {
                return this.state === GameState.WAITING;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "isPlaying", {
            get: function () {
                return this.state === GameState.PLAYING;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "isEnded", {
            get: function () {
                return this.state === GameState.ENDED;
            },
            enumerable: true,
            configurable: true
        });
        /** 准备就绪 */
        GameState.prototype.ready = function () {
            this._state = GameState.WAITING;
            this.dispatch(GameState.READY);
            return true;
        };
        /** 开始 */
        GameState.prototype.start = function () {
            if (qici.config.editor)
                return;
            if (!this.isWaiting)
                return;
            this._state = GameState.PLAYING;
            this.dispatch(GameState.START);
            //自动结束游戏定时器
            if (ps.GameConfig.autoEndTime > 0) {
                this.autoEndTimerEvnet = qc_game.timer.add(ps.GameConfig.autoEndTime * 1000, function () {
                    ps.gameEnd(false);
                });
            }
            return true;
        };
        /** 结束 */
        GameState.prototype.end = function (result) {
            if (result === void 0) { result = true; }
            if (this.isEnded)
                return;
            this.result = result;
            this._state = GameState.ENDED;
            this.dispatch(GameState.END, result);
            //取消结束游戏定时器
            if (this.autoEndTimerEvnet)
                qc_game.timer.remove(this.autoEndTimerEvnet);
            return true;
        };
        /** 重试 */
        GameState.prototype.retry = function () {
            this._state = GameState.WAITING;
            this.dispatch(GameState.RETRY);
        };
        /** 重置为初始值（移除事件监听与状态 */
        GameState.prototype.reset = function () {
            this.removeAll();
            this._state = undefined;
        };
        //状态
        GameState.WAITING = "waiting";
        GameState.PLAYING = "playing";
        GameState.ENDED = "ended";
        //事件
        GameState.READY = "ready";
        GameState.GAMESTART = "gameStart";
        GameState.START = "start";
        GameState.END = "end";
        GameState.RETRY = "retry";
        return GameState;
    }(ps.EventDispatcher));
    ps.GameState = GameState;
})(ps || (ps = {}));
