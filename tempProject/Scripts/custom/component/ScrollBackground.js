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
var ScrollBackground = /** @class */ (function (_super) {
    __extends(ScrollBackground, _super);
    function ScrollBackground(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.velocity = 10;
        /** 序列化 */
        _this.serializableFields = {
            velocity: qc.Serializer.NUMBER
        };
        return _this;
    }
    /** 试玩初始化的处理 */
    ScrollBackground.prototype.onInit = function () {
        //在这里初始化游戏场景需要的东西
        this.actualHeight = this.gameObject.height * this.gameObject.scaleY;
        var needNum = Math.ceil(1334 / this.actualHeight);
        this.extendNum = needNum;
        needNum--;
        while (needNum > 0) {
            var extend = new qc.UIImage(this.game, this.gameObject);
            extend.width = this.gameObject.width;
            extend.height = this.gameObject.height;
            extend.texture = this.gameObject.texture;
            this.gameObject.addChild(extend);
            extend.y = extend.height * needNum;
            needNum--;
        }
        this._scrollBackground = this.game.add.clone(this.gameObject);
        this.gameObject.parent.setChildIndex(this._scrollBackground, this.gameObject.parent.getChildIndex(this.gameObject));
        this._scrollBackground.y = this.actualHeight * (this.velocity > 0 ? -1 : 1) * this.extendNum;
    };
    /** 试玩开始时的处理 */
    ScrollBackground.prototype.onStart = function () {
        //动态参数的使用,playAgain参数会随着再玩一次而减少
    };
    /** 试玩结束时的处理 */
    ScrollBackground.prototype.onEnd = function () {
    };
    /** 再来一次时的处理(onInit后,onStart前) */
    ScrollBackground.prototype.onRetry = function () {
    };
    ScrollBackground.prototype.update = function () {
        this.updatePosition(this.gameObject, this._scrollBackground);
    };
    /**--------------- 框架结构结束 -------------- */
    /**----------------- 业务代码 ----------------- */
    ScrollBackground.prototype.updatePosition = function (node, _node) {
        if (!node || !_node)
            return;
        if (this.velocity === void 0)
            return;
        this.checkOutOfScreen(node);
        this.checkOutOfScreen(_node);
        node.y += this.velocity;
        _node.y += this.velocity;
    };
    ScrollBackground.prototype.checkOutOfScreen = function (node) {
        if (node.y >= this.actualHeight * this.extendNum && this.velocity > 0) {
            node.y = -this.actualHeight * this.extendNum;
        }
        if (node.y <= -this.actualHeight * this.extendNum && this.velocity < 0) {
            node.y = this.actualHeight * this.extendNum;
        }
    };
    return ScrollBackground;
}(ps.Behaviour));
qc.registerBehaviour('ScrollBackground', ScrollBackground);
/**
帧回调（preUpdate、update、postUpdate）
如果实现了这几个函数，系统会自动每帧进行调度（当挂载的Node节点处于可见、并且本脚本的enable=true时）
初始化（awake）
如果实现了awake函数，系统会在Node节点构建完毕（反序列化完成后）自动调度
脚本可用/不可用（onEnable、onDisable）
当脚本的enable从false->true时，会自动调用onEnable函数；反之调用onDisable函数
ps:在awake结束时,如果当前脚本的enable为true，会自动调用onEnable函数
交互回调（onClick、onUp、onDown、onDrag、onDragStart、onDragEnd）
当挂载的Node具备交互时，一旦捕获相应的输入事件，这些函数会自动被调用
脚本析构（onDestroy）
当脚本被移除时，会自动调用onDestroy函数，用户可以定义必要的资源回收代码
//PlaySmart新增回调(继承ps.Behaviour)
pl状态回调(onInit、onStart、onEnding、onRetry)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/ 
