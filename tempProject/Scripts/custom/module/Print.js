var ps;
(function (ps) {
    /** 打印接口 */
    var Print = /** @class */ (function () {
        function Print() {
        }
        /** 打印绿色信息 */
        Print.green = function (text) {
            Print.colorful(" " + text + " ", "white", "#00bb00");
        };
        /** 打印蓝色信息 */
        Print.blue = function (text) {
            Print.colorful(" " + text + " ", "white", "#00aaaa");
        };
        /** 打印橙色信息 */
        Print.orange = function (text) {
            Print.colorful(" " + text + " ", "white", "#ff8800");
        };
        /** 打印红色信息 */
        Print.red = function (text) {
            Print.colorful(" " + text + " ", "white", "#bb0000");
        };
        /** 打印紫色信息 */
        Print.purple = function (text) {
            Print.colorful(" " + text + " ", "white", "#800080");
        };
        /**
         * 打印彩色信息
         * @param text 文字
         * @param color 颜色
         * @param bgColor 背景颜色
         */
        Print.colorful = function (text, color, bgColor) {
            if (bgColor === void 0) { bgColor = "white"; }
            console.log("%c" + text, "color:" + color + ";background:" + bgColor + ";");
        };
        return Print;
    }());
    ps.Print = Print;
})(ps || (ps = {}));
