declare class CircleRing extends qc.Behaviour {
    /** 序列化 */
    interval: number;
    private serializableFields;
    constructor(gameObject: qc.Node);
    awake(): void;
    newImg(_scale: any): void;
    showRingBig(tar: any, _scale: any, aniScal: any): void;
}
