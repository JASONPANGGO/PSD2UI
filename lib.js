/*
 * 解析psd文件并保存图片资源
 */

"use strict";

const PSD = require("psd");
const fs = require("fs-extra");
const path = require("path");
const config = require("./config");
const util = require("./util");
const images = require("images");
const {
	PNG
} = require("pngjs");
const { compressImg, traceMemory, drawCanvas } = require("./util");
const { resolvePSDfromDir, resolveStage, resolveGroup, resolveLayersType } = require('./playsmart')
const { createCanvas, Image } = require('canvas');

let RootLayers;
let targetPackage;
let isDirectory = false;



/**
 * 把psd文件转换成json格式并拆分图片资源
 * @param {string} psdFile psd文件路径
 * @param {string} outputFile 可选项，输出文件路径
 * @param {integer} option psd2fgui 设置项
 * @param {string} buildId 可选项 可以设置同一个buildId来替换资源
 * @return {Promise} 返回输出路径
 */
exports.convert = function (psdFile, outputFileDir) {
	return new Promise(function (resolve, reject) {
		let buildId = util.genBuildId();

		// 获取资源放置路径
		let resourceDirectory = path.join(outputFileDir, config.resource);
		let textureDirectory = path.join(resourceDirectory, "game");

		// 清空texture原有的资源
		if (!config.isPlaysmart) fs.emptyDirSync(textureDirectory);

		let tree
		// 获取psd文件并解析
		if (fs.statSync(psdFile).isDirectory()) {
			isDirectory = true
			let ret = resolvePSDfromDir(psdFile)
			tree = ret.tree
			RootLayers = ret.RootLayers
		} else {
			const psd = PSD.fromFile(psdFile);
			psd.parse()
			tree = psd.tree()
			RootLayers = tree.export()
		}

		validatePsd(RootLayers)

		// 创建资源包
		targetPackage = new UIPackage(outputFileDir, buildId);

		// 开始转换psd节点树
		convertNodes(tree);

		console.log('需要保存的所有图片： ', targetPackage.sameNameTestHelper);

		// 保存图片资源
		// Promise.all(targetPackage.resources.map((item, index) => savePng(item, index))).then(() => {
		// 	resolve(RootLayers);
		// }).catch(err => {
		// 	throw err
		// })
		Promise.all(targetPackage.resources).then(() => {
			resolve(RootLayers);
		}).catch(err => {
			console.log(err);
		})
	}).catch(err => {
		console.log(err);
	})
};

function validatePsd(rootLayers) {
	const rootGroupNames = Object.values(rootLayers.children).map(layer => layer.name)
	const VALIDATE_GROUPS = ['start', 'game', 'ending']
	if (!rootGroupNames.every(name => VALIDATE_GROUPS.includes(name))) {
		throw new Error(`psd文件的根组必须是${VALIDATE_GROUPS}！当前是${rootGroupNames.join(' ')}`)
	}
	return true
}


function savePng(item, index) {
	return new Promise(async (saveResolve, saveReject) => {

		traceMemory()

		fs.ensureDirSync(path.join(targetPackage.basePath, config.resource, item.stage))

		if (item.type !== "image") {
			saveReject()
			return
		}

		// 获取图片资源需要存储到的目标路径
		const fileUrl = path.join(
			targetPackage.basePath,
			config.resource,
			util.tranSrc(item)
		).replace(/\\/g, '/')
		const i = fileUrl.lastIndexOf('/')
		if (i !== -1) fs.ensureDirSync(fileUrl.slice(0, i))

		const pixelData = item.data.layer.image.pixelData;

		if (item.size) {
			// 序列帧
			const buffer = await loadPixelData(pixelData, item.data.width, item.data.height, item)
			let canvas = drawCanvas({
				width: item.size.width,
				height: item.size.height,
				x: item.size.x,
				y: item.size.y,
				buffer
			})
			let readStream
			if (item.suffix === 'jpg') {
				readStream = canvas.createJPEGStream()
			} else {
				readStream = canvas.createPNGStream()
			}
			readStream.pipe(fs.createWriteStream(fileUrl)).on('close', () => {
				saveResolve()
				// item.data = null
				// canvas = null
			})
		} else if (item.suffix === 'jpg') {
			// jpg
			const buffer = await loadPixelData(pixelData, item.data.width, item.data.height, item)
			let img = images(buffer)
			img.save(fileUrl, "jpg")

			saveResolve()
			// img = null
			// item.data = null
		} else if (item.name.match(/cta/)) {
			// cta
			const buffer = await loadPixelData(pixelData, item.data.width, item.data.height, item)
			const ctaWidth = 620
			const ctaHeight = 250
			let canvas = drawCanvas({
				width: ctaWidth,
				height: ctaHeight,
				buffer,
				x: (ctaWidth - item.data.width) / 2,
				y: (ctaHeight - item.data.height) / 2
			})
			let readStream
			if (item.suffix === 'jpg') {
				readStream = canvas.createJPEGStream()
			} else {
				readStream = canvas.createPNGStream()
			}
			readStream.pipe(fs.createWriteStream(fileUrl)).on('close', () => {
				saveResolve()
				// item.data = null
				// canvas = null
			})
		} else {
			console.log(fileUrl);
			// 普通情况
			item.data.saveAsPng(fileUrl).then(() => {
				saveResolve()
				// item.data = null
			}).catch(() => {
				saveResolve()
			})
		}

	}).catch(err => {
		console.log(err);
		// throw err
	})
}

/**
 * 把图层的pixelData转换成Buffer
 * @param {Array} pixelData
 * @param {number} width
 * @param {number} height
 */
function loadPixelData(pixelData, width, height, item) {
	return new Promise((res, rej) => {
		const png = new PNG({
			filterType: 4,
			width: width,
			height: height,
		});
		png.data = pixelData;
		res(PNG.sync.write(png));
	}).catch((err) => {
		console.log(err);
		rej();
	});
}

/**
 * 生成资源包
 * @param {string} basePath 输出路径
 * @param {string} buildId
 */
function UIPackage(basePath, buildId) {
	this.id = buildId.substr(0, 8);
	this.itemIdBase = buildId.substr(8);
	this.nextItemIndex = 0;
	this.getNextItemId = function () {
		return this.itemIdBase + (this.nextItemIndex++).toString(36);
	};

	this.basePath = basePath;
	fs.ensureDirSync(basePath);

	this.resources = [];
	this.sameDataTestHelper = {};
	this.sameNameTestHelper = {};
}

/**
 * 转换psd节点树
 * @param {Object} tree psd.tree()
 */
function convertNodes(tree) {
	for (let i = tree.children().length - 1; i >= 0; i--) {
		parseNode(tree.children()[i], RootLayers.children[i], "game");
	}
}

/**
 * 创建资源文件，主要是图片
 * @param {string} stage 环节 start, game, end
 * @param {string} type 资源类型
 * @param {string} name 资源名
 * @param {string} suffix 后缀名
 * @param {Object} size 自定义x渲染尺寸的对象
 * @param {string} group 组合 group_xxx
 * @param {*} data
 */
function createPackageItem(stage, type, name, suffix, data, size, group) {
	const uniqueName = path.join(stage || 'game', group || '', name)
	if (targetPackage.sameNameTestHelper[uniqueName]) return
	targetPackage.sameNameTestHelper[uniqueName] = true
	const item = {
		id: targetPackage.getNextItemId(),
		name: `${name}.${suffix}`,
		basename: util.formatStr(name),
		type,
		suffix,
		data,
		stage,
		size,
		group
	}

	targetPackage.resources.push(savePng(item));
}



/**
 * 根据命名处理结点以添加特殊功能
 * @param {string} name 
 * @param {*} psdNode
 * @param {*} layers 
 */
function resolveName(name, layers) {
	const nameAnalyzer = require("./resolveName")
	if (!isDirectory) nameAnalyzer.resolveCTA(name, layers)
	if (!nameAnalyzer.checkResovable(name)) return false
	layers.script = {}
	// 组件只使用 “;|；” 分开。不用 “,|，” 是因为适配组件 ps.Layout 用 “,|，” 区分横竖屏
	name.split("@")[1].split(/\s*(;|；)\s*/).forEach(string => {
		// console.log(name, string)
		nameAnalyzer.resolveAspectRatioFitter(string, layers)
		if (!layers.hasAspectRatio) nameAnalyzer.resolveLayout(string, layers)
		nameAnalyzer.resolveLanguages(string, layers)
		nameAnalyzer.resolveSuffix(string, layers)
		nameAnalyzer.resolveSize(string, layers)
		nameAnalyzer.resolveXLZ(string, layers)
	})
	return true
}

/**
 * 遍历psd节点如果是图片就保存资源，以及特殊处理
 * @param {*} psdNode PSD图层结点
 * @param {*} layers 图层树
 * @param {string} stage 环节 start, game, end
 * @param {string} group 组合 group_xxx
*/
function parseNode(psdNode, layers, stage, group) {
	if (config.onlyVisible && !psdNode.layer.visible) return;
	if (!layers) return
	let nodeName = util.formatStr(layers.name) // psdNode.get("name");

	traceMemory()

	// 判断图层类型 -> layer,group,text
	const layersType = resolveLayersType(psdNode, layers)

	// 判断名称 -> layers.script, layers.suffix, cta
	const hasSpecialName = resolveName(nodeName, layers)
	if (hasSpecialName) {
		nodeName = nodeName.split("@")[0]
		layers.name = nodeName
	}

	// 根据不同结点类型对layers做不同处理
	switch (layersType) {
		case "group":
			stage = resolveStage(nodeName, stage)
			group = resolveGroup(nodeName, group)

			const psdChildren = psdNode.children();
			for (let i = layers.children.length - 1; i >= 0; i--) {
				parseNode(psdChildren[i], layers.children[i], stage, group);
			}
			break;
		case "text":

			break;
		case "layer":
			if (!layers.suffix) layers.suffix = "png"
			createPackageItem(
				stage,
				"image",
				nodeName,
				layers.suffix,
				psdNode,
				layers.size,
				group
			)
			layers.src = util.tranSrc({
				stage: stage,
				group: group,
				name: nodeName + `.${layers.suffix}`
			})
			break;

		default:
			break;
	}

}