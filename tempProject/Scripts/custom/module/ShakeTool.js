var ps;
(function (ps) {
    /**
     * 震动工具
     * Example:
     * 震动目标obj，1秒内震动10次，震动最大距离10
     * ShakeTool.shakeObj(obj, 1000, 10, 10);
     */
    var ShakeTool = /** @class */ (function () {
        function ShakeTool() {
        }
        /**
         * 震动显示对象
         * @param        target    震动目标对象
         * @param        duration      震动持续时长（毫秒）
         * @param        rate      震动频率(一秒震动多少次)
         * @param        maxDisX 震动x轴最大距离
         * @param        maxDisY 震动x轴最大距离
         */
        ShakeTool.shakeObj = function (target, duration, rate, maxDisX, maxDisY) {
            var sk = new ShakeTool();
            sk.shakeObj(target, duration, rate, maxDisX, maxDisY);
            return sk;
        };
        /**
         * 震动显示对象
         *
         * @param {qc.Node} target 震动目标对象
         * @param {number} time 震动持续时长（毫秒）
         * @param {number} rate 震动频率(一秒震动多少次)
         * @param {number} maxDisX 震动x轴最大距离
         * @param {number} maxDisY 震动y轴最大距离
         */
        ShakeTool.prototype.shakeObj = function (target, time, rate, maxDisX, maxDisY) {
            if (maxDisY === undefined)
                maxDisY = maxDisX;
            this.stop();
            this.target = target;
            this.initX = target.x;
            this.initY = target.y;
            this.maxDisX = maxDisX;
            this.maxDisY = maxDisY;
            this.rate = rate;
            this.loopDelay = qc_game.timer.loop(1000 / rate, this.shaking, this);
            this.completeDelay = qc_game.timer.add(time, this.shakeComplete, this);
        };
        /**
         * 震动中
         */
        ShakeTool.prototype.shaking = function () {
            this.target.x = this.initX - this.maxDisX + Math.random() * this.maxDisX * 2;
            this.target.y = this.initY - this.maxDisY + Math.random() * this.maxDisY * 2;
            this.shakTw = game.add.tween(this.target).to({
                x: this.initX,
                y: this.initY
            }, 1000 / this.rate);
            this.shakTw.start();
        };
        /**
         * 震动完成
         */
        ShakeTool.prototype.shakeComplete = function () {
            if (this.loopDelay) {
                qc_game.timer.remove(this.loopDelay);
                this.loopDelay = undefined;
            }
            if (this.completeDelay) {
                qc_game.timer.remove(this.completeDelay);
                this.completeDelay = undefined;
            }
            if (this.target) {
                game.tweens.remove(this.shakTw);
                this.target.x = this.initX;
                this.target.y = this.initY;
            }
        };
        /**
         * 停止震动
         */
        ShakeTool.prototype.stop = function () {
            this.shakeComplete();
        };
        return ShakeTool;
    }());
    ps.ShakeTool = ShakeTool;
})(ps || (ps = {}));
