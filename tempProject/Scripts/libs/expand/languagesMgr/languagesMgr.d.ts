/**
 * 多语言系统接口，描述文件
 * @version 当前版本: 1.2.3
 * @description 多语言自适应Playable，所有处理接口管理器
 * @author JingBin.Zhu
 */
declare namespace languagesMgr {

	/** 当前使用语言 */
	const language: string;

	/**
	 * 获取资源
	 */
	const getRes: () => JSON;

	/**
	 * 获取当前使用语言
	 */
	const getLang: () => string;

	/** 
	 * 获取对应语言版本文案
	 * @param {string} key 对应文案，配置中的key
	 * @param {string} lang 语言
	 */
	const getLangCfg: (key: string, lang: string) => { value: string, style: { fontSize: number, color: string, stroke: number, strokeColor: string, bold: boolean, italic: boolean } };

	/** 
	 * 获取当前语言版本文案
	 * @param {string} key 对应文案，配置中的key
	 */
	const getCfg: (key: string) => { value: string, style: { fontSize: number, color: string, stroke: number, strokeColor: string, bold: boolean, italic: boolean } };

	/**
	 * 根据配置中的key，更新当前文本标签
	 * @param {eui.Label|Laya.Label|laya.display.Text|qc.UIText|Phaser.Text} label 需要更新的文本标签
	 * @param {string} key 对应文案，配置中的key
	 */
	const updateLabel: (label, key: string) => void;

	/**
	 * 根据图片名称前缀，更新当前图片组件
	 * @param {eui.Image} image 需要更新的图片组件
	 */
	const updateImage: (image) => void;

}