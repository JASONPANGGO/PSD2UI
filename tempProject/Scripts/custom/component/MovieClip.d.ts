declare namespace ps {
    /**
     * 序列帧播放组件 version 1.1
     */
    class MovieClip extends qc.Behaviour {
        private callback;
        private context;
        private actionNames;
        private actionList;
        private defActionName;
        private defPlay;
        private defLoop;
        isReverse: boolean;
        private currentData;
        private playTime;
        private currentFrameName;
        private mcData;
        private nextUpdateTime;
        private frameIndex;
        /** 播放间隔 */
        interval: number;
        isPlaying: boolean;
        /** 播放完成自动销毁 */
        autoDestory: boolean;
        private serializableFields;
        constructor(gameObject: qc.Node);
        protected awake(): void;
        /***
         * 设置动作列表 {"run":["xx.bin","yy.bin"],"idle":["aa.bin","cc.bin"]}
         */
        setActions(arr: Object): void;
        get img(): qc.UIImage;
        private setTexture;
        /**
         * @fName 动作名字
         * @fName 播放次数
         * @callback 完成的回调
         * @context this
         * @backplay 是否来回播放  123456543212345类似这样
         * @startIndex 起始帧
         * @startDirect 起始方向 1正向 -1逆向
        */
        gotoAndPlay(fName: string, playTime?: number, callback?: any, context?: any, backplay?: boolean, startIndex?: number, startDirect?: number): void;
        /** 停止再某个动作的第N帧 */
        gotoAndStop(fName: string, frameIndex?: number): void;
        /** 停止播放 */
        stop(): void;
        /** 恢复播放 */
        resume(): void;
        private dispatch;
        private updateFrame;
        onDestroy(): void;
        protected update(): void;
    }
    class McData {
        action: string;
        frameCnt: number;
        frameName: string;
        backplay: boolean;
        frameNames: string[];
        direct: number;
        constructor(act: string, fcnt: number, fName: string | string[], backplay?: boolean);
        getPngName(frameIndex: number): string;
    }
}
