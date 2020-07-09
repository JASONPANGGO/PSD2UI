var ps;
(function (ps) {
    /**
     * CD管理器
     * @author  VaMP
     */
    var CDManager = /** @class */ (function () {
        function CDManager() {
            this.cdList = {};
        }
        /**
         * 增加冷却时间，如果同名会重置之前的倒计时
         * @param name 名字
         * @param duration 冷却时间，单位是毫秒
         */
        CDManager.prototype.addCD = function (name, duration) {
            var cd = this.getCD(name);
            if (cd) {
                cd.duration = duration;
                cd.reset(duration);
            }
            else {
                this.cdList[name] = new ps.CoolDown(name, duration);
            }
            return this.cdList[name];
        };
        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
         * @param type		事件的类型。
         * @param cb	事件侦听函数。
         * @param caller	事件侦听函数的执行域。
         * @return 此 EventDispatcher 对象。
         */
        CDManager.prototype.on = function (name, cb, caller) {
            var cd = this.getCD(name);
            return cd.add(ps.CoolDown.FINISH, caller, cb);
        };
        /**
         * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
         * @param type		事件的类型。
         * @param cb	事件侦听函数。
         * @param caller	事件侦听函数的执行域。
         * @return 此 EventDispatcher 对象。
         */
        CDManager.prototype.once = function (cb, caller) {
            var cd = this.getCD(name);
            return cd.add(cd.name, caller, cb);
        };
        /**
         * 销毁
         * @param name 名字
         */
        CDManager.prototype.destroy = function (name) {
            var cd = this.getCD(name);
            if (cd) {
                cd.destroy();
                this.cdList[name] = undefined;
            }
        };
        /**
         * 获得倒计时对象
         * @param name 名字
         */
        CDManager.prototype.getCD = function (name) {
            return this.cdList[name];
        };
        /**
         * 当前剩余时间
         * @param name 名字
         */
        CDManager.prototype.getRemainingTime = function (name) {
            return this.getCD(name).remainingTime;
        };
        /**
         * 是否在冷却期间内
         * @param name 名字
         */
        CDManager.prototype.inCD = function (name) {
            return this.getCD(name).inCD;
        };
        /**
         * 是否可以执行操作
         * @param name 名字
         */
        CDManager.prototype.canDo = function (name) {
            return this.getCD(name).canDo;
        };
        /**
         * 执行操作
         * @param name 名字
         */
        CDManager.prototype.do = function (name) {
            var cd = this.getCD(name);
            if (cd)
                return cd.do();
        };
        /**
         * 更新倒计时
         * @param delta 更新间隔时间
         */
        CDManager.prototype.update = function (delta) {
            for (var name_1 in this.cdList) {
                this.cdList[name_1].update(delta);
            }
        };
        return CDManager;
    }());
    /** CD管理器 */
    ps.cdManager = new CDManager();
    ps.updateList.add(ps.cdManager);
})(ps || (ps = {}));
