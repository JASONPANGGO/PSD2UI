/** 音频接口，使用webaudio组件进行播放 */
declare namespace ps.Audio {
    /** 音频文件路径 */
    let rootPath: string;
    /**
     * 播放BGM
     * @param name BGM文件名称,默认为${projectCfg.BGM_NAME}
     * @param type Bgm文件类型，默认mp3
     * @param withPlay 是否自动播放 填false则需要点击才能播放,默认true
     */
    function playBGM(name?: string, type?: string, withPlay?: boolean): void;
    /**
     * 停止播放BGM
     */
    function stopBGM(): void;
    /**
     * 播放音效。音效可以同时播放多个。
     * @param name            声音文件名称，不是路径
     * @param type          声音文件类型，默认mp3
     * @param playtime        播放次数,<=0表示无限循环。
     * @param interval        重叠播放的间隔时间，少于这个间隔时间播放相同的音效，会跳过，播放单位毫秒，默认50
     */
    function playSound(name: string, type?: string, playtime?: number, interval?: number): void;
    /**
     * 停止播放音效
     * @param name 声音文件名称，不是路径
     * @param type 声音文件类型，默认mp3
     */
    function stopSound(name: string, type?: string): void;
}
