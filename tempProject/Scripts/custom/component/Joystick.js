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
/** 摇杆事件 */
var JoystickEvent;
(function (JoystickEvent) {
    JoystickEvent["ON_DOWN"] = "JoystickOnDown";
    JoystickEvent["ON_DRAG"] = "JoystickOnDrag";
    JoystickEvent["ON_UP"] = "JoystickOnUp";
})(JoystickEvent || (JoystickEvent = {}));
;
/** 摇杆显示类型 */
var JoystickType;
(function (JoystickType) {
    JoystickType[JoystickType["FIX"] = 0] = "FIX";
    JoystickType[JoystickType["AUTO"] = 1] = "AUTO";
    JoystickType[JoystickType["AUTO_HIDE"] = 2] = "AUTO_HIDE";
})(JoystickType || (JoystickType = {}));
;
var ps;
(function (ps) {
    /**
     * 摇杆组件
     * @description 触摸出现摇杆
     * @author JingBin
     */
    var Joystick = /** @class */ (function (_super) {
        __extends(Joystick, _super);
        function Joystick(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this._showType = JoystickType.AUTO; //摇杆显示类型
            _this.circleRadius = 0; //圆环半径
            _this.ballRadius = 0; //小球半径
            _this.centerX = 0; //中心点X坐标
            _this.centerY = 0; //中心点Y坐标
            /** 序列化 */
            _this.serializableFields = {
                ballTexture: qc.Serializer.TEXTURE,
                circleTexture: qc.Serializer.TEXTURE,
                _showType: qc.Serializer.NUMBER,
            };
            //触摸移动，设置小球的位置
            _this.p1 = new qc.Point();
            _this.p2 = new qc.Point();
            return _this;
        }
        Joystick.prototype.awake = function () {
            this.initShowType();
            this.childrenCreated();
        };
        Joystick.prototype.createJoystick = function () {
            //圆环
            this.circle = this.gameObject.getChildByName("joystick");
            if (!this.circle) {
                this.circle = new qc.UIImage(this.game, this.gameObject);
                this.circle.name = "joystick";
                this.circle.texture = this.circleTexture;
                this.circle.pivotX = .5;
                this.circle.pivotY = .5;
                this.circle.resetNativeSize();
                this.circle.minAnchor.x = .5;
                this.circle.minAnchor.y = .5;
                this.circle.maxAnchor.x = .5;
                this.circle.maxAnchor.y = .5;
            }
            //小球
            this.ball = this.circle.getChildByName("ball");
            if (!this.ball) {
                this.ball = new qc.UIImage(this.game, this.circle);
                this.ball.name = "ball";
                this.ball.texture = this.ballTexture;
                this.ball.pivotX = .5;
                this.ball.pivotY = .5;
                this.ball.resetNativeSize();
                this.ball.minAnchor.x = .5;
                this.ball.minAnchor.y = .5;
                this.ball.maxAnchor.x = .5;
                this.ball.maxAnchor.y = .5;
                this.ball.x = this.centerX;
                this.ball.y = this.centerY;
            }
        };
        Object.defineProperty(Joystick.prototype, "showType", {
            get: function () {
                return this._showType;
            },
            set: function (type) {
                if (type != void 0) {
                    this._showType = type;
                }
                this.initShowType();
            },
            enumerable: true,
            configurable: true
        });
        Joystick.prototype.initShowType = function () {
            this.createJoystick();
            switch (this.showType) {
                //固定位置
                case JoystickType.FIX:
                    this.circle.visible = true;
                    break;
                //自由位置
                case JoystickType.AUTO:
                    this.circle.visible = false;
                    break;
                //自由位置，隐藏摇杆
                case JoystickType.AUTO_HIDE:
                    this.circle.visible = false;
                    break;
            }
        };
        Joystick.prototype.childrenCreated = function () {
            //获取圆环和小球半径
            this.circleRadius = this.circle.height / 2;
            this.ballRadius = this.ball.width / 2;
            //获取中心点
            // this.centerX = this.circleRadius;
            // this.centerY = this.circleRadius;
            //设置锚点
            this.gameObject.pivotX = .5;
            this.gameObject.pivotY = .5;
            //设置小球初始位置
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
        };
        Joystick.prototype.onDown = function (e) {
            // console.log("onDown", e);
            var pointer = e.source;
            this.touchID = pointer.eventId;
            this.startX = pointer.startX;
            this.startY = pointer.startY;
            var pt = new qc.Point(pointer.x, pointer.y);
            var localPt = this.circle.parent.toLocal(pt);
            this.circle.x = localPt.x;
            this.circle.y = localPt.y;
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
            var x = pointer.x - this.startX;
            var y = pointer.y - this.startY;
            var boundary = this.circleRadius - this.ballRadius;
            // 获取手指和虚拟摇杆的距离
            this.p1.x = this.startX;
            this.p1.y = this.startY;
            this.p2.x = pointer.x;
            this.p2.y = pointer.y;
            var dist = this.p2.distance(this.p1);
            var angle = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
            if (dist <= boundary) {
                //手指距离在圆环范围内
                this.ball.x = x;
                this.ball.y = y;
            }
            else {
                //手指距离在圆环范围外
                this.ball.x = Math.cos(angle) * boundary + this.centerX;
                this.ball.y = Math.sin(angle) * boundary + this.centerY;
                dist = boundary;
            }
            main.gameEvent.dispatch(JoystickEvent.ON_DOWN, this.ball.x, this.ball.y, angle, dist, this.circleRadius, this.ballRadius, pointer.x, pointer.y);
            if (this.showType === JoystickType.AUTO) {
                this.circle.visible = true;
            }
        };
        Joystick.prototype.moveBall = function (pointer) {
            // console.log(this.startX, this.startY, pointer.x, pointer.y);
            var x = pointer.x - this.startX;
            var y = pointer.y - this.startY;
            var boundary = this.circleRadius - this.ballRadius;
            // 获取手指和虚拟摇杆的距离
            this.p1.x = this.startX;
            this.p1.y = this.startY;
            this.p2.x = pointer.x;
            this.p2.y = pointer.y;
            var dist = this.p2.distance(this.p1);
            var angle = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x);
            if (dist <= boundary) {
                //手指距离在圆环范围内
                this.ball.x = x;
                this.ball.y = y;
            }
            else {
                //手指距离在圆环范围外
                this.ball.x = Math.cos(angle) * boundary + this.centerX;
                this.ball.y = Math.sin(angle) * boundary + this.centerY;
                dist = boundary;
            }
            // console.log("moveBall", angle);
            //派发事件
            main.gameEvent.dispatch(JoystickEvent.ON_DRAG, this.ball.x, this.ball.y, angle, dist, this.circleRadius, this.ballRadius, pointer.x, pointer.y);
        };
        Joystick.prototype.onDrag = function (e) {
            var pointer = e.source;
            // if (this.touchID != pointer.id) {
            //     return;
            // }
            this.moveBall(pointer);
        };
        Joystick.prototype.onUp = function (e) {
            var pointer = e.source;
            // if (this.touchID != pointer.id) {
            //     return;
            // }
            this.ball.x = this.centerX;
            this.ball.y = this.centerY;
            if (this.showType === JoystickType.AUTO) {
                this.circle.visible = false;
            }
            main.gameEvent.dispatch(JoystickEvent.ON_UP);
        };
        return Joystick;
    }(ps.Behaviour));
    ps.Joystick = Joystick;
    qc.registerBehaviour('ps.Joystick', Joystick);
    Joystick["__menu"] = 'Custom/Joystick';
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
})(ps || (ps = {}));
