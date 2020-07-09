declare namespace ps {
    /**
     * 弹出得分工具(支持文字以及图片)
     *   ps.PopBox.popLabel(tar, "+1", 200, '#255931',-200);
     *   ps.PopBox.popImg(tar, this.progressSkin,-200)
     */
    class PopBox {
        private target;
        private duration;
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
        static popLabel(target: qc.Node, text: string, fontSize: number, color: string, disY?: number, duration?: number, x?: number, y?: number): PopBox;
        popLabel(target: qc.Node, text: string, fontSize: number, color: string, disY?: number, duration?: number, x?: number, y?: number): void;
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
        static popImg(target: qc.Node, skin: qc.Texture, disY?: number, duration?: number, x?: number, y?: number, scale?: number): PopBox;
        popImg(target: qc.Node, skin: qc.Texture, disY?: number, duration?: number, x?: number, y?: number, scale?: number): void;
    }
}
