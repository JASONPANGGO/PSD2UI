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
    var ClockEvent;
    (function (ClockEvent) {
        ClockEvent[ClockEvent["TIME_UP"] = 0] = "TIME_UP";
        ClockEvent[ClockEvent["TIME_START"] = 1] = "TIME_START";
    })(ClockEvent = ps.ClockEvent || (ps.ClockEvent = {}));
    var PrecisionType;
    (function (PrecisionType) {
        PrecisionType[PrecisionType["INTEGER"] = 0] = "INTEGER";
        PrecisionType[PrecisionType["HUNDRED_MS"] = 1] = "HUNDRED_MS";
        PrecisionType[PrecisionType["TEN_MS"] = 2] = "TEN_MS";
    })(PrecisionType || (PrecisionType = {}));
    var Clock = /** @class */ (function (_super) {
        __extends(Clock, _super);
        function Clock(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.clockEvent = new ps.EventDispatcher();
            _this.time = 10; // 秒
            _this.reverse = false;
            _this.template = '{0}s';
            _this.autoStart = false;
            _this.started = false;
            _this.paused = false;
            /** 序列化 */
            _this.serializableFields = {
                time: qc.Serializer.NUMBER,
                clockText: qc.Serializer.NODE,
                reverse: qc.Serializer.BOOLEAN,
                autoStart: qc.Serializer.BOOLEAN,
                template: qc.Serializer.STRING,
                precision: qc.Serializer.AUTO // 精确度，意为精确到小数点后几位，0为个位数，
            };
            return _this;
        }
        Clock.prototype.onInit = function () {
            var precision = this.precision;
            this.updateInterval = precision > 0 ? parseInt('1000'.substr(0, precision)) : 1000;
            if (this.reverse) {
                this.showTimeMS = this.time * 1000;
            }
            else {
                this.showTimeMS = 0;
            }
            this.updateText(this.showTimeMS);
        };
        Clock.prototype.onStart = function () {
            if (this.autoStart)
                this.start();
        };
        Clock.prototype.update = function () {
            if (!this.started)
                return;
            if (this.showTimeMS <= 0 && this.reverse) {
                this.showTimeMS = 0;
                this.timeUp();
                return;
            }
            else if (this.showTimeMS >= this.time * 1000 && !this.reverse) {
                this.showTimeMS = this.time * 1000;
                this.timeUp();
                return;
            }
            var now = Date.now();
            if (this.last === void 0)
                this.last = now;
            var deltaTime = now - this.last;
            if (deltaTime >= this.updateInterval) {
                this.last = now;
                if (this.reverse) {
                    this.showTimeMS -= deltaTime;
                }
                else {
                    this.showTimeMS += deltaTime;
                }
                this.updateText(this.showTimeMS);
            }
        };
        Clock.prototype.start = function () {
            this.clockEvent.dispatch(ClockEvent.TIME_START);
            this.started = true;
        };
        Clock.prototype.stop = function () {
            this.started = false;
        };
        Clock.prototype.timeUp = function () {
            this.clockEvent.dispatch(ClockEvent.TIME_UP);
            this.started = false;
            this.paused = true;
            this.updateText(this.showTimeMS);
        };
        Clock.prototype.updateText = function (time) {
            this.clockText.text = this.template.replace('{0}', "" + (Math.abs(time) / 1000).toFixed(this.precision));
        };
        return Clock;
    }(ps.Behaviour));
    ps.Clock = Clock;
    qc.registerBehaviour('ps.Clock', Clock);
    Clock["__menu"] = 'Custom/Clock';
})(ps || (ps = {}));
/**
帧回调（preUpdate、update、postUpdate）
如果实现了这几个函数，系统会自动每帧进行调度（当挂载的Node节点处于可见、并且本脚本的enable=true时）

初始化（awake）
如果实现了awake函数，系统会在Node节点构建完毕（反序列化完成后）自动调度

脚本可用/不可用（onEnable、onDisable）
当脚本的enable从false->true时，会自动调用onEnable函数；反之调用onDisable函数
ps:在awake结束时,如果当前脚本的enable为true，会自动调用onEnable函数

交互回调（onClick、onUp、onDown、onDrag、onDragStart、onDragEnd）
当挂载的Node具备交互时，一旦捕获相应的输入事件，这些函数会自动被调用

脚本析构（onDestroy）
当脚本被移除时，会自动调用onDestroy函数，用户可以定义必要的资源回收代码

//PlaySmart新增回调(继承ps.Behaviour)
pl状态回调(onInit、onStart、onEnding、onRetry)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/ 
