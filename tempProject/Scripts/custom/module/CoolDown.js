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
    var CoolDown = /** @class */ (function (_super) {
        __extends(CoolDown, _super);
        /**
         * 冷却时间模块
         * @param name 名字
         * @param duration 冷却持续时间
         * @author VaMP
         */
        function CoolDown(name, duration) {
            var _this = _super.call(this) || this;
            /** 剩余时间 */
            _this.remainingTime = 0;
            /** 是否暂停 */
            _this.isPause = true;
            /** 时间缩放 */
            _this.timeScale = 1;
            _this.name = name;
            _this.duration = duration;
            ps.updateList.add(_this);
            return _this;
        }
        Object.defineProperty(CoolDown.prototype, "percentage", {
            /** 完成百分比 */
            get: function () {
                return 1 - this.remainingTime / this.duration;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 重新开始CD计时
         * @param duration 冷却持续时间,如不需要修改则不填
         */
        CoolDown.prototype.reset = function (duration) {
            if (duration != undefined)
                this.duration = duration;
            this.remainingTime = this.duration;
            this.resume();
            this.dispatch(CoolDown.RESET, this.name);
        };
        /**
         * 重新开始CD计时并暂停
         */
        CoolDown.prototype.resetAndPause = function () {
            this.remainingTime = this.duration;
            this.pause();
        };
        Object.defineProperty(CoolDown.prototype, "inCD", {
            /** 是否在冷却期间内 */
            get: function () {
                return this.remainingTime > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CoolDown.prototype, "canDo", {
            /** 是否可以执行操作 */
            get: function () {
                return !this.inCD;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新倒计时
         * @param delta 更新间隔时间
         */
        CoolDown.prototype.update = function (delta) {
            if (this.isPause)
                return;
            if (this.inCD) {
                this.remainingTime -= delta / this.timeScale;
                if (this.canDo) {
                    this.dispatch(CoolDown.FINISH, this.name);
                    this.remainingTime = 0;
                }
            }
            else {
                this.remainingTime = 0;
            }
        };
        /** 执行操作,如果在CD期间，则执行失败 */
        CoolDown.prototype.do = function () {
            if (this.inCD) {
                this.dispatch(CoolDown.DOFALSE, this.name);
                return false;
            }
            this.reset();
            this.dispatch(CoolDown.DO, this.name);
            return true;
        };
        /** 恢复 */
        CoolDown.prototype.resume = function () {
            this.isPause = false;
        };
        /** 暂停计时 */
        CoolDown.prototype.pause = function () {
            this.isPause = true;
        };
        /** 刷新CD */
        CoolDown.prototype.refresh = function () {
            this.remainingTime = 0;
        };
        /** 销毁 */
        CoolDown.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            //
            ps.updateList.remove(this);
        };
        CoolDown.FINISH = "finish";
        CoolDown.DO = "do";
        CoolDown.DOFALSE = "dofalse";
        CoolDown.RESET = "reset";
        return CoolDown;
    }(ps.EventDispatcher));
    ps.CoolDown = CoolDown;
})(ps || (ps = {}));
