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
    var virtual;
    (function (virtual) {
        var VirtualJoystick = /** @class */ (function (_super) {
            __extends(VirtualJoystick, _super);
            function VirtualJoystick(gameObject) {
                var _this = _super.call(this, gameObject) || this;
                _this.autoInit = false;
                _this.isWake = false;
                _this.serializableFields = {
                    ball: qc.Serializer.NODE,
                    autoInit: qc.Serializer.BOOLEAN
                };
                _this.radius = gameObject.width / 2;
                _this.signal = new qc.Signal();
                return _this;
            }
            VirtualJoystick.prototype.awake = function () {
                if (this.autoInit) {
                    this.start();
                }
            };
            VirtualJoystick.prototype.onDown = function (pt) {
                if (this.isWake == false) {
                    return;
                }
                var pointer = pt.source;
                var id = pointer.eventId;
                this.signal.dispatch(VirtualJoystick.TOUCH_START);
                this.ballMove(pt);
            };
            VirtualJoystick.prototype.onDrag = function (pt) {
                if (this.isWake == false) {
                    return;
                }
                this.ballMove(pt);
            };
            VirtualJoystick.prototype.onDragEnd = function () {
                this.onBallDragEnd();
            };
            VirtualJoystick.prototype.start = function () {
                this.isWake = true;
            };
            VirtualJoystick.prototype.stop = function () {
                this.isWake = false;
                this.onBallDragEnd();
            };
            //按下了小球
            VirtualJoystick.prototype.mouseDown = function (img, pt) {
                var pointer = pt.source;
                var id = pointer.eventId;
                this.signal.dispatch(VirtualJoystick.TOUCH_START);
            };
            //拖动小球开始移动
            VirtualJoystick.prototype.ballMove = function (pt) {
                var pointer = pt.source;
                var _x = pointer.x;
                var _y = pointer.y;
                var localPt = this.gameObject.toLocal(new Phaser.Point(_x, _y));
                var centerPt = new Phaser.Point(this.radius, this.radius);
                var dist = Phaser.Point.distance(localPt, centerPt);
                var angle = Math.atan2(localPt.y - centerPt.y, localPt.x - centerPt.x);
                if (dist <= this.radius) {
                    this.ball.x = localPt.x;
                    this.ball.y = localPt.y;
                    //手指距离在圆环范围外
                }
                else {
                    this.ball.x = Math.cos(angle) * (this.radius) + this.radius;
                    this.ball.y = Math.sin(angle) * (this.radius) + this.radius;
                }
                this.signal.dispatch(VirtualJoystick.UPDATE, angle);
                //console.log("angle="+angle);
            };
            //移动完毕
            VirtualJoystick.prototype.onBallDragEnd = function () {
                this.ball.x = this.radius;
                this.ball.y = this.radius;
                this.signal.dispatch(VirtualJoystick.TOUCH_END);
            };
            VirtualJoystick.prototype.onDestroy = function () {
                this.isWake = false;
                // this.signal.dispose();
                this.signal = null;
            };
            VirtualJoystick.prototype.update = function () {
            };
            VirtualJoystick.TOUCH_START = "VirtualJoystick_TOUCH_START";
            VirtualJoystick.UPDATE = "VirtualJoystick_UPDATE";
            VirtualJoystick.TOUCH_END = "VirtualJoystick_TOUCH_END";
            return VirtualJoystick;
        }(qc.Behaviour));
        virtual.VirtualJoystick = VirtualJoystick;
        qc.registerBehaviour('ps.virtual.VirtualJoystick', VirtualJoystick);
        VirtualJoystick["__menu"] = 'Custom/VirtualJoystick';
    })(virtual = ps.virtual || (ps.virtual = {}));
})(ps || (ps = {}));
