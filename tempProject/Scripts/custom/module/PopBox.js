var ps;
(function (ps) {
    /**
     * 弹出得分工具(支持文字以及图片)
     *   ps.PopBox.popLabel(tar, "+1", 200, '#255931',-200);
     *   ps.PopBox.popImg(tar, this.progressSkin,-200)
     */
    var PopBox = /** @class */ (function () {
        function PopBox() {
        }
        /**
         * 添加对象
         * @param        target    目标对象
         * @param        duration      持续时长（毫秒）
         * @param        x       初始x
         * @param        y       初始y
         * @param        text    文字
         * @param        fontSize    文字大小
         * @param        color    文字颜色
         * @param        disY    所飘距离Y
        
         */
        PopBox.popLabel = function (target, text, fontSize, color, disY, duration, x, y) {
            var sk = new PopBox();
            sk.popLabel(target, text, fontSize, color, disY, duration, x, y);
            return sk;
        };
        PopBox.prototype.popLabel = function (target, text, fontSize, color, disY, duration, x, y) {
            var _this = this;
            if (disY === undefined)
                disY = -200;
            if (duration === undefined)
                duration = 500;
            if (x === undefined)
                x = 0;
            if (y === undefined)
                y = 0;
            this.target = target;
            this.duration = duration;
            var label = qc_game.add.text();
            label.fontSize = fontSize;
            label.text = text;
            label.color = new qc.Color(color);
            label.x = x;
            label.y = y;
            this.target.addChild(label);
            ps.Tween.to(label, { y: label.y + disY }, this.duration, undefined, 0).onComplete.addOnce(function () {
                _this.target.removeChild(label);
            });
        };
        /**
        * 添加对象
        * @param        target    目标对象
        * @param        duration      持续时长（毫秒）
        * @param        x       初始x
        * @param        y       初始y
        * @param        scale   图片大小
        * @param        skin    皮肤
        * @param        disY    所飘距离Y
       
        */
        PopBox.popImg = function (target, skin, disY, duration, x, y, scale) {
            var sk = new PopBox();
            sk.popImg(target, skin, disY, duration, x, y, scale);
            return sk;
        };
        PopBox.prototype.popImg = function (target, skin, disY, duration, x, y, scale) {
            var _this = this;
            if (disY === undefined)
                disY = -200;
            if (duration === undefined)
                duration = 500;
            if (x === undefined)
                x = 0;
            if (y === undefined)
                y = 0;
            if (scale === undefined)
                scale = 1;
            this.target = target;
            this.duration = duration;
            var img = qc_game.add.image();
            img.pivotX = 0.5;
            img.pivotX = 0.5;
            img.scaleX = scale;
            img.scaleY = scale;
            img.texture = skin;
            img.resetNativeSize();
            this.target.addChild(img);
            ps.Tween.to(img, { y: img.y + disY }, this.duration, undefined, 0).onComplete.addOnce(function () {
                _this.target.removeChild(img);
            });
        };
        return PopBox;
    }());
    ps.PopBox = PopBox;
})(ps || (ps = {}));
