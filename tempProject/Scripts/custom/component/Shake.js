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
     * 震动组件
     */
    var Shake = /** @class */ (function (_super) {
        __extends(Shake, _super);
        function Shake(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.duaringTime = 0.5;
            _this.maxDis = 10;
            _this.count = 0; //计时器次数
            /**
             * 一秒震动次数
             */
            _this.rate = 20;
            /**
             * 当前正在震动？
             */
            _this.isShaking = false;
            _this.playOnAwake = false;
            _this.serializableFields = {
                playOnAwake: qc.Serializer.BOOLEAN,
                duaringTime: qc.Serializer.NUMBER,
                maxDis: qc.Serializer.NUMBER,
                rate: qc.Serializer.NUMBER,
            };
            return _this;
        }
        Shake.prototype.awake = function () {
            if (this.playOnAwake) {
                this.play();
            }
        };
        /**
         * 震动
         * @param        _duaringTime      震动持续时长（秒）
         * @param        _rate      震动频率(一秒震动多少次)
         * @param        _maxDis    震动最大距离
         */
        Shake.prototype.play = function (_duaringTime, _rate, _maxDis) {
            if (this.isShaking) {
                this.shakeComplete();
            }
            if (_duaringTime != undefined) {
                this.duaringTime = _duaringTime;
            }
            if (_rate != undefined) {
                this.rate = _rate;
            }
            if (_maxDis != undefined) {
                this.maxDis = _maxDis;
            }
            this.isShaking = true;
            this.initX = this.gameObject.x;
            this.initY = this.gameObject.y;
            this.count = this.duaringTime * this.rate;
            var t = 1000 / this.rate;
            this.evt = qc_game.timer.loop(t, this.shaking, this);
        };
        /**停止震动 */
        Shake.prototype.stop = function () {
            if (this.isShaking) {
                this.shakeComplete();
            }
        };
        Shake.prototype.shaking = function () {
            this.count--;
            if (this.count == -1) {
                this.shakeComplete();
                return;
            }
            // Tween.clearAll(this.gameObject);
            this.gameObject.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
            this.gameObject.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
            ps.Tween.to(this.gameObject, { x: this.initX, y: this.initY }, 999 / this.rate);
        };
        Shake.prototype.shakeComplete = function () {
            this.isShaking = false;
            qc_game.timer.remove(this.evt);
            this.gameObject.x = this.initX;
            this.gameObject.y = this.initY;
        };
        Shake.prototype.onDestroy = function () {
            this.stop();
        };
        Shake.prototype.update = function () {
        };
        return Shake;
    }(qc.Behaviour));
    ps.Shake = Shake;
    qc.registerBehaviour('ps.Shake', Shake);
    Shake["__menu"] = 'Custom/Shake';
})(ps || (ps = {}));
