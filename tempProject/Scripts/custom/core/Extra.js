var ps;
(function (ps) {
    /**
     * 定义快捷查找对象的方法
     * 根据唯一名字查找对象
     */
    function find(uniqueName) {
        return qc.N(uniqueName);
    }
    ps.find = find;
    /**
     * 克隆物体或预设
     * @param node 物体或预设
     * @param parent 父亲
     */
    function Instantiate(node, parent) {
        return qc_game.add.clone(node, parent);
    }
    ps.Instantiate = Instantiate;
    /**
     * 根据Y对孩子的层次排序
     * @param parent 父容器
     */
    function sortChild(parent) {
        var arr = [];
        parent.children.forEach(function (element) {
            arr.push(element);
        });
        arr.sort(function (a, b) {
            return b.y - a.y;
        });
        arr.forEach(function (element) {
            parent.setChildIndex(element, 0);
        });
    }
    ps.sortChild = sortChild;
})(ps || (ps = {}));
/**
 * 根据名字获取子节点。
 * @param name 名字
 */
qc.Node.prototype.getChildByName = function (name) {
    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
        var child = _a[_i];
        if (child.name === name)
            return child;
    }
};
/**
 * 根据名字获取子节点数组。
 * @param name 名字
 */
qc.Node.prototype.getChildsByName = function (name) {
    var list = [];
    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
        var child = _a[_i];
        if (child.name === name) {
            list.push(child);
        }
    }
    return list;
};
/**
 * 根据名字获取子节点。(递归)
 * @param name 名字
 */
qc.Node.prototype.getChild = function (name) {
    var child = this.getChildByName(name);
    if (child)
        return child;
    for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
        var child_1 = _a[_i];
        //if (child.name === name) return child;
        var r = child_1.getChild(name);
        if (r)
            return r;
    }
};
/**
 * 从父对象里移除自己
 */
qc.Node.prototype.removeSelf = function () {
    if (this.parent)
        this.parent.removeChild(this);
};
/**
 * 添加组件，同addScript
 * @param script 组件类或类名
 */
qc.Node.prototype.addComponent = function (script) {
    return this.addScript(script);
};
/**
 * 获取组件，同getScript
 * @param script 组件类或类名
 */
qc.Node.prototype.getComponent = function (script) {
    return this.getScript(script);
};
//==================================================================
/**
 * 根据名字获取子节点。
 * @param name 名字
 */
qc.Behaviour.prototype.getChildByName = function (name) {
    return this.gameObject.getChildByName(name);
};
/**
 * 根据名字获取子节点数组。
 * @param name 名字
 */
qc.Behaviour.prototype.getChildsByName = function (name) {
    return this.gameObject.getChildsByName(name);
};
/**
 * 根据名字获取子节点。(递归)
 * @param name 名字
 */
qc.Behaviour.prototype.getChild = function (path) {
    return this.gameObject.getChild(path);
};
/**
 * 根据路径获取子节点。(同一级下如有同名可能会获取不到)
 * @param path 路径，用/分割
 */
qc.Behaviour.prototype.find = function (path) {
    return this.gameObject.find(path);
};
//==================================================================
/** 特殊处理IS渠道的适配 */
qc.ScaleAdapter.prototype["getTargetSize"] = function () {
    if (window["adWidth"] && window["adHeight"]) {
        ps.ScrFix.width = window["adWidth"];
        ps.ScrFix.width = window["adWidth"];
        return new qc.Point(window["adWidth"], window["adHeight"]);
    }
    var currTarget = this.target || this.gameObject.game.world;
    if (!currTarget || !currTarget.width || !currTarget.height)
        return new qc.Point(0, 0);
    return new qc.Point(currTarget.width, currTarget.height);
};
