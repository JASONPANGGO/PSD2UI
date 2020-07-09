declare namespace ps {
    var DESIGN_LONG: number;
    var DESIGN_SHORT: number;
    type orientationType = "p" | "l" | "def";
    type mobileType = "pad" | "ipx" | "def";
    /**
     * 屏幕状态
     */
    class ScrFix {
        private static _width;
        private static _height;
        static set width(v: number);
        static get width(): number;
        static set height(v: number);
        static get height(): number;
        static get scale(): number;
        /** 屏幕中心点X */
        static get cx(): number;
        /** 屏幕中心点Y */
        static get cy(): number;
        /** 宽高比 */
        static get ratio(): number;
        /** 横竖屏 l横屏 p竖屏 */
        static get orientation(): "p" | "l";
        /** 是竖屏 */
        static get isP(): boolean;
        /** 是横屏 */
        static get isL(): boolean;
        /** 屏幕类型 def pad ipx   */
        static get mobileType(): mobileType;
        /** 是pad */
        static get isPAD(): boolean;
        /** 是ipx */
        static get isIPX(): boolean;
        /** 返回横竖屏对应的参数
         * @param   valueP 竖屏参数
         * @param   valueL 横屏参数
         */
        static v(valueP: any, valueL: any): any;
        /** 返回各个类型的屏幕对应的参数 */
        static v2(args: {
            np?: any;
            nl?: any;
            pp?: any;
            pl?: any;
            xp?: any;
            xl?: any;
        }): any;
    }
}
