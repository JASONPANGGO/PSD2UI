var ps;
(function (ps) {
    /**
     * 更新列表,用于对象或方法的每帧更新
     * 对象需实现update方法,参数为delta
     * 方法直接传入即可，需自己先绑定或包装一层
     * @author  VaMP
     */
    var UpdateList = /** @class */ (function () {
        function UpdateList() {
            this.list = [];
        }
        /**
         * 添加对象，会每帧自动调用对象的update方法
         * @param target 对象,需实现update方法,参数为delta
         */
        UpdateList.prototype.add = function (target) {
            this.list.push(target);
        };
        /**
         * 移除对象
         * @param target 对象
         */
        UpdateList.prototype.remove = function (target) {
            ps.Tools.deleteElement(this.list, target);
        };
        /**
         * 更新列表
         * @param delta 离上一帧的间隔时间
         */
        UpdateList.prototype.update = function (delta) {
            this.list.forEach(function (target) {
                target.update(delta);
            });
        };
        return UpdateList;
    }());
    /** 更新列表实例 */
    ps.updateList = new UpdateList();
})(ps || (ps = {}));
