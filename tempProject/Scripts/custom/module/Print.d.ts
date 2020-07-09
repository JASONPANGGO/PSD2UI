declare namespace ps {
    /** 打印接口 */
    class Print {
        /** 打印绿色信息 */
        static green(text: string | number): void;
        /** 打印蓝色信息 */
        static blue(text: string | number): void;
        /** 打印橙色信息 */
        static orange(text: string | number): void;
        /** 打印红色信息 */
        static red(text: string | number): void;
        /** 打印紫色信息 */
        static purple(text: string | number): void;
        /**
         * 打印彩色信息
         * @param text 文字
         * @param color 颜色
         * @param bgColor 背景颜色
         */
        static colorful(text: string | number, color: string, bgColor?: string): void;
    }
}
