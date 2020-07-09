# PSD2UI

## TODO

1. 组名为 xxx@merge 合并组内所有图层，导出单张图；
   1. psd.js没有提供这个功能
2. 资源包体大小预估；

---

```cmd
npm install
```

```cmd
node PSD2UI.js [psd文件路径] //默认运行

node --inspect PSD2UI.js [psd文件路径] //使用浏览器运行

node --inspect-brk PSD2UI.js [psd文件路径] //使用浏览器运行，断点调试
```

> psd文件 -> xml树 -> layer树 -> 储存资源 -> layer树转换成node树（合并部分树）-> 树合成字符串写入文件


tempProject/ 为空白项目不要修改

输出项目位于output/

## 命名规则

Layout:
@L:top,P:topLeft
@L:bottomRight,P:bottom


## API


## 导出属性配置

> 调用转换PSD文件函数

```javascript
/** PS所有图层配置 */
let PsLayers = {}

/**
 * 转换PSD文件
 */
function convertPSD() {
    console.log('正在转换 PSD 文件...')
    PsLayers = convert.convertPSD(config.output + projectName)
    console.log('完成转换 PSD 文件')
    console.log('当前图层配置：', PsLayers);
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
              "sizes": [
                26,
                26
              ],
              "colors": [
                [
                  255,
                  204,
                  153,
                  255
                ],
                [
                  255,
                  204,
                  153,
                  255
                ]
              ],
              "alignment": [
                "center"
              ]
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


# PlaySmart 场景描述文件state

> data内的数据都要序列化

```json
{
    "class": "qc.Node",
    "data": {
        "name": [
            7, "world"
        ],
        "children": [{
            "class": "qc.UIRoot",
            "name": [
                7, "UIRoot"
            ],
            "data": {
                "children": []
            }
        }]
    },
    "dependences": {}
}
```

## 场景节点的data

> 除了以下属性之外，每一个属性都是数组，[序列化的序号，属性值]

```json
{
    "position":[
        "pivotX",
        "pivotY",
        "anchoredX",
        "anchoredY",
        "x",
        "y",
        "width",
        "height",
        0,0,0,0,0,0, // 待研究
        "strechX",
        "strechY"
    ],
    "scripts":[

    ],
    "children":[],
    "texture":[
        10,
        "resource/texture/bg.bin", // 相对路径
        "XbSxABQW5QcG072", // globalUrlMap
        0
    ]
}
```

```json

```


# 生成
> qc-core-debug.js 9520 
```javascript
    /**
     * 序列化时所有支持的字段类型
     */
    Serializer.AUTO = 0;
    Serializer.INT = 1;
    Serializer.INTS = 2;        // 整数
    Serializer.NUMBER = 3;
    Serializer.NUMBERS = 4;     // 数字
    Serializer.BOOLEAN = 5;
    Serializer.BOOLEANS = 6;    // 布尔
    Serializer.STRING = 7;
    Serializer.STRINGS = 8;     // 字符串
    Serializer.MAPPING = 9;     // 数值对，value为字符串
    Serializer.TEXTURE = 10;
    Serializer.TEXTURES = 11;   // 图集（贴图）
    Serializer.AUDIO = 12;
    Serializer.AUDIOS = 13;     // 音效
    Serializer.COLOR = 14;     // 颜色
    Serializer.COLORS = 15;     // 颜色数组
    Serializer.PREFAB = 16;
    Serializer.PREFABS = 17;    // 预制
    Serializer.NODE = 18;
    Serializer.NODES = 19;      // 场景节点
    Serializer.SCRIPT = 20;
    Serializer.SCRIPTS = 21;    // 逻辑脚本
    Serializer.GEOM = 22;
    Serializer.GEOMS = 23;      // 几何体，例如：点、线、矩形、圆等
    Serializer.POINT = 24;
    Serializer.POINTS = 25;     // 点
    Serializer.RECTANGLE = 26;
    Serializer.RECTANGLES = 27; // 矩形
    Serializer.CIRCLE = 28;
    Serializer.CIRCLES = 29;    // 圆
    Serializer.ELLIPSE = 30;
    Serializer.ELLIPSES = 31;   // 椭圆
    Serializer.FONT = 32;       // 字体
    Serializer.FONTS = 33;
    Serializer.FILTER = 34;
    Serializer.FILTERS = 35;    // 着色器
    Serializer.TEXTASSET = 36;  // 文本资源
    Serializer.TEXTASSETS = 37; // 文本资源数组
    Serializer.EXCELASSET = 38; // Excel资源
    Serializer.EXCELASSETS = 39; // Excel资源数组
    Serializer.ACTION = 40;  // action
    Serializer.ACTIONMANAGER = 41;  // action 管理器
    Serializer.ANIMATOR = 42;  // action 或 action管理器
    Serializer.ANIMATORS = 43;  // action 或 action管理器数组

    /**
     * 打包一个Node节点
     * context为打包上下文信息
     */
    Serializer.prototype.buildBundle = function (ob, context, json) {
        if (!context.dependences)
            // 初始化依赖项
            context.dependences = [];

        var meta = {};
        if (ob.getMeta)
            meta = ob.getMeta();
        json = json || {};
        for (var k in meta) {
            // 逐个字段序列化
            this.toJson(ob, json, context, k, ob[k], meta[k]);
        }

        // 返回object（这里不要打成字符串，免得递归调用时多次序列化，影响效率）
        return {
            class: ob.class,
            data: json,
            __json: ob.__json
        };
    };

    /**
     * 合并依赖资源(Node节点需要进一步调度，将所有孩子的依赖整合到根节点中)
     */
    Serializer.prototype.combineDependence = function (context) {
        var list = {};
        for (var i in context.dependences) {
            var atlas = context.dependences[i];
            if (!list[atlas.uuid])
                list[atlas.uuid] = atlas;
        }
        return list;
    };
```
