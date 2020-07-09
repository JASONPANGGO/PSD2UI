declare namespace ps.btn {
    /**
     * 安装按钮组件
     * @author VaMP
     */
    class InstallBtn extends qc.Behaviour {
        /** 点击的同时自动跳转gameEnd */
        autoGameEnd: boolean;
        /** 自动放大缩小比例，0为不缩放。默认为0 */
        scale: number;
        /** 缩放间隔时间，单位毫秒，默认500 */
        duration: number;
        delay: number;
        private tween;
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        onEnable(): void;
        onDisable(): void;
        onDown(): void;
    }
}
