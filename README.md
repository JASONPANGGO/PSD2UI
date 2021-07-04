# psd2ui 2.0 🚀

<div align=center>
    <img width=35% src=https://user-images.githubusercontent.com/37395391/123893634-5be1af80-d98f-11eb-9d87-8a751c34585d.png />
    </div>

- ⚙️ 使用 commander.js 规范参数传递
- 🚜 暴露 psd2ui 方法
- 📖 [设计师使用文档](http://playsmart.mintegral.com/doc/3.psd2ui/%20architect.html)
- 📖 [开发者注意事项](http://playsmart.mintegral.com/doc/3.psd2ui/developer.html)

---

## 使用

### 🛠 命令行直接使用

只有 -s [.psd 文件或包含 psd 目录路径] 是必传参数

```cmd
git clone git@gitlab.mobvista.com:playsmart/psd2ui.git

npm install

npm link .

psd2ui -s [psd文件或包含psd目录路径] -o [项目输出路径] -t [使用的模版项目路径] -n [导出的项目目录名称] -q [压缩质量（0-100）]

psd2ui -h 查看帮助
```

### 🧱 在项目中使用

package.json

```json
"script":{
    "psd2ui": "ssh://git@gitlab.mobvista.com:playsmart/psd2ui.git#master"
}
```

```cmd
yarn
```

```javascript
const { psd2ui } = require("psd2ui");

(async () => {
  await psd2ui({
    src: "./psd", // <----- .psd 或 目录地址
  });
})();
```

## 注意事项

- 如需使用横、竖屏自动化适配功能时，需传入横、竖版 psd 对应文件夹路径；
- 传入单个 psd 文件路径时，只转换对应横（或竖）版游戏场景，另一版需开发者自行适配（现大部分 PL 需横、竖屏适配，此方案一般用于工具开发者，开发新功能时调试使用）。
- 如过转换的过程中遇到 javascript heap out of memory 的报错，请尝试把 psd 文件上传到 [【稿定设计】在线 PhotoShop](https://ps.gaoding.com/#/) 中，不作任何操作，然后保存并下载到本地，再重新尝试。

## 原理流程

1. 复制模板项目 tempProject
   - 从 process.env.PLAYSMART_PATH 获取
   - 或 从项目中的 tempProject 获取
2. 解析 psd 文件获取图层树以及存储图片资源到新项目
   1. psd.tree()获取图层树包含位置大小等信息。
   2. 递归遍历树获取需要存储的资源并存储到 targetPackage.resources 数组中
      1. 在遍历的同时解析图层和目录命名，对节点做特殊处理
         1. cta 文件大小
         2. 指定存储路径到特定的资源文件夹
            1. start,game,end
            2. lang
            3. xlz
         3. 在节点中添加组件标识以在后续流程中挂载组件
      2. 遍历 targetPackage.resources 元素中的 pixelData 并存储资源
         1. png 转 jpg
         2. cta 图片尺寸处理
         3. 压缩图片大小（待办）
         4. 合并图层（待办）
      3. 存储完成后返回图层树
3. 得到图层树之后，根据节点属性生成场景节点
   1. UIImage
   2. UIText
   3. Node
4. 递归插入到对应的场景树的节点中去
   1. start（待办）
   2. gamePlay
   3. ending
5. 写入场景文件实现修改

## TODO

1. 组名为 xxx@merge 合并组内所有图层，导出单张图；[]
   1. psd.js 没有提供这个功能
   2. 通过 images 库和 psd 图层的位置关系手动合并。
2. 资源包体大小预估；[]
3. 同名资源，导出最大那张；[]
4. 旋转属性命名 r:90；[]
5. 导出图片缩放大小 s:0.9；[]
6. 图片重复平铺功能：[]
   1. 保留原高度，横向平铺；
   2. 保留原宽度，纵向平铺；
   3. 全屏重复平铺；
7. 序列帧自动切图，添加组件；[x]
8. 资源压缩功能；[x]

## 使用组件命名规则

- bg@**jpg**
- bg@**fixedWide**
- 同个图层使用多组特殊命名功能时，请使用中、英文分号 “`;`” 或 “`；`” 分开。如：bg@**jpg;fixedWide** 或 bg@**jpg；fixedWide**
- 所有@**功能名称`不区分大小写`**，可这么写：bg@**jpg** 或 bg@**JPG**；bg@**fixedWide** 或 bg@**fixedwide**

## 导出属性配置

> 调用转换 PSD 文件函数

```javascript
/** PS所有图层配置 */
let PsLayers = {};

/**
 * 转换PSD文件
 */
function convertPSD() {
  console.log("正在转换 PSD 文件...");
  PsLayers = convert.convertPSD(config.output + projectName);
  console.log("完成转换 PSD 文件");
  console.log("当前图层配置：", PsLayers);
}
```

> 获得当前图层配置：PsLayers

```json
{
  "children": [
    {
      "type": "group",
      "visible": true,
      "opacity": 1,
      "blendingMode": "normal",
      "name": "RadioButton_Small",
      "left": 753,
      "right": 894,
      "top": 333,
      "bottom": 382,
      "height": 49,
      "width": 141,
      "children": [
        {
          "type": "layer",
          "visible": true,
          "opacity": 1,
          "blendingMode": "normal",
          "name": "高画质 @title",
          "left": 787,
          "right": 863,
          "top": 343,
          "bottom": 368,
          "height": 25,
          "width": 76,
          "mask": {},
          "text": {
            "value": "高画质",
            "font": {
              "name": "AdobeHeitiStd-Regular",
              "sizes": [26, 26],
              "colors": [
                [255, 204, 153, 255],
                [255, 204, 153, 255]
              ],
              "alignment": ["center"]
            },
            "left": 0,
            "top": 0,
            "right": 0,
            "bottom": 0,
            "transform": {
              "xx": 1,
              "xy": 0,
              "yx": 0,
              "yy": 1,
              "tx": 825,
              "ty": 365
            }
          },
          "image": {}
        },
        {
          "type": "layer",
          "visible": true,
          "opacity": 1,
          "blendingMode": "normal",
          "name": "矩形 14 @up",
          "left": 753,
          "right": 894,
          "top": 333,
          "bottom": 382,
          "height": 49,
          "width": 141,
          "mask": {},
          "image": {},
          "src": "矩形 14 _up.png"
        }
      ]
    }
  ],
  "document": {
    "width": 1136,
    "height": 640,
    "resources": {
      "layerComps": [],
      "guides": [],
      "slices": []
    }
  }
}
```

---

## PlaySmart 场景描述文件 state

> data 内的数据都要序列化

```json
{
  "class": "qc.Node",
  "data": {
    "name": [7, "world"],
    "children": [
      {
        "class": "qc.UIRoot",
        "name": [7, "UIRoot"],
        "data": {
          "children": []
        }
      }
    ]
  },
  "dependences": {}
}
```

## 场景节点的 data

> 除了以下属性之外，每一个属性都是数组，[序列化的序号，属性值]

```json
{
  "position": [
    "pivotX",
    "pivotY",
    "anchoredX",
    "anchoredY",
    "x",
    "y",
    "width",
    "height",
    0,
    0,
    0,
    0,
    0,
    0, // 待研究
    "strechX",
    "strechY"
  ],
  "scripts": [],
  "children": [],
  "texture": [
    10,
    "resource/texture/bg.bin", // 相对路径
    "XbSxABQW5QcG072", // globalUrlMap
    0
  ]
}
```

## 生成

> qc-core-debug.js 9520

```javascript
/**
 * 序列化时所有支持的字段类型
 */
Serializer.AUTO = 0;
Serializer.INT = 1;
Serializer.INTS = 2; // 整数
Serializer.NUMBER = 3;
Serializer.NUMBERS = 4; // 数字
Serializer.BOOLEAN = 5;
Serializer.BOOLEANS = 6; // 布尔
Serializer.STRING = 7;
Serializer.STRINGS = 8; // 字符串
Serializer.MAPPING = 9; // 数值对，value为字符串
Serializer.TEXTURE = 10;
Serializer.TEXTURES = 11; // 图集（贴图）
Serializer.AUDIO = 12;
Serializer.AUDIOS = 13; // 音效
Serializer.COLOR = 14; // 颜色
Serializer.COLORS = 15; // 颜色数组
Serializer.PREFAB = 16;
Serializer.PREFABS = 17; // 预制
Serializer.NODE = 18;
Serializer.NODES = 19; // 场景节点
Serializer.SCRIPT = 20;
Serializer.SCRIPTS = 21; // 逻辑脚本
Serializer.GEOM = 22;
Serializer.GEOMS = 23; // 几何体，例如：点、线、矩形、圆等
Serializer.POINT = 24;
Serializer.POINTS = 25; // 点
Serializer.RECTANGLE = 26;
Serializer.RECTANGLES = 27; // 矩形
Serializer.CIRCLE = 28;
Serializer.CIRCLES = 29; // 圆
Serializer.ELLIPSE = 30;
Serializer.ELLIPSES = 31; // 椭圆
Serializer.FONT = 32; // 字体
Serializer.FONTS = 33;
Serializer.FILTER = 34;
Serializer.FILTERS = 35; // 着色器
Serializer.TEXTASSET = 36; // 文本资源
Serializer.TEXTASSETS = 37; // 文本资源数组
Serializer.EXCELASSET = 38; // Excel资源
Serializer.EXCELASSETS = 39; // Excel资源数组
Serializer.ACTION = 40; // action
Serializer.ACTIONMANAGER = 41; // action 管理器
Serializer.ANIMATOR = 42; // action 或 action管理器
Serializer.ANIMATORS = 43; // action 或 action管理器数组

/**
 * 打包一个Node节点
 * context为打包上下文信息
 */
Serializer.prototype.buildBundle = function (ob, context, json) {
  if (!context.dependences)
    // 初始化依赖项
    context.dependences = [];

  var meta = {};
  if (ob.getMeta) meta = ob.getMeta();
  json = json || {};
  for (var k in meta) {
    // 逐个字段序列化
    this.toJson(ob, json, context, k, ob[k], meta[k]);
  }

  // 返回object（这里不要打成字符串，免得递归调用时多次序列化，影响效率）
  return {
    class: ob.class,
    data: json,
    __json: ob.__json,
  };
};

/**
 * 合并依赖资源(Node节点需要进一步调度，将所有孩子的依赖整合到根节点中)
 */
Serializer.prototype.combineDependence = function (context) {
  var list = {};
  for (var i in context.dependences) {
    var atlas = context.dependences[i];
    if (!list[atlas.uuid]) list[atlas.uuid] = atlas;
  }
  return list;
};
```
