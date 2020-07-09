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
    var DraggableItemEvent;
    (function (DraggableItemEvent) {
        DraggableItemEvent["TriggerTarget"] = "TriggerTarget";
        DraggableItemEvent["MissTarget"] = "MissTarget";
    })(DraggableItemEvent = ps.DraggableItemEvent || (ps.DraggableItemEvent = {}));
    var DraggableItem = /** @class */ (function (_super) {
        __extends(DraggableItem, _super);
        function DraggableItem(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.itemEvent = new ps.EventDispatcher();
            _this.returnAnimTime = 100;
            /** 序列化 */
            _this.serializableFields = {
                targetArea: qc.Serializer.NODE,
                returnAnimTime: qc.Serializer.NUMBER
            };
            return _this;
        }
        DraggableItem.prototype.onInit = function () {
        };
        DraggableItem.prototype.onStart = function () {
            this.gameObject.interactive = true;
            this.orgX = this.gameObject.x;
            this.orgY = this.gameObject.y;
        };
        DraggableItem.prototype.onDrag = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var dragEvent;
            var target = this.gameObject;
            args.forEach(function (arg) { if (arg instanceof qc.DragEvent) {
                dragEvent = arg;
            } });
            if (!dragEvent)
                return;
            var p = target.parent.toLocal(new qc.Point(dragEvent.source['x'], dragEvent.source['y']));
            target.x = p.x;
            target.y = p.y;
        };
        DraggableItem.prototype.onDragEnd = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var dragEndEvent = args.filter(function (arg) { return arg instanceof qc.DragEndEvent; })[0];
            this.gameObject.interactive = false;
            if (!this.targetArea) {
                this.returnToOrgPos();
                return;
            }
            var endPoint = new qc.Point(dragEndEvent.source['x'], dragEndEvent.source['y']);
            if (this.targetArea.rectContains(endPoint)) {
                this.gameObject.visible = false;
                this.itemEvent.dispatch(ps.DraggableItemEvent.TriggerTarget);
            }
            else {
                this.returnToOrgPos();
                this.itemEvent.dispatch(ps.DraggableItemEvent.MissTarget, endPoint);
            }
        };
        // 回到原位
        DraggableItem.prototype.returnToOrgPos = function () {
            var _this = this;
            ps.Tween.to(this.gameObject, {
                x: this.orgX,
                y: this.orgY
            }, this.returnAnimTime).onComplete.addOnce(function () { _this.gameObject.interactive = true; });
        };
        return DraggableItem;
    }(ps.Behaviour));
    ps.DraggableItem = DraggableItem;
    qc.registerBehaviour('DraggableItem', DraggableItem);
})(ps || (ps = {}));
