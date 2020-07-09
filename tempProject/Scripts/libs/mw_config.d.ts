/**
 * MTG提测选项配置描述文件
 * @file {mw_config.d.ts}
 * @description 提测选项配置说明
 */
declare namespace MW_CONFIG {
    /**
     * Mid {string}
     * @description 之前的mid，素材唯一标识；仓库系统上报接口中的唯一标识。
     */
    const MTGMaterialUUID: string;

    /**
     * M版本 {number}
     * @description 目前版本是2，以后升级版本再增加
     */
    const MTGMaterialVersion: number;

    /**
     * 素材类型 {string}
     * @description 目前只有playable/endcard两个值。只有playable才支持storekit
     */
    const type: "playable" | "endcard";

    /**
     * 配置sk/全局可点 {number} 0:不配置 1:配置sk 2:配置全局可点
     * @description 0:代表不配置，1:代表游戏结束跳到下载页面，2:代表游戏结束点击屏幕跳转下载页面
     */
    const storekit: 0 | 1 | 2;

    /**
     * 是否为测试中 {boolean}
     * @description 如果测试通过,该值为false
     */
    const is_test: boolean;

    /**
     * 关闭时间 {number}
     * @description 关闭按钮显示的时间，单位为秒；如果类型为playable，关闭时间会跟ad type和storekit有关。
     */
    const close_time: number;

    /**
     * 测试版本
     * @description 当前的测试版本，页面会自动打印当前的测试版本，测试可以通过查看此值判断是否素材为缓存数据。
     */
    const version: number;

    /**
     * 是否强制竖屏 {boolean}
     * @description 当提测中选择展示方向为竖屏的时候，该值为true；主要处理强制转屏的情况下logo、loading的放置方向
     */
    const alway_portrait: boolean;

    /**
     * 是否强制横屏 {boolean}
     * @description 当提测中选择展示方向为横屏的时候，该值为true；主要处理强制转屏的情况下logo、loading的放置方向
     */
    const alway_landscape: boolean;

    /**
     * Logo水印位置 {string} "left":左  "center":中  "right":右
     * @description logo放置位置，值有"left","center","right"三个值。控制logo放置的位置
     */
    const logo_position: "left" | "center" | "right";

    /**
     * 屏幕信息 {Object}
     * @description sdk触发webviewshow事件 返回的screen_info
     */
    const end_screen_info: Object;

    /**
     * 适用渠道
     * @description 提测中选择的适用渠道
     */
    const channel: "m" | "dsp" | "fb" | "google" | "unity" | "vungle" | "applovin" | "csj" | "toutiao" | "ironsource";

    /**
     * App名称
     * @description 提测中填充的app name
     */
    const app_name: string;

    /**
     * App图标
     * @description 提测中上传/抓取的app图标，返回100x100尺寸图片的base64
     */
    const app_icon: string;

    /**
     * 渲染模式 {string} "1":前置渲染 "2":后置渲染  默认前置渲染
     * @default 提测中勾选的渲染模式
     */
    const render_type: "1" | "2";
}