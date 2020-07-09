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
    var SKPlayer = /** @class */ (function (_super) {
        __extends(SKPlayer, _super);
        function SKPlayer(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.playOnAwake = true;
            _this.loop = false;
            _this.speed = 1;
            _this.delay = 0;
            /** 序列化 */
            _this.serializableFields = {
                playOnAwake: qc.Serializer.BOOLEAN,
                loop: qc.Serializer.BOOLEAN,
                animationName: qc.Serializer.STRING,
                speed: qc.Serializer.NUMBER,
                delay: qc.Serializer.NUMBER,
            };
            return _this;
        }
        SKPlayer.prototype.awake = function () {
            if (this.playOnAwake)
                this.play();
        };
        SKPlayer.prototype.play = function () {
            var _this = this;
            var sp = this.gameObject;
            ps.timer.once(this.delay, function () {
                sp.visible = true;
                sp.playAnimation(_this.animationName, _this.speed, _this.loop);
            });
        };
        return SKPlayer;
    }(ps.Behaviour));
    ps.SKPlayer = SKPlayer;
    qc.registerBehaviour('ps.SKPlayer', SKPlayer);
    SKPlayer["__menu"] = 'Custom/SKPlayer';
})(ps || (ps = {}));
