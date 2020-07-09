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
    var particle;
    (function (particle) {
        var ParticleRain = /** @class */ (function (_super) {
            __extends(ParticleRain, _super);
            function ParticleRain(gameObject) {
                var _this = _super.call(this, gameObject) || this;
                _this.autoPlay = false;
                _this.gravityX = 0;
                _this.gravityY = 0;
                _this.particles = [];
                /**
                * 播放时间 <= 0 就一直播放
                **/
                _this.playTime = 1000;
                /**
                * 创建间隔
                **/
                _this.createInterval = 100;
                _this.particleLife = 3000;
                _this.particleLifeFloating = 500;
                _this.speedX = -1;
                _this.speedXFloating = 2;
                _this.speedY = -2;
                _this.speedYFloating = -2;
                _this.scale = 0.6;
                _this.scaleFloating = 0.6;
                _this.rotationSpeed = 0;
                _this.rotationSpeedFloating = 0;
                _this.startX = 0;
                _this.startXFloating = 0;
                _this.startY = 0;
                _this.startYFloating = 0;
                _this.imgs = [];
                _this.serializableFields = {
                    particles: qc.Serializer.TEXTURES,
                    autoPlay: qc.Serializer.BOOLEAN,
                    playTime: qc.Serializer.NUMBER,
                    startX: qc.Serializer.NUMBER,
                    startXFloating: qc.Serializer.NUMBER,
                    startY: qc.Serializer.NUMBER,
                    startYFloating: qc.Serializer.NUMBER,
                    particleLife: qc.Serializer.NUMBER,
                    particleLifeFloating: qc.Serializer.NUMBER,
                    speedX: qc.Serializer.NUMBER,
                    speedXFloating: qc.Serializer.NUMBER,
                    speedY: qc.Serializer.NUMBER,
                    speedYFloating: qc.Serializer.NUMBER,
                    scale: qc.Serializer.NUMBER,
                    scaleFloating: qc.Serializer.NUMBER,
                    rotationSpeed: qc.Serializer.NUMBER,
                    rotationSpeedFloating: qc.Serializer.NUMBER,
                    createInterval: qc.Serializer.NUMBER,
                    gravityX: qc.Serializer.NUMBER,
                    gravityY: qc.Serializer.NUMBER,
                };
                return _this;
            }
            ParticleRain.prototype.awake = function () {
                if (this.autoPlay) {
                    console.log("开始播放粒子");
                    this.play(this.playTime);
                }
            };
            /**
            * 播放时间 <= 0 就一直播放
            **/
            ParticleRain.prototype.play = function (time) {
                if (time === void 0) { time = -1; }
                if (this.t) {
                    qc_game.timer.remove(this.t);
                }
                if (this.t2) {
                    qc_game.timer.remove(this.t2);
                }
                this.t = null;
                this.t2 = null;
                if (time > 0) {
                    this.t2 = qc_game.timer.add(time, this.stop, this);
                }
                this.t = qc_game.timer.loop(this.createInterval, this.creates, this);
            };
            /**
            * kill true 立即销毁目前所有的粒子
            **/
            ParticleRain.prototype.stop = function (kill) {
                if (kill === void 0) { kill = false; }
                if (kill) {
                    for (var i = 0; i < this.imgs.length; i++) {
                        var img = this.imgs[i];
                        img.destroy();
                    }
                    this.imgs.length = 0;
                }
                if (this.t) {
                    qc_game.timer.remove(this.t);
                }
                if (this.t2) {
                    qc_game.timer.remove(this.t2);
                }
                this.t = null;
                this.t2 = null;
            };
            ParticleRain.prototype.creates = function () {
                var img = new ParticleImage(qc_game, this.gameObject); //qc_game.add.image(this.gameObject);
                var index = Math.floor(Math.random() * this.particles.length);
                img.texture = this.particles[index];
                img.x = this.startX + Math.random() * this.startXFloating;
                img.y = this.startY + Math.random() * this.startYFloating;
                img.pivotX = img.pivotY = 0.5;
                img.createTime = qc_game.time.scaledTime;
                img.speedX = this.speedX + Math.random() * this.speedXFloating;
                img.speedY = this.speedY + Math.random() * this.speedYFloating;
                img.resetNativeSize();
                img.scaleX = img.scaleY = this.scale + Math.random() * this.scaleFloating;
                img.life = this.particleLife + Math.random() * this.particleLifeFloating;
                img.rotationSpeed = this.rotationSpeed + Math.random() * this.rotationSpeedFloating;
                this.imgs.push(img);
            };
            ParticleRain.prototype.update = function () {
                var currentTime = qc_game.time.scaledTime;
                for (var i = 0; i < this.imgs.length; i++) {
                    var img = this.imgs[i];
                    img.speedY += this.gravityY;
                    img.speedX += this.gravityX;
                    img.x += img.speedX;
                    img.y += img.speedY;
                    img.rotation += img.rotationSpeed / 180 * Math.PI;
                    if (img.createTime + img.life < currentTime) {
                        img.destroy();
                        this.imgs.splice(i, 1);
                        i--;
                    }
                }
            };
            ParticleRain.prototype.onDestroy = function () {
                for (var i = 0; i < this.imgs.length; i++) {
                    var img = this.imgs[i];
                    img.destroy();
                }
                if (this.t) {
                    qc_game.timer.remove(this.t);
                }
                if (this.t2) {
                    qc_game.timer.remove(this.t2);
                }
                this.t = null;
                this.t2 = null;
                this.imgs = null;
            };
            return ParticleRain;
        }(qc.Behaviour));
        particle.ParticleRain = ParticleRain;
        qc.registerBehaviour('ps.particle.ParticleRain', ParticleRain);
        ParticleRain["__menu"] = 'Custom/ParticleRain';
        var ParticleImage = /** @class */ (function (_super) {
            __extends(ParticleImage, _super);
            function ParticleImage(game, parent) {
                var _this = _super.call(this, game, parent) || this;
                _this.speedX = 0;
                _this.speedY = 0;
                _this.createTime = 0;
                _this.life = 0;
                _this.rotationSpeed = 0;
                return _this;
            }
            return ParticleImage;
        }(qc.UIImage));
        particle.ParticleImage = ParticleImage;
    })(particle = ps.particle || (ps.particle = {}));
})(ps || (ps = {}));
