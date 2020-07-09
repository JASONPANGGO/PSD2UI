declare namespace ps {
    /**
     * 缓动模块，使用代码添加缓动，跟方便的缓动接口
     * @author VaMP
     */
    class Tween {
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
        static to(target: any, props: any, duration: number, ease?: Function | string, delay?: number, autoStart?: boolean, repeat?: number, yoyo?: boolean): Phaser.Tween;
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
        static by(target: any, props: any, duration: number, ease?: Function | string, delay?: number, autoStart?: boolean, repeat?: number, yoyo?: boolean): Phaser.Tween;
        /**
         * 清理某个缓动。
         * @param tween 缓动对象。
         */
        static clear(tween: Phaser.Tween): void;
        /**
         * 清理指定目标对象上的所有缓动。
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         */
        static clearAll(target: any): void;
        /**
         * 渐现
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param endValue 结束值，默认1
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param complete  完成时的回调
         */
        static showAlpha(target: any, duration?: number, endValue?: number, delay?: number, complete?: Function): Phaser.Tween;
        /**
         * 弹出
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param endValue 结束值，默认1
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param complete  完成时的回调
         */
        static showZoom(target: any, duration?: number, endValue?: number, delay?: number, complete?: Function): Phaser.Tween;
        /**
         * 渐隐
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param finishType  完成时的操作,null:无操作;  hide:visible=false;  remove:this.removeSelf()
         * @param complete  完成时的回调
         */
        static hideAlpha(target: any, duration?: number, delay?: number, finishType?: null | "hide" | "remove", complete?: Function): Phaser.Tween;
        /**
         * 缩没
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param finishType  完成时的操作,null:无操作;  hide:visible=false;  remove:this.removeSelf()
         * @param complete  完成时的回调
         */
        static hideZoom(target: any, duration?: number, delay?: number, finishType?: null | "hide" | "remove", complete?: Function): Phaser.Tween;
        /**
         * 隐藏
         * @param type 动画类型，有 "zoom" | "alpha" 两种
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  花费的时间，单位毫秒。默认500毫秒
         * @param delay   延迟时间，单位毫秒。默认0毫秒
         * @param finishType  完成时的操作,null:无操作;  hide:visible=false;  remove:this.removeSelf()
         * @param complete  完成时的回调
         */
        static hide(type: "zoom" | "alpha", target: any, duration?: number, delay?: number, finishType?: null | "hide" | "remove" | "null", complete?: Function): Phaser.Tween;
        /**
         * 一直缩放
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param scale 要放大的值，例如0.1表示放大到1.1
         * @param duration 单程持续时间，单位毫秒，例如500表示放大500毫秒，然后缩小500毫秒
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。
         */
        static zoom(target: any, scale: number, duration: number, delay?: number, autoStart?: boolean): Phaser.Tween;
        /**
         * 一直闪烁
         * @param target  目标对象。如传入组件，则目标对象为组件的gameObject
         * @param duration  单程持续时间，单位毫秒
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。
         */
        static glint(target: any, duration: number, delay?: number, autoStart?: boolean): Phaser.Tween;
        /** 一直旋转
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param spd 角速度,默认为1，1秒转100度。
         * @param delay 延迟执行时间。
         * @param autoStart 自动开始，默认true。
         */
        static rotationLoop(target: any, spd?: number, delay?: number, autoStart?: boolean): Phaser.Tween;
        /**
         * 一直来回移动
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param valueX 移动的X值
         * @param valueY 移动的Y值
         * @param duration 单程持续时间，单位毫秒
         * @param delay 延迟执行时间。
         * * @param autoStart 自动开始，默认true。
         */
        static moveYoyo(target: any, valueX: number, valueY: number, duration: number, delay?: number, autoStart?: boolean): Phaser.Tween;
        /**
         * 抖动式来回旋转（共4次
         * @param target 目标对象。如传入组件，则目标对象为组件的gameObject
         * @param value 旋转的角度
         * @param duration 持续时间
         * @param delay 延迟执行时间
         */
        static shakeRotation(target: any, value?: number, duration?: number, delay?: number): Phaser.Tween;
    }
}
