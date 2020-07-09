declare namespace ps {
    /**
     * 项目配置
     * @author VaMP
     */
    class MainConfig extends qc.Behaviour {
        /**
         * 游戏版本,自行填写
         */
        version: string;
        /** 自动gameStart(调试用) */
        autoGameStart: boolean;
        /** 自动播放BGM */
        autoPlayBgm: boolean;
        /** 背景音乐名字，默认bm_bgm */
        bgmName: string;
        /** 显示fps */
        showFps: boolean;
        /** 使用动态参数json文件 */
        useConfigJson: boolean;
        /** 是否加载开始界面预制 */
        isCreateStartPrefab: boolean;
        startPrefab: qc.Prefab;
        endingPrefab: qc.Prefab;
        touchMaskPrefab: qc.Prefab;
        private serializableFields;
        awake(): void;
        update(): void;
    }
}
