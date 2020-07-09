declare namespace ps {
    enum DraggableItemEvent {
        TriggerTarget = "TriggerTarget",
        MissTarget = "MissTarget"
    }
    class DraggableItem extends ps.Behaviour {
        itemEvent: ps.EventDispatcher;
        targetArea: qc.Node;
        returnAnimTime: number;
        orgX: number;
        orgY: number;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        onInit(): void;
        onStart(): void;
        onDrag(...args: any[]): void;
        onDragEnd(...args: any[]): void;
        returnToOrgPos(): void;
    }
}
