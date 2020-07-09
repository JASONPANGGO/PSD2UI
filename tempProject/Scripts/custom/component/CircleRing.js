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
var CircleRing = /** @class */ (function (_super) {
    __extends(CircleRing, _super);
    function CircleRing(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        /** 序列化 */
        _this.interval = 300; //一个圆圈扩散时间
        _this.serializableFields = {
            interval: qc.Serializer.NUMBER,
        };
        return _this;
    }
    CircleRing.prototype.awake = function () {
        var _this = this;
        var tar = this.gameObject;
        var _scaleX = this.gameObject.scaleX;
        var _scaleY = this.gameObject.scaleY;
        _scaleX = 0;
        _scaleY = 0;
        tar.pivotX = 0.5;
        tar.pivotY = 0.5;
        var aniScal = this.gameObject.scaleY;
        this.newImg(1);
        this.newImg(0.7);
        this.showRingBig(tar, 1, aniScal);
        qc_game.timer.loop(this.interval * 3 + 200, function () {
            _this.showRingBig(tar, 1, aniScal);
        });
    };
    CircleRing.prototype.newImg = function (_scale) {
        var tar = this.gameObject;
        var pic = tar.texture;
        var img = qc_game.add.image();
        img.texture = pic;
        tar.addChild(img);
        img.pivotX = 0.5;
        img.pivotY = 0.5;
        img.x = 0;
        img.y = 0;
        img.scaleX = _scale;
        img.scaleY = _scale;
    };
    CircleRing.prototype.showRingBig = function (tar, _scale, aniScal) {
        var _this = this;
        ps.Tween.to(tar, { scaleX: _scale + aniScal, scaleY: _scale + aniScal, alpha: .6 }, this.interval, undefined, 0).onComplete.addOnce(function () {
            ps.Tween.to(tar, { scaleX: _scale + aniScal + 2, scaleY: _scale + aniScal + 2, alpha: .3 }, _this.interval, undefined, 0).onComplete.addOnce(function () {
                ps.Tween.to(tar, { scaleX: _scale + aniScal + 7, scaleY: _scale + aniScal + 7, alpha: 0 }, _this.interval, undefined, 0).onComplete.addOnce(function () {
                    tar.scaleX = 0;
                    tar.scaleY = 0;
                    tar.alpha = 1;
                });
            });
        });
    };
    return CircleRing;
}(qc.Behaviour));
qc.registerBehaviour('CircleRing', CircleRing);
