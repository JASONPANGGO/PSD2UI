declare namespace ps {
    /**
     * 重玩按钮组件
     * @author VaMP
     */
    class RetryBtn extends qc.Behaviour {
        /** 是否激活 */
        active: boolean;
        /** 没有次数后点击跳转商店 */
        toInstall: boolean;
        /** 没有次数后隐藏按钮 */
        autoHide: boolean;
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        onUp(): void;
        /** 更新按钮状态 */
        private updateStatus;
    }
}
