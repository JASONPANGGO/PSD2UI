declare namespace ps {
    /**
     * 背景颜色组件
     * @author VaMP
     */
    class BgMask extends qc.Behaviour {
        private _color;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        set color(c: qc.Color);
        get color(): qc.Color;
        private refresh;
    }
}
