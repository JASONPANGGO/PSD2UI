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
     * 脚本基类
     * pl状态回调(onInit、onStart、onEnding、onRetry、onResize)
     * 如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
     * @author VaMP
     */
    var Behaviour = /** @class */ (function (_super) {
        __extends(Behaviour, _super);
        function Behaviour(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.createEvent(ps.GameState.READY, "onInit");
            _this.createEvent(ps.GameState.GAMESTART, "onGameStart");
            _this.createEvent(ps.GameState.START, "onStart");
            _this.createEvent(ps.GameState.END, "onEnd");
            _this.createEvent(ps.GameState.RETRY, "onRetry");
            //如果有onResize方法，自动注册事件
            if (_this["onResize"])
                _this.gameObject.addListener(_this.gameObject.onRelayout, _this["onResize"], _this);
            //如果创建的时候状态已切换
            if (ps.mainState.isPlaying) {
                _this.call("onInit");
                _this.call("onStart");
            }
            if (ps.mainState.isEnded) {
                _this.call("onEnd", ps.mainState.result);
            }
            return _this;
        }
        Behaviour.prototype.call = function (funName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this[funName])
                this[funName].apply(this, args);
        };
        Behaviour.prototype.createEvent = function (event, funName) {
            if (this[funName])
                ps.mainState.add(event, this[funName], this);
        };
        //
        Behaviour.prototype.pos = function (x, y) {
            this.gameObject.x = x;
            this.gameObject.y = y;
        };
        return Behaviour;
    }(qc.Behaviour));
    ps.Behaviour = Behaviour;
})(ps || (ps = {}));
