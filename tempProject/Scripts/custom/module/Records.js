var ps;
(function (ps) {
    /** 游戏记录 */
    var Records = /** @class */ (function () {
        function Records() {
        }
        /**
         * 获取记录的数据
         * @param key 记录名称
         */
        Records.getData = function (key) {
            return Records.data[key] | 0;
        };
        /**
        * 设置记录数据
        * @param key 记录名称
        * @param value 要设置的值
        */
        Records.setData = function (key, value) {
            Records.data[key] = value;
            Records.addChange("set", key, value);
        };
        /**
         * 增加记录数据
         * @param key 记录名称
         * @param value 要增加的值，默认1
         */
        Records.addData = function (key, value) {
            if (value === void 0) { value = 1; }
            if (!Records.data[key]) {
                Records.data[key] = value;
            }
            else {
                Records.data[key] += value;
            }
            Records.addChange("add", key, value);
            return this.getData(key);
        };
        /**
         * 监听记录变化事件
         * @param key 记录名称
         * @param listener 事件侦听函数
         * @param listenerContext 事件侦听函数的执行域
         */
        Records.listen = function (key, listener, listenerContext) {
            this.event.add(key, listener, listenerContext);
        };
        Records.addChange = function (operate, key, value) {
            Records.changes.push({
                operate: operate,
                key: key,
                value: value,
                time: Date.now()
            });
            this.event.dispatch(key, value, operate);
        };
        /**
         * 打印所有数据
         */
        Records.printData = function () {
            for (var key in Records.data) {
                console.log(key + ":" + Records.data[key]);
            }
        };
        /**
         * 打印数据变化记录
         */
        Records.printChange = function () {
            for (var key in Records.changes) {
                console.log(key + ":" + ps.Tools.jsonToStr(Records.changes[key]));
            }
        };
        Records.changes = [];
        Records.data = {};
        Records.event = new ps.EventDispatcher();
        return Records;
    }());
    ps.Records = Records;
})(ps || (ps = {}));
