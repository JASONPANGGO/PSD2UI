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
     * 移动的粒子组件
     * @description 创建粒子，移动到目标对象处
     * @author JingBin
     */
    var MoveParticle = /** @class */ (function (_super) {
        __extends(MoveParticle, _super);
        function MoveParticle(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.life = 1000; //粒子生命值，<= 0 时，粒子一直创建不停止
            _this.lifeVar = 0; //粒子生命值，上下浮动值
            _this.endClear = false; //生命结束时，清除所有粒子
            _this.interval = 100; //粒子创建时间间隔
            _this.intervalVar = 0; //粒子创建时间间隔，上下浮动值
            _this.duration = 500; //粒子持续时间
            _this.durationVar = 0; //粒子持续时间，上下浮动值
            _this.startScale = 1; //粒子出生缩放值
            _this.startScaleVar = 0; //粒子出生缩放值，上下浮动值
            _this.endScale = 1; //粒子死亡缩放值
            _this.endScaleVar = 0; //粒子死亡缩放值，上下浮动值
            _this.startAlpha = 1; //粒子出生透明度
            _this.startAlphaVar = 0; //粒子出生透明度，上下浮动值
            _this.endAlpha = 1; //粒子死亡透明度
            _this.endAlphaVar = 0; //粒子死亡透明度，上下浮动值
            _this.startRotation = 0; //粒子出生角度值
            _this.startRotationVar = 0; //粒子出生角度值，上下浮动值
            _this.endRotation = 0; //粒子死亡角度值
            _this.endRotationVar = 0; //粒子死亡角度值，上下浮动值
            _this.endLife = false; //粒子生命结束
            _this.nodePool = []; //粒子节点池
            _this.currNodes = []; //当前场上的粒子
            _this.currLife = 0;
            /** 序列化 */
            _this.serializableFields = {
                texture: qc.Serializer.TEXTURE,
                target: qc.Serializer.NODE,
                life: qc.Serializer.NUMBER,
                lifeVar: qc.Serializer.NUMBER,
                endClear: qc.Serializer.BOOLEAN,
                interval: qc.Serializer.NUMBER,
                intervalVar: qc.Serializer.NUMBER,
                duration: qc.Serializer.NUMBER,
                durationVar: qc.Serializer.NUMBER,
                startPointVar: qc.Serializer.POINT,
                endPointVar: qc.Serializer.POINT,
                startScale: qc.Serializer.NUMBER,
                startScaleVar: qc.Serializer.NUMBER,
                endScale: qc.Serializer.NUMBER,
                endScaleVar: qc.Serializer.NUMBER,
                startAlpha: qc.Serializer.NUMBER,
                startAlphaVar: qc.Serializer.NUMBER,
                endAlpha: qc.Serializer.NUMBER,
                endAlphaVar: qc.Serializer.NUMBER,
                startRotation: qc.Serializer.NUMBER,
                startRotationVar: qc.Serializer.NUMBER,
                endRotation: qc.Serializer.NUMBER,
                endRotationVar: qc.Serializer.NUMBER,
            };
            _this.runInEditor = true;
            return _this;
        }
        MoveParticle.prototype.awake = function () {
            var _this = this;
            this.nodePool = this.nodePool.concat(this.gameObject.children);
            this.gameObject.removeChildren();
            //粒子生命值
            var life = this.life;
            if (life > 0 && this.lifeVar !== 0) {
                var lifeVar = ps.Random.round(-this.lifeVar, this.lifeVar);
                var sum = life + lifeVar;
                if (sum > 0) {
                    life = sum;
                }
            }
            this.currLife = life;
            if (this.endLifeTime) {
                ps.timer.remove(this.endLifeTime);
            }
            if (this.currLife > 0) {
                this.endLifeTime = ps.timer.once(this.currLife, function () { return _this.endLife = true; });
            }
        };
        MoveParticle.prototype.refresh = function () {
            this.destroyAllNode();
            this.endLife = false;
            this.lastCreateTime = null;
            this.nodePool = [];
            this.currNodes = [];
            this.awake();
            this.enable = true;
        };
        MoveParticle.prototype.update = function () {
            if (this.endLife) {
                if (this.endClear) {
                    this.destroyAllNode();
                }
                this.enable = false;
                return;
            }
            var currTime = this.game.time.now;
            //粒子创建时间间隔
            var interval = this.interval + ps.Random.round(-this.intervalVar, this.intervalVar);
            if (this.lastCreateTime != void 0) {
                if (currTime - this.lastCreateTime < interval) {
                    return;
                }
            }
            this.lastCreateTime = currTime;
            this.createNode();
        };
        /** 创建粒子 */
        MoveParticle.prototype.createNode = function () {
            if (this.endLife) {
                return;
            }
            //初始化粒子
            var node = this.nodePool.length > 0 ? this.nodePool.shift() : new qc.UIImage(this.game);
            node.pivotX = .5;
            node.pivotY = .5;
            node.texture = this.texture;
            this.currNodes.push(node);
            this.gameObject.addChild(node);
            //粒子出生位置
            // let point = new qc.Point(this.gameObject.width / 2, this.gameObject.height / 2);
            var point = new qc.Point(0, 0);
            if (this.startPointVar) {
                point.x += ps.Random.round(-this.startPointVar.x, this.startPointVar.x);
                point.y += ps.Random.round(-this.startPointVar.y, this.startPointVar.y);
            }
            node.x = point.x;
            node.y = point.y;
            //粒子出生缩放值
            var scale = this.startScale;
            if (this.startScaleVar != void 0) {
                scale += ps.Random.range(-this.startScaleVar, this.startScaleVar);
            }
            node.scaleX = node.scaleY = scale;
            //粒子出生透明度
            var alpha = this.startAlpha;
            if (this.startAlphaVar != void 0) {
                alpha += ps.Random.range(-this.startAlphaVar, this.startAlphaVar);
            }
            node.alpha = alpha;
            //粒子出生角度值
            var rotate = this.startRotation;
            if (this.startRotationVar != void 0) {
                rotate += ps.Random.range(-this.startRotationVar, this.startRotationVar);
            }
            node.rotation = rotate;
            this.startNode(node);
        };
        /** 启动粒子 */
        MoveParticle.prototype.startNode = function (node) {
            if (this.endLife) {
                return;
            }
            if (!node || !node.parent) {
                return;
            }
            //粒子死亡位置
            var point = this.target.getWorldPosition();
            point = node.parent.toLocal(point);
            if (this.endPointVar) {
                point.x += ps.Random.round(-this.endPointVar.x, this.endPointVar.x);
                point.y += ps.Random.round(-this.endPointVar.y, this.endPointVar.y);
            }
            //粒子持续时间
            var duration = this.duration + ps.Random.round(-this.durationVar, this.durationVar);
            //粒子死亡缩放值
            var scale = this.endScale;
            if (this.endScaleVar != void 0) {
                scale += ps.Random.range(-this.endScaleVar, this.endScaleVar);
            }
            //粒子死亡透明度
            var alpha = this.endAlpha;
            if (this.endAlphaVar != void 0) {
                alpha += ps.Random.range(-this.endAlphaVar, this.endAlphaVar);
            }
            //粒子死亡透明度
            var rotation = this.endRotation;
            if (this.endRotationVar != void 0) {
                rotation += ps.Random.range(-this.endRotationVar, this.endRotationVar);
            }
            //开始移动
            node["moveTw1"] = ps.Tween.to(node, { x: point.x }, duration, void 0, 0, true);
            node["moveTw2"] = ps.Tween.to(node, { y: point.y, scale: scale, alpha: alpha, rotation: rotation }, duration);
            node["moveTw2"].onComplete.addOnce(this.removeNode, this, void 0, node);
            node["moveTw2"].start();
        };
        /** 移除粒子 */
        MoveParticle.prototype.removeNode = function (node) {
            if (node["moveTw1"]) {
                ps.Tween.clear(node["moveTw1"]);
            }
            if (node["moveTw2"]) {
                ps.Tween.clear(node["moveTw2"]);
                node["moveTw2"].onComplete.remove(this.removeNode, this);
                node["moveTw2"].stop();
            }
            node.removeSelf();
            this.nodePool.push(node);
        };
        /** 销毁所有粒子 */
        MoveParticle.prototype.destroyAllNode = function () {
            var _this = this;
            this.gameObject.removeChildren();
            this.currNodes.forEach(function (node) {
                if (node["moveTw1"]) {
                    ps.Tween.clear(node["moveTw1"]);
                }
                if (node["moveTw2"]) {
                    ps.Tween.clear(node["moveTw2"]);
                    node["moveTw2"].onComplete.remove(_this.removeNode, _this);
                    node["moveTw2"].stop();
                }
                node.destroy();
            });
            this.currNodes = null;
            this.nodePool.forEach(function (node) { return node.destroy(); });
            this.nodePool = null;
        };
        return MoveParticle;
    }(ps.Behaviour));
    ps.MoveParticle = MoveParticle;
    qc.registerBehaviour('ps.MoveParticle', MoveParticle);
    MoveParticle["__menu"] = 'Custom/MoveParticle';
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
*/ 
