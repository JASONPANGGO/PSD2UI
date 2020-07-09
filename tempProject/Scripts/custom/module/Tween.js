var ps;
(function (ps) {
    /**
     * 缓动模块，使用代码添加缓动，跟方便的缓动接口
     * @author VaMP
     */
    var Tween = /** @class */ (function () {
        function Tween() {
        }
        /**
         * 缓动对象的props属性到目标值。可用scale参数代表scaleX跟scaleY
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param props 变化的属性列表，比如
         * @param duration 花费的时间，单位毫秒。
         * @param ease 缓动类型，默认为匀速运动。
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。如果要执行连续的缓动，请设置为false
         * @param repeat 重复次数，-1为无限，默认1。
         * @param yoyo 是否返回到原点，默认false。
         * @return 返回Tween对象。
         */
        Tween.to = function (target, props, duration, ease, delay, autoStart, repeat, yoyo) {
            if (autoStart === void 0) { autoStart = true; }
            target = initTarget(target);
            initProps(props);
            var tween;
            if (typeof ease === "string") {
                tween = game.add.tween(target).to(props, duration, ease, autoStart, delay, repeat, yoyo);
            }
            else {
                tween = game.add.tween(target).to(props, duration, ease, autoStart, delay, repeat, yoyo);
            }
            return tween;
        };
        /**
         * 缓动对象的props属性。可用scale参数代表scaleX跟scaleY
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param props 变化的属性列表，比如
         * @param duration 花费的时间，单位毫秒。
         * @param ease 缓动类型，默认为匀速运动。
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。如果要执行连续的缓动，请设置为false
         * @param repeat 重复次数，-1为无限，默认1。
         * @param yoyo 是否返回到原点，默认false。
         * @return 返回Tween对象。
         */
        Tween.by = function (target, props, duration, ease, delay, autoStart, repeat, yoyo) {
            if (autoStart === void 0) { autoStart = true; }
            target = initTarget(target);
            initProps(props);
            var nprops = {};
            for (var k in props) {
                nprops[k] = props[k] + target[k];
            }
            return Tween.to(target, nprops, duration, ease, delay, autoStart, repeat, yoyo);
        };
        /**
         * 清理某个缓动。
         * @param tween 缓动对象。
         */
        Tween.clear = function (tween) {
            game.tweens.remove(tween);
        };
        /**
         * 清理指定目标对象上的所有缓动。
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         */
        Tween.clearAll = function (target) {
            target = initTarget(target);
            game.tweens.removeFrom(target);
        };
        //下面是方便的函数==========================================================================
        /**
         * 渐现
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param endValue 结束值，默认1
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param complete  完成时的回调
         */
        Tween.showAlpha = function (target, duration, endValue, delay, complete) {
            if (duration === void 0) { duration = 500; }
            if (endValue === void 0) { endValue = 1; }
            if (delay === void 0) { delay = 0; }
            target = initTarget(target);
            target.visible = true;
            target.alpha = 0;
            var tween = Tween.to(target, { alpha: endValue }, duration, Phaser.Easing.Sinusoidal.InOut, delay);
            if (complete)
                tween.onComplete.addOnce(complete);
            return tween;
        };
        /**
         * 弹出
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param endValue 结束值，默认1
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param complete  完成时的回调
         */
        Tween.showZoom = function (target, duration, endValue, delay, complete) {
            if (duration === void 0) { duration = 500; }
            if (endValue === void 0) { endValue = 1; }
            if (delay === void 0) { delay = 0; }
            target = initTarget(target);
            target.visible = true;
            target.scaleX = 0;
            target.scaleY = 0;
            var tween = Tween.to(target, { scale: endValue }, duration, Phaser.Easing.Back.Out, delay);
            if (complete)
                tween.onComplete.addOnce(complete);
            return tween;
        };
        /**
         * 渐隐
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param finishType  完成时的操作,null:无操作;  hide:visible=false;  remove:this.removeSelf()
         * @param complete  完成时的回调
         */
        Tween.hideAlpha = function (target, duration, delay, finishType, complete) {
            if (duration === void 0) { duration = 500; }
            if (delay === void 0) { delay = 0; }
            if (finishType === void 0) { finishType = null; }
            return Tween.hide("alpha", target, duration, delay, finishType, complete);
        };
        /**
         * 缩没
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param finishType  完成时的操作,null:无操作;  hide:visible=false;  remove:this.removeSelf()
         * @param complete  完成时的回调
         */
        Tween.hideZoom = function (target, duration, delay, finishType, complete) {
            if (duration === void 0) { duration = 500; }
            if (delay === void 0) { delay = 0; }
            if (finishType === void 0) { finishType = null; }
            return Tween.hide("zoom", target, duration, delay, finishType, complete);
        };
        /**
         * 隐藏
         * @param type 动画类型，有 "zoom" | "alpha" 两种
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param finishType  完成时的操作,null:无操作;  hide:visible=false;  remove:this.removeSelf()
         * @param complete  完成时的回调
         */
        Tween.hide = function (type, target, duration, delay, finishType, complete) {
            if (type === void 0) { type = "alpha"; }
            if (duration === void 0) { duration = 500; }
            if (delay === void 0) { delay = 0; }
            if (finishType === void 0) { finishType = "hide"; }
            var tween;
            switch (type) {
                case "zoom":
                    tween = Tween.to(target, { scale: 0 }, duration, Phaser.Easing.Back.In, delay);
                    break;
                case "alpha":
                    tween = Tween.to(target, { alpha: 0 }, duration, undefined, delay);
                    break;
            }
            tween.onComplete.addOnce(function () {
                switch (finishType) {
                    case "null": break;
                    case "hide":
                        target.visible = false;
                        break;
                    case "remove":
                        if (target.parent)
                            target.parent.removeChild(target);
                        //target.removeSelf(); 
                        break;
                }
                if (complete)
                    complete();
            });
            return tween;
        };
        /**
         * 一直缩放
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param scale 要放大的值，例如0.1表示放大到1.1
         * @param duration 单程持续时间，单位毫秒，例如500表示放大500毫秒，然后缩小500毫秒
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。
         */
        Tween.zoom = function (target, scale, duration, delay, autoStart) {
            if (delay === void 0) { delay = 0; }
            if (autoStart === void 0) { autoStart = true; }
            return Tween.by(target, { scaleX: scale, scaleY: scale }, duration, Phaser.Easing.Sinusoidal.InOut, delay, autoStart, -1, true);
        };
        /**
         * 一直闪烁
         * @param target  目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  单程持续时间，单位毫秒
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。
         */
        Tween.glint = function (target, duration, delay, autoStart) {
            if (delay === void 0) { delay = 0; }
            if (autoStart === void 0) { autoStart = true; }
            var ta = 0;
            if (target.alpha === 0)
                ta = 1;
            return Tween.to(target, { alpha: ta }, duration, Phaser.Easing.Sinusoidal.InOut, delay, autoStart, -1, true);
        };
        /** 一直旋转
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param spd 角速度,默认为1，1秒转100度。
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。
         */
        Tween.rotationLoop = function (target, spd, delay, autoStart) {
            if (spd === void 0) { spd = 100; }
            if (delay === void 0) { delay = 0; }
            if (autoStart === void 0) { autoStart = true; }
            var d = spd > 0 ? 1 : -1;
            return Tween.by(target, { rotation: ps.Mathf.angleToRadian(360) * d }, 360000 / spd * d, undefined, delay, autoStart, -1);
        };
        /**
         * 一直来回移动
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param valueX 移动的X值
         * @param valueY 移动的Y值
         * @param duration 单程持续时间，单位毫秒
         * @param delay 延迟执行时间。
         * * @param autoStart 自动开始，默认true。
         */
        Tween.moveYoyo = function (target, valueX, valueY, duration, delay, autoStart) {
            if (delay === void 0) { delay = 0; }
            if (autoStart === void 0) { autoStart = true; }
            return Tween.by(target, { x: valueX, y: valueY }, duration, Phaser.Easing.Sinusoidal.InOut, delay, autoStart, -1, true);
        };
        /**
         * 抖动式来回旋转（共4次
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param value 旋转的角度
         * @param duration 持续时间
         * @param delay 延迟执行时间
         */
        Tween.shakeRotation = function (target, value, duration, delay) {
            if (value === void 0) { value = 5; }
            if (duration === void 0) { duration = 50; }
            target = initTarget(target);
            var start = target.rotation;
            return Tween.to(target, { rotation: ps.Mathf.angleToRadian(start + value) }, duration, Phaser.Easing.Sinusoidal.InOut, delay, false)
                .to({ rotation: ps.Mathf.angleToRadian(start - value) }, duration * 2, Phaser.Easing.Sinusoidal.InOut)
                .to({ rotation: ps.Mathf.angleToRadian(start + value) }, duration * 2, Phaser.Easing.Sinusoidal.InOut)
                .to({ rotation: ps.Mathf.angleToRadian(start) }, duration, Phaser.Easing.Sinusoidal.InOut).start();
        };
        return Tween;
    }());
    ps.Tween = Tween;
    function initTarget(target) {
        if (target instanceof qc.Behaviour)
            return target.gameObject;
        return target;
    }
    /** 个性化参数 */
    function initProps(props) {
        //添加scale参数，代表scaleX跟scaleY
        if (props.scale != undefined) {
            props.scaleX = props.scale;
            props.scaleY = props.scale;
            delete props.scale;
        }
        if (props.scaleXY != undefined) {
            props.scaleX = props.scaleXY;
            props.scaleY = props.scaleXY;
            delete props.scaleXY;
        }
    }
})(ps || (ps = {}));
