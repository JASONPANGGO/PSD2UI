var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var ps;
(function (ps) {
    /**
     * 事件侦听器
     * @author VaMP
     */
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            /** 调试打印 */
            this.debugPrint = false;
            this.singalList = {};
        }
        /**
         * 注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
         * @param type		事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         * @param priority		优先级
         */
        EventDispatcher.prototype.add = function (type, listener, listenerContext, priority) {
            var singal = this.getSingal(type, true);
            return singal.add(listener, listenerContext, priority);
        };
        /**
         * 注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
         * @param type		事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         * @param priority		优先级
         */
        EventDispatcher.prototype.addOnce = function (type, listener, listenerContext, priority) {
            var singal = this.getSingal(type, true);
            return singal.addOnce(listener, listenerContext, priority);
        };
        /**
         * 检测是否注册了侦听器
         * @param type		事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         */
        EventDispatcher.prototype.has = function (type, listener, listenerContext) {
            var singal = this.getSingal(type, false);
            if (!singal)
                return false;
            return singal.has(listener, listenerContext);
        };
        /**
         * 移除侦听器
         * @param type 事件的类型。
         * @param listener	事件侦听函数。
         * @param listenerContext	事件侦听函数的执行域。
         */
        EventDispatcher.prototype.remove = function (type, listener, listenerContext) {
            var singal = this.getSingal(type, false);
            if (singal)
                singal.remove(listener, listenerContext);
        };
        /**
         * 移除指定类型的所有侦听器
         * @param type 事件的类型。不指定则为全部
         */
        EventDispatcher.prototype.removeAll = function (type) {
            if (!type) {
                for (var key in this.singalList) {
                    this.singalList[key].removeAll();
                }
                return;
            }
            var singal = this.getSingal(type, false);
            if (singal)
                singal.removeAll();
        };
        /**
         * 派发事件。
         * @param type	事件类型。
         * @param params	回调数据。
         */
        EventDispatcher.prototype.dispatch = function (type) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (this.debugPrint)
                console.log("dispatch", type);
            var singal = this.getSingal(type, false);
            if (singal)
                singal.dispatch.apply(singal, params);
            //
            var singalAll = this.getSingal(EventDispatcher.ALL, false);
            if (singalAll)
                singalAll.dispatch.apply(singalAll, __spreadArrays([type], params));
        };
        /**
         * 获取指定类型的侦听器
         * @param type 	事件类型。
         * @param autoCreate 是否自动创建
         */
        EventDispatcher.prototype.getSingal = function (type, autoCreate) {
            if (autoCreate === void 0) { autoCreate = false; }
            var singal = this.singalList[type];
            if (autoCreate && !singal) {
                singal = new qc.Signal;
                this.singalList[type] = singal;
            }
            return singal;
        };
        EventDispatcher.prototype.destroy = function () {
            for (var key in this.singalList) {
                this.singalList[key].destroy();
            }
        };
        EventDispatcher.ALL = "";
        return EventDispatcher;
    }());
    ps.EventDispatcher = EventDispatcher;
})(ps || (ps = {}));
