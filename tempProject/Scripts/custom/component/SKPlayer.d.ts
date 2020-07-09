declare namespace ps {
    class SKPlayer extends ps.Behaviour {
        private playOnAwake;
        private animationName;
        private loop;
        private speed;
        private delay;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.Node);
        awake(): void;
        play(): void;
    }
}
