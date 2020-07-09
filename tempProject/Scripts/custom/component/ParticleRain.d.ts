declare namespace ps.particle {
    class ParticleRain extends qc.Behaviour {
        private t;
        private t2;
        private autoPlay;
        private gravityX;
        private gravityY;
        private particles;
        /**
        * 播放时间 <= 0 就一直播放
        **/
        private playTime;
        /**
        * 创建间隔
        **/
        private createInterval;
        private particleLife;
        private particleLifeFloating;
        private speedX;
        private speedXFloating;
        private speedY;
        private speedYFloating;
        private scale;
        private scaleFloating;
        private rotationSpeed;
        private rotationSpeedFloating;
        private startX;
        private startXFloating;
        private startY;
        private startYFloating;
        private imgs;
        private serializableFields;
        constructor(gameObject: qc.Node);
        protected awake(): void;
        /**
        * 播放时间 <= 0 就一直播放
        **/
        play(time?: number): void;
        /**
        * kill true 立即销毁目前所有的粒子
        **/
        stop(kill?: boolean): void;
        private creates;
        protected update(): void;
        onDestroy(): void;
    }
    class ParticleImage extends qc.UIImage {
        speedX: number;
        speedY: number;
        createTime: number;
        life: number;
        rotationSpeed: number;
        constructor(game: any, parent: any);
    }
}
