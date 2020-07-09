var ps;
(function (ps) {
    ps.DESIGN_LONG = 1334;
    ps.DESIGN_SHORT = 750;
    /**
     * 屏幕状态
     */
    var ScrFix = /** @class */ (function () {
        function ScrFix() {
        }
        Object.defineProperty(ScrFix, "width", {
            get: function () {
                if (ps.editor && ps.editor.scene.gameSize)
                    return ps.editor.scene.gameSize.width;
                if (this._width === undefined)
                    return qc_game.width;
                return this._width;
            },
            set: function (v) {
                this._width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "height", {
            get: function () {
                if (ps.editor && ps.editor.scene.gameSize)
                    return ps.editor.scene.gameSize.height;
                if (this._height === undefined)
                    return qc_game.height;
                return this._height;
            },
            set: function (v) {
                this._height = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "scale", {
            get: function () {
                return ScrFix.isP ? ScrFix.width / 750 : ScrFix.height / 750;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "cx", {
            /** 屏幕中心点X */
            get: function () {
                return this.width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "cy", {
            /** 屏幕中心点Y */
            get: function () {
                return this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "ratio", {
            /** 宽高比 */
            get: function () {
                return this.width / this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "orientation", {
            /** 横竖屏 l横屏 p竖屏 */
            get: function () {
                if (this.ratio > 1)
                    return "l";
                else
                    return "p";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "isP", {
            /** 是竖屏 */
            get: function () {
                return ScrFix.orientation === "p";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "isL", {
            /** 是横屏 */
            get: function () {
                return ScrFix.orientation === "l";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "mobileType", {
            /** 屏幕类型 def pad ipx   */
            get: function () {
                if (ScrFix.isP ? this.ratio > 10 / 16 : this.ratio < 16 / 10) {
                    return "pad";
                }
                if (ScrFix.isP ? this.ratio < 9 / 17 : this.ratio > 17 / 9) {
                    return "ipx";
                }
                return "def";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "isPAD", {
            /** 是pad */
            get: function () {
                return ScrFix.mobileType === "pad";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrFix, "isIPX", {
            /** 是ipx */
            get: function () {
                return ScrFix.mobileType === "ipx";
            },
            enumerable: true,
            configurable: true
        });
        /** 返回横竖屏对应的参数
         * @param   valueP 竖屏参数
         * @param   valueL 横屏参数
         */
        ScrFix.v = function (valueP, valueL) {
            return ScrFix.isP ? valueP : valueL;
        };
        /** 返回各个类型的屏幕对应的参数 */
        ScrFix.v2 = function (args) {
            if (ScrFix.isPAD)
                return ScrFix.isP ? args.pp : args.pl;
            if (ScrFix.isIPX)
                return ScrFix.isP ? args.xp : args.xl;
            return ScrFix.isP ? args.np : args.nl;
        };
        return ScrFix;
    }());
    ps.ScrFix = ScrFix;
})(ps || (ps = {}));
