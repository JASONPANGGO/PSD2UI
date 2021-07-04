const path = require('path')

module.exports = {
    input: null,
    output: 'output/',
    tempProjectName: path.join(process.env.PLAYSMART_PATH, 'tempProject/'),
    projectName: 'PSD2UI_' + Date.now(),
    globalUrlMap: 'Assets/meta/globalUrlMap.js',
    resource: 'resource/',
    start: 'resource/start/',
    game: 'resource/game/',
    ending: 'resource/ending/',
    startPrefab: 'resource/start/start.prefab',
    gamePlayState: 'resource/scene/gamePlay.state',
    endingPrefab: 'resource/ending/ending.prefab',
    project_setting: 'ProjectSetting/project.setting',
    scene_editor: 'Temp/scene_editor.state',

    /** 只导出显示的图层 */
    onlyVisible: false,
    /** 所有节点锚点设置为中心点 */
    allPivotCenter: true,
    /** 自动识别图层启用多语言系统 */
    autoUseLanguages: true,
    /** 所有节点以centerX、centerY做适配 */
    allLayoutCenterXY: false,

    // 默认压缩质量（0-100）
    autoCompress: false,
    quality: 80,

    // 判断是否ps项目的flag，用于处理playsmart平台所需的特殊处理
    isPlaysmart: false,

    traceheap: false,

    logs: false
}