/*
 * 解析psd文件并保存图片资源
 */

"use strict";

const PSD = require("psd");
const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const config = require("./config");
const util = require("./util");
const images = require("images");
const {
	PNG
} = require("pngjs");
var RootLayers;
var targetPackage;

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
		let option = 0;
		let buildId = genBuildId();

		// 获取资源放置路径
		var resourceDirectory = path.join(outputFileDir, config.resource);
		var textureDirectory = path.join(resourceDirectory, "game");

		// 清空texture原有的资源
		// fs.emptyDirSync(textureDirectory);

		// 获取psd文件并解析
		var psd = PSD.fromFile(psdFile);
		psd.parse();

		// 创建资源包
		targetPackage = new UIPackage(outputFileDir, buildId);
		targetPackage.exportOption = option;

		// 开始转换psd节点树
		convertNodes(psd.tree());


		// 保存图片资源
		Promise.all(targetPackage.resources.map(item => savePng(item))).then(() => {
			resolve(RootLayers);
		})
	});
};

function savePng(item) {
	return new Promise((saveResolve, saveReject) => {
		// 需要合并的图层pixelData数组
		if (Array.isArray(item)) {
			// item.forEach(child => {
			// 	loadPixelData(child)
			// })
		} else if (item.type !== "image") saveReject()
		// 获取图片资源需要存储到的目标路径
		const fileUrl = path.join(
			targetPackage.basePath,
			config.resource,
			util.tranSrc(item)
		);
		const pixelData = item.data.layer.image.pixelData;
		loadPixelData(
				pixelData,
				item.data.width,
				item.data.height,
				item
			)
			.then((buffer) => {
				// 图片资源特殊处理
				if (item.suffix === "jpg") {
					const img = images(buffer);
					img.save(fileUrl, "jpg");
				} else if (item.name.match(/cta/)) {
					const ctaWidth = 620;
					const ctaHeight = 250;
					const img = images(buffer);
					images(ctaWidth, ctaHeight)
						.drawImage(
							img,
							(ctaWidth - img.width()) / 2,
							(ctaHeight - img.height()) / 2
						)
						.save(fileUrl);
				} else {
					fs.writeFileSync(fileUrl, buffer);
				}
				saveResolve()
			})
			.catch(() => {
				item.data.saveAsPng(fileUrl).then(() => {
					saveResolve()
					console.log(`${item.name}转换失败，已存储成png`);
				})
			});

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
	RootLayers = tree.export();
	var cnt = tree.children().length;
	for (var i = cnt - 1; i >= 0; i--) {
		parseNode(tree.children()[i], RootLayers.children[i]);
	}
}

/**
 * 创建资源文件，主要是图片
 * @param {string} belongScene
 * @param {string} type
 * @param {string} name 资源名
 * @param {string} suffix 后缀名
 * @param {*} data
 */
function createPackageItem(belongScene, type, name, suffix, data) {
	var dataForHash;
	if (type == "image")
		//data should be a psd layer
		dataForHash = Buffer.from(data.get("image").pixelData);
	else dataForHash = data;
	var hash = crypto.createHash("md5").update(dataForHash).digest("hex");
	var item = targetPackage.sameDataTestHelper[hash];
	if (!item) {
		item = {};
		item.type = type;
		item.id = targetPackage.getNextItemId();

		// var i = fileName.lastIndexOf('.');
		// var basename = fileName.substr(0, i);
		// var ext = fileName.substr(i);
		// basename = basename.replace(/[\@\'\"\\\/\b\f\n\r\t\$\%\*\:\?\<\>\|]/g, '_');
		// basename = basename.trim()

		let basename = name.trim(); //去除前后空格
		while (true) {
			var j = targetPackage.sameNameTestHelper[basename];
			if (j == undefined) {
				targetPackage.sameNameTestHelper[basename] = 1;
				break;
			} else {
				targetPackage.sameNameTestHelper[basename] = j + 1;
				basename = basename + "_" + j;
			}
		}
		// fileName = basename + ext;
		const fileName = `${name}.${suffix}`;
		item.name = fileName;
		item.basename = basename;
		item.suffix = suffix;
		item.data = data;
		item.belongScene = belongScene
		targetPackage.resources.push(item);
		targetPackage.sameDataTestHelper[hash] = item;
	}

	return item;
}

/**
 * 遍历psd节点如果是图片就保存资源，以及特殊处理
 * @param {*} psdNode
 * @param {*} layers
 * @param {string} belongScene 所属场景start,game,end
 */
function parseNode(psdNode, layers, belongScene) {
	if (config.onlyVisible && !psdNode.layer.visible) return;

	var child;
	var packageItem;

	const nodeName = psdNode.get("name");
	let name = nodeName;
	// 通过图层名称判断可以做特殊处理
	if (name.match("@")) {
		layers.script = {};
		let temp = name.split("@");
		let scripts = temp[1].split(",");
		name = temp[0];
		// name@p:topLeft,l:right
		const DIR = ["top", "left", "right", "bottom"];
		const DefDistance = 30;
		// name@fixedWide,showAll
		/**
		 * Four modes to resize the node
		 * @type {number}
		 */
		const AspectRatioFitter = {
			NONE: 0,
			WIDTH_CONTROLS_HEIGHT: 1,
			HEIGHT_CONTROLS_WIDTH: 2,
			FIT_IN_PARENT: 3,
			ENVELOPE_PARENT: 4,
		};
		const ScaleMode = {
			showall: AspectRatioFitter.FIT_IN_PARENT,
			fixedwide: AspectRatioFitter.ENVELOPE_PARENT,
		};

		layers.script["Layout"] = {
			ldef: "",
			pdef: "",
		};
		scripts.forEach((string) => {
			// Layout 适配组件
			const hash = string.split(":");
			if (hash.length >= 2) {
				let key = hash[0].toString().toLowerCase();
				let data = hash[1].toString().toLowerCase();
				let layoutData = [];
				if (key === "l") {
					// landscape
					key = "ldef";
				} else if (key === "p") {
					// portrait
					key = "pdef";
				} else {
					throw new Error(
						`图层：“${nodeName}”中，适配屏幕方向值：“${hash[0]}”有误！！！`
					);
				}
				DIR.forEach((d) => {
					if (data && data.match(d)) {
						layoutData.push(`${d}:${DefDistance}`);
						data = data.split(d).join("");
					}
				});
				// 查找完如果还有字符串
				if (data) {
					throw new Error(
						`图层：“${nodeName}”中，适配方向值：“${hash[1]}”中“${data}”写法有误！！！`
					);
				}
				if (layoutData.length === 1) {
					if (
						layoutData[0] === `left:${DefDistance}` ||
						layoutData[0] === `right:${DefDistance}`
					) {
						layoutData.push("centerY:0");
					} else {
						layoutData.push("centerX:0");
					}
				}
				layers.script["Layout"][key] = layoutData.join(",");
			} else {
				// 组名为 xxx@merge 合并组内所有图层，导出单张图
				if (psdNode.isGroup())
					layers.isMerge = string.toLowerCase() === "merge";

				// 图片资源后缀
				if (!psdNode.isEmpty())
					layers.suffix =
					string.toLowerCase() === "jpg" ? "jpg" : "png";

				// 宽高比适配器
				if (Object.keys(ScaleMode).includes(string.toLowerCase())) {
					layers.script["AspectRatioFitter"] = ScaleMode[string.toLowerCase()];
				}
			}
		});
	}

	// 如果是组就判断组件类型
	if (psdNode.isGroup()) {
		layers.isMerge = !!layers.isMerge;
		if (['start', 'game', 'ending'].includes(name)) {
			belongScene = name
		}
		// if (!layers.isMerge) {
		if (layers.isMerge) {
			const mergeDataArray = []
			psdNode.children().forEach(child => {
				if (!child.isEmpty()) {
					mergeDataArray.push(child.get("image").pixelData)
				}
			})
			targetPackage.resources.push(mergeDataArray)
		} else {
			const length = psdNode.children().length;
			for (let i = length - 1; i >= 0; i--)
				parseNode(psdNode.children()[i], layers.children[i], belongScene);
		}
		// } else {
		//     if (!layers.suffix) layers.suffix = 'png'
		//     packageItem = createPackageItem('image', name, layers.suffix, psdNode)
		//     layers.src = packageItem.name
		// }
	} else {
		// 不是组的话判断是图片还是文本
		const typeTool = psdNode.get("typeTool");
		if (typeTool) {
			layers.type = "text";
			// console.log(typeTool)
		} else if (!psdNode.isEmpty()) {
			if (!layers.suffix) layers.suffix = "png";
			packageItem = createPackageItem(
				belongScene,
				"image",
				name,
				layers.suffix,
				psdNode
			);

			layers.src = util.tranSrc({
				belongScene: belongScene,
				name: layers.name + `.${layers.suffix}`
			});
			// console.log(psdNode);
		}
	}

	return child;
}

//==================== util =====================

function genBuildId() {
	var magicNumber = Math.floor(Math.random() * 36)
		.toString(36)
		.substr(0, 1);
	var s1 = "0000" + Math.floor(Math.random() * 1679616).toString(36);
	var s2 = "000" + Math.floor(Math.random() * 46656).toString(36);
	var count = 0;
	for (var i = 0; i < 4; i++) {
		var c = Math.floor(Math.random() * 26);
		count += Math.pow(26, i) * (c + 10);
	}
	count +=
		Math.floor(Math.random() * 1000000) +
		Math.floor(Math.random() * 222640);

	return (
		magicNumber +
		s1.substr(s1.length - 4) +
		s2.substr(s2.length - 3) +
		count.toString(36)
	);
}