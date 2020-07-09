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
/** 抛物线事件 */
var ParabolaEvent;
(function (ParabolaEvent) {
    ParabolaEvent["THROW_START"] = "throwStart";
})(ParabolaEvent || (ParabolaEvent = {}));
;
/** 抛射控制类型 */
var ParabolaType;
(function (ParabolaType) {
    ParabolaType[ParabolaType["JOYSTICK"] = 0] = "JOYSTICK";
    ParabolaType[ParabolaType["MOUSE_UP"] = 1] = "MOUSE_UP";
    ParabolaType[ParabolaType["TIME_LOOP"] = 2] = "TIME_LOOP";
})(ParabolaType || (ParabolaType = {}));
;
/**
 * 抛物线组件
 * @description 绘制抛物线，可用于物体抛射
 * @author JingBin
 */
var ps;
(function (ps) {
    var Parabola = /** @class */ (function (_super) {
        __extends(Parabola, _super);
        function Parabola(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.articleScale = 1; //抛射物体缩放值
            _this.gravity = 0; //物体重力
            _this.parabolaAuto = false; //是否自动抛射物体
            _this.parabolaInterval = 1000; //自动抛射时间间隔
            _this.parabolaTimeMin = 0; //自动抛射最小时间
            _this.parabolaLittleTime = 0; //自动抛射递减时间
            _this._parabolaType = ParabolaType.JOYSTICK; //抛射类型
            _this.speedX = 2; //抛射X轴速度
            _this.speedY = -2; //抛射Y轴速度
            _this.speedMin = { x: 1, y: -5 }; //抛射速度最小值
            _this.speedMax = { x: 3, y: -3 }; //抛射速度最大值
            _this.color = new qc.Color([255, 0, 0]); //抛物线颜色
            _this.articleParabola = []; //抛射中的物体
            _this.articlePool = []; //抛射物体池
            _this.shapes = []; //抛物线绘制圆点
            _this.eventDisp = new ps.EventDispatcher();
            /** 序列化 */
            _this.serializableFields = {
                articleTexture: qc.Serializer.TEXTURE,
                articleScale: qc.Serializer.NUMBER,
                gravity: qc.Serializer.NUMBER,
                speedX: qc.Serializer.NUMBER,
                speedY: qc.Serializer.NUMBER,
                parabolaAuto: qc.Serializer.BOOLEAN,
                parabolaParent: qc.Serializer.NODE,
                parabolaInterval: qc.Serializer.NUMBER,
                parabolaTimeMin: qc.Serializer.NUMBER,
                parabolaLittleTime: qc.Serializer.NUMBER,
                _parabolaType: qc.Serializer.NUMBER,
            };
            _this.startPos = new qc.Point();
            return _this;
            // this.runInEditor = true;
        }
        Parabola.prototype.awake = function () {
            this.awaked = true;
            this.initParabolaType();
            this.refresh();
        };
        Parabola.prototype.update = function () {
            if (this.parabolaType === ParabolaType.JOYSTICK) {
                return;
            }
            this.updateWeapon();
        };
        Parabola.prototype.refresh = function () {
            this.gameObject.children.forEach(function (child) {
                if (child) {
                    if (child.clear) {
                        child.clear();
                    }
                    child.destroy();
                }
            });
            this.shapes = [];
            this.createArticle();
            // this.drawPath();
        };
        Object.defineProperty(Parabola.prototype, "parabolaType", {
            get: function () {
                return this._parabolaType;
            },
            set: function (type) {
                if (type != void 0) {
                    this._parabolaType = type;
                }
                this.initParabolaType();
            },
            enumerable: true,
            configurable: true
        });
        Parabola.prototype.initParabolaType = function () {
            if (!this.awaked) {
                return;
            }
            main.gameEvent.remove(JoystickEvent.ON_DOWN, this.chgAngle, this);
            main.gameEvent.remove(JoystickEvent.ON_DRAG, this.chgAngle, this);
            main.gameEvent.remove(JoystickEvent.ON_UP, this.joystickUp, this);
            //this.game.input.mouse.onMouseUp.remove(this.mouseUp, this);
            if (this.parabolaTimer) {
                this.game.timer.remove(this.parabolaTimer);
            }
            switch (this.parabolaType) {
                //摇杆控制
                case ParabolaType.JOYSTICK:
                    main.gameEvent.add(JoystickEvent.ON_DOWN, this.chgAngle, this);
                    main.gameEvent.add(JoystickEvent.ON_DRAG, this.chgAngle, this);
                    main.gameEvent.add(JoystickEvent.ON_UP, this.joystickUp, this);
                    break;
                //鼠标离开
                case ParabolaType.MOUSE_UP:
                    //this.game.input.mouse.onMouseUp.add(this.mouseUp, this);
                    break;
                //按时间间隔循环
                case ParabolaType.TIME_LOOP:
                    this.parabolaTimer = this.game.timer.add(this.parabolaInterval, this.timeFinish, this);
                    break;
            }
        };
        Parabola.prototype.joystickUp = function () {
            if (this.parabolaType !== ParabolaType.JOYSTICK) {
                return;
            }
            this.throwStart();
        };
        Parabola.prototype.mouseUp = function () {
            if (this.parabolaType !== ParabolaType.MOUSE_UP) {
                return;
            }
            this.createArticle();
            this.throwStart();
        };
        Parabola.prototype.timeFinish = function () {
            if (this.parabolaType !== ParabolaType.TIME_LOOP) {
                return;
            }
            if (this.parabolaTimer) {
                this.game.timer.remove(this.parabolaTimer);
            }
            this.createArticle();
            if (this.throwStart()) {
                this.parabolaInterval -= this.parabolaLittleTime;
                this.parabolaInterval = Math.max(this.parabolaInterval, this.parabolaTimeMin);
            }
            this.parabolaTimer = this.game.timer.add(this.parabolaInterval, this.timeFinish, this);
        };
        Parabola.prototype.updateWeapon = function () {
            var stepRate = 5;
            for (var i = 0, isAdd = true; i < this.articleParabola.length; isAdd ? i++ : i) {
                isAdd = true;
                var article = this.articleParabola[i];
                if (!article.parent) {
                    continue;
                }
                if (article["shooted"]) {
                    continue;
                }
                for (var j = 0; j < stepRate; j++) {
                    article.x += article["speedX"];
                    article.y += article["speedY"];
                    article["speedY"] += (article["gravity"]);
                    var gPot = article.parent.toGlobal(new qc.Point(article.x, article.y));
                    if (gPot.x + article.width * article.scaleX >= ps.ScrFix.width / ps.ScrFix.scale
                        || gPot.y + article.height * article.scaleY >= ps.ScrFix.height / ps.ScrFix.scale
                        || gPot.x - article.width * article.scaleX <= -ps.ScrFix.width / ps.ScrFix.scale
                        || gPot.y - article.height * article.scaleY <= -ps.ScrFix.height / ps.ScrFix.scale) {
                        isAdd = false;
                        // article.destroy();
                        this.article.removeSelf();
                        this.articlePool.push(article);
                        this.articleParabola.splice(i, 1);
                        break;
                    }
                }
                var angle = Math.atan2(article["speedY"], article["speedX"]);
                var rot = angle + 90 * Math.PI / 180;
                article.rotation = rot;
            }
        };
        Parabola.prototype.createArticle = function () {
            if (this.articleTexture && !this.gameObject.getChildByName("article")) {
                var article = void 0;
                while (!article && this.articlePool && this.articlePool.length > 0) {
                    article = this.articlePool.shift();
                }
                if (!article) {
                    article = new qc.UIImage(this.game, this.gameObject);
                }
                this.article = article;
                this.article.texture = this.articleTexture;
                this.article.resetNativeSize();
                this.article.pivotX = .5;
                this.article.pivotY = .5;
                this.article.scaleX = this.article.scaleY = this.articleScale;
                this.gameObject.setChildIndex(this.article, 0);
                this.article.name = "article";
            }
        };
        Parabola.prototype.throwStart = function () {
            if (!this.article) {
                return;
            }
            this.article["speedX"] = this.speedX;
            this.article["speedY"] = this.speedY;
            this.article["gravity"] = this.gravity;
            if (this.parabolaAuto) {
                this.addParabola(this.article);
            }
            this.eventDisp.dispatch(ParabolaEvent.THROW_START, this.article, this.speedX, this.speedY, this.gravity);
            return true;
        };
        Parabola.prototype.addParabola = function (article) {
            if (!article) {
                return;
            }
            if (!article.parent) {
                return;
            }
            if (article["shooted"]) {
                return;
            }
            var parent = this.parabolaParent;
            if (!parent) {
                return;
            }
            var pt = article.parent.toGlobal(new qc.Point(article.x, article.y));
            pt = parent.toLocal(pt);
            parent.addChild(article);
            article.x = pt.x;
            article.y = pt.y;
            this.articleParabola.push(article);
        };
        Parabola.prototype.chgAngle = function (x, y, angle, dist, circleRadius, ballRadius, stageX, stageY) {
            var rad = (circleRadius - ballRadius);
            if (dist > rad) {
                dist = rad;
            }
            var perX = Math.max(x / (rad / 2), -.48);
            var perY = 1 - y / (rad / 2);
            // console.log(perX, perY);
            this.speedX = this.speedMin.x + (this.speedMax.x - this.speedMin.x) * perX;
            this.speedY = this.speedMax.y + (this.speedMin.y - this.speedMax.y) * perY;
            // this.angle = angle;
            if (this.parabolaType !== ParabolaType.TIME_LOOP) {
                this.drawPath();
            }
            this.chgArticle( /* stageX, stageY */);
        };
        Parabola.prototype.chgArticle = function (stageX, stageY) {
            var angle;
            if (stageX != void 0 && stageY != void 0) {
                var potA = this.gameObject.parent.toGlobal(new qc.Point(this.gameObject.x, this.gameObject.y));
                var potC = new qc.Point(stageX, stageY);
                var a = Math.abs(potC.x - potA.x);
                var c = Math.abs(potC.y - potA.y);
                angle = Math.atan2(potC.y - potA.y, potC.x - potA.x);
            }
            else {
                angle = Math.atan2(this.speedY, this.speedX);
            }
            this.createArticle();
            if (this.article) {
                this.article.rotation = angle + 90 * Math.PI / 180;
            }
        };
        /** 绘制路径 */
        Parabola.prototype.drawPath = function (stageX, stageY) {
            var g = this.gravity;
            var speedX = this.speedX;
            var speedY = this.speedY;
            var currentX = this.startPos.x;
            var currentY = this.startPos.y;
            var validCnt = 0;
            var lastPt = new qc.Point(this.startPos.x, this.startPos.y);
            var centerPt = new qc.Point(0, 0);
            var index = 0;
            while (true) {
                currentX += speedX;
                currentY += speedY;
                speedY += g;
                centerPt.x = currentX;
                centerPt.y = currentY;
                if (lastPt.distance(centerPt) > 20) {
                    lastPt.x = centerPt.x;
                    lastPt.y = centerPt.y;
                    var sp = this.getGraphics(validCnt);
                    sp.x = currentX;
                    sp.y = currentY;
                    index++;
                    sp.alpha = 1;
                    this.gameObject.addChild(sp);
                    validCnt++;
                    if (validCnt >= 35) {
                        break;
                    }
                    if (sp.y > this.startPos.y) {
                        break;
                    }
                }
            }
            for (var i = index; i < this.shapes.length; i++) {
                this.shapes[i].visible = false;
            }
            var idx = 0;
            for (var i = this.shapes.length - 1; i >= 0; i--) {
                var sp = this.shapes[i];
                if (!sp.visible) {
                    continue;
                }
                this.shapes[i].alpha = 0.2 + idx * 0.2;
                if (idx >= 4) {
                    break;
                }
                idx++;
            }
        };
        Parabola.prototype.getGraphics = function (index) {
            if (this.shapes.length <= index) {
                var sp = new qc.Graphics(this.game, void 0);
                sp.beginFill(this.color.toNumber(), 1);
                sp.drawCircle(0, 0, 6);
                sp.endFill();
                this.shapes[index] = sp;
            }
            this.shapes[index].visible = true;
            return this.shapes[index];
        };
        return Parabola;
    }(ps.Behaviour));
    ps.Parabola = Parabola;
    qc.registerBehaviour('ps.Parabola', Parabola);
    Parabola["__menu"] = 'Custom/Parabola';
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
