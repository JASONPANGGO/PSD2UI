declare namespace ps.virtual {
    class VirtualJoystick extends qc.Behaviour {
        static TOUCH_START: string;
        static UPDATE: string;
        static TOUCH_END: string;
        private ball;
        private autoInit;
        private radius;
        private isWake;
        signal: qc.Signal;
        private serializableFields;
        constructor(gameObject: qc.Node);
        protected awake(): void;
        onDown(pt: qc.PointerEvent): void;
        onDrag(pt: any): void;
        onDragEnd(): void;
        start(): void;
        stop(): void;
        private mouseDown;
        private ballMove;
        private onBallDragEnd;
        onDestroy(): void;
        protected update(): void;
    }
}
