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
     * A*寻路地图组件
     * @author VaMP
     */
    var AStarComponent = /** @class */ (function (_super) {
        __extends(AStarComponent, _super);
        function AStarComponent(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.rows = 10;
            _this.cols = 10;
            _this.editMode = true;
            _this.isDrawAll = true;
            /** 序列化 */
            _this.serializableFields = {
                rows: qc.Serializer.NUMBER,
                cols: qc.Serializer.NUMBER,
                data: qc.Serializer.STRING,
                editMode: qc.Serializer.BOOLEAN,
                isDrawAll: qc.Serializer.BOOLEAN,
            };
            return _this;
        }
        Object.defineProperty(AStarComponent.prototype, "cellWidth", {
            get: function () {
                return this.gameObject.width / this.rows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AStarComponent.prototype, "cellHeight", {
            get: function () {
                return this.gameObject.height / this.cols;
            },
            enumerable: true,
            configurable: true
        });
        AStarComponent.prototype.awake = function () {
            var _this = this;
            this.gameObject.alpha = 0.3;
            this.map = new ps.AStarMap(this.rows, this.cols, 0);
            if (this.data != undefined && this.data != null && this.data != "") {
                this.map.load(this.data);
            }
            if (!this.editMode)
                return;
            this.gameObject.interactive = true;
            //绘图
            this.drawAll();
            //键盘事件
            this.game.input.onKeyUp.add(function (e) {
                if (e === 83)
                    _this.map.save();
            });
            window["map"] = this;
        };
        /**
         * 获取路径，返回值为路径点的集合，无法寻路则返回空数组
         * @param startX
         * @param startY
         * @param endX
         * @param endY
         */
        AStarComponent.prototype.getPath = function (startX, startY, endX, endY) {
            var path = this.map.searchRoad(startX, startY, endX, endY);
            if (this.editMode)
                this.drawPath(path);
            return path;
        };
        AStarComponent.prototype.onDown = function (e) {
            var _a = this.calRowCol(e), row = _a[0], col = _a[1];
            var v = this.map.get(row, col);
            if (v === undefined)
                return;
            this.drawV = v === 1 ? 0 : 1;
            //
            this.setAndDraw(row, col);
        };
        AStarComponent.prototype.onDrag = function (e) {
            var _a = this.calRowCol(e), row = _a[0], col = _a[1];
            this.setAndDraw(row, col);
        };
        /** 根据事件计算点击的格子索引 */
        AStarComponent.prototype.calRowCol = function (e) {
            var pointer = e.source;
            var p = this.gameObject.toGlobal(new qc.Point(0, 0));
            var row = Math.floor((pointer.x - p.x) / this.cellWidth / ps.ScrFix.scale);
            var cow = Math.floor((pointer.y - p.y) / this.cellHeight / ps.ScrFix.scale);
            return [row, cow];
        };
        /** 设置参数并且绘制出来 */
        AStarComponent.prototype.setAndDraw = function (row, col) {
            var ov = this.map.get(row, col);
            if (ov === undefined)
                return;
            if (this.drawV === ov)
                return;
            this.map.set(row, col, this.drawV);
            if (this.isDrawAll)
                this.drawAll();
            else
                this.drawOne(row, col, this.drawV);
            console.log(row, col);
        };
        /**
        * 画出地图
        */
        AStarComponent.prototype.drawAll = function () {
            var graphics = this.gameObject;
            graphics.clear();
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    var v = this.map.get(i, j);
                    this.drawOne(i, j, v);
                }
            }
        };
        AStarComponent.prototype.drawPath = function (arr) {
            var _this = this;
            arr.forEach(function (pos) {
                _this.drawOne(pos.x, pos.y, 2);
            });
        };
        AStarComponent.prototype.drawOne = function (row, col, v) {
            var graphics = this.gameObject;
            //
            var c0 = 0x33ff00;
            var c1 = 0xFF3300;
            var c2 = 0x0033ff;
            var color;
            switch (v) {
                case 0:
                    color = c0;
                    break;
                case 1:
                    color = c1;
                    break;
                case 2:
                    color = c2;
                    break;
            }
            graphics.beginFill(color);
            graphics.drawRect(row * this.cellWidth, col * this.cellHeight, this.cellWidth - 1, this.cellHeight - 1);
            graphics.endFill();
        };
        return AStarComponent;
    }(ps.Behaviour));
    ps.AStarComponent = AStarComponent;
    qc.registerBehaviour('ps.AStarComponent', AStarComponent);
    AStarComponent["__menu"] = 'Custom/AStarComponent';
})(ps || (ps = {}));
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
pl状态回调(onInit、onStart、onEnding、onRetry、onResize)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/ 
