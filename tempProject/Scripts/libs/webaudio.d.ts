declare var jwv: string;
/**
 * 暂停所有的声音（静音）
 */
declare function stopAllSound();

/**
 * 恢复所有声音的音量
 */
declare function recoveryAllSound();


/**
 * 播放一个音效
 * @param url {string} 音乐文件地址
 * @param playtime {number} 播放次数 <=0为循环播放
 */
declare function playSoundEff(url: string, playtime: number);


/**
 * 停止一个音效
 * @param url {string} 音乐文件地址
 */
declare function stopSoundEff(url: string);


/**
 * 切换背景音乐
 * @param url {string} 音乐文件地址
 */
declare function changeBgMusic(url: string);


/**
 * 一开始播放背景音乐
 * @param url {string} 音乐文件地址
 * @param withPlay {any} 是否自动播放 填false则需要点击才能播放
 */
declare function playEnterSound(url: string, withPlay: any, loadAutoPlay?: boolean);


/**
 *  控制背景音乐播放
 *   0从头开始播放
 */
declare function playBgSound(time?: number);

/**
 *  停止背景音乐
 *  返回暂停的时间点
 */
declare function stopBgSound(): number;

/**
 * 销毁音乐，一般是关闭页面的时候调用
 */
declare function destorySound();

