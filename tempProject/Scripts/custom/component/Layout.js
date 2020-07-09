var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ps;
(function (ps) {
    /** 布局属性优先级，先调整尺寸，再进行对齐 */
    var layoutPriority = ["x", "y", "rotation", "width", "height", "scaleXY", "scaleX", "scaleY",
        "left", "right", "top", "bottom", "centerX", "centerY", "percX", "percY"];
    /**
     * 布局组件
     * @author VaMP
     */
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.inited = false;
            _this.autoSize = false;
            _this.serializableFields = {
                autoSize: qc.Serializer.BOOLEAN,
                left: qc.Serializer.STRING,
                top: qc.Serializer.STRING,
                right: qc.Serializer.STRING,
                bottom: qc.Serializer.STRING,
                centerX: qc.Serializer.STRING,
                centerY: qc.Serializer.STRING,
                percX: qc.Serializer.STRING,
                percY: qc.Serializer.STRING,
                scaleXY: qc.Serializer.STRING,
                layout: qc.Serializer.MAPPING,
            };
            /** 默认布局数据 */
            _this.layoutDef = new LayoutData;
            /** 布局数据 */
            _this.layout = {
                pdef: "", pipx: "", ppad: "",
                ldef: "", lipx: "", lpad: ""
            };
            _this.layoutData = {};
            _this.runInEditor = true;
            // Init the behaviour
            _this.addListener(gameObject.onRelayout, _this.refresh, _this);
            return _this;
        }
        /**
         * 设置布局
         * @param obj 要布局的对象
         * @param key 要设置的属性,left,right,top,bottom等
         * @param value 值
         */
        Layout.setLayout = function (obj, key, value) {
            //关键字pw为父亲宽度，ph为母亲宽度
            if (value === "pw")
                value = obj.parent.width;
            if (value === "ph")
                value = obj.parent.height;
            value = ps.Mathf.parseNumber(value);
            var realWidth = obj.width * obj.scaleX;
            var realHeight = obj.height * obj.scaleY;
            var offsetX = obj.pivotX * realWidth;
            var offsetY = obj.pivotY * realHeight;
            var parentWidth = obj.parent.width;
            var parentHeight = obj.parent.height;
            var offsetParentX = obj.parent.pivotX * parentWidth;
            var offsetParentY = obj.parent.pivotY * parentHeight;
            switch (key) {
                case "left":
                    obj.x = offsetX - offsetParentX + value;
                    break;
                case "top":
                    obj.y = offsetY - offsetParentY + value;
                    break;
                case "right":
                    if (obj.parent)
                        obj.x = obj.parent.width - realWidth + offsetX - offsetParentX - value;
                    break;
                case "bottom":
                    if (obj.parent)
                        obj.y = obj.parent.height - realHeight + offsetY - offsetParentY - value;
                    break;
                case "centerX":
                    if (obj.parent)
                        obj.x = (obj.parent.width - realWidth) / 2 + offsetX - offsetParentX + value;
                    break;
                case "centerY":
                    if (obj.parent)
                        obj.y = (obj.parent.height - realHeight) / 2 + offsetY - offsetParentY + value;
                    break;
                case "percX":
                    if (obj.parent)
                        obj.x = (obj.parent.width - realWidth) * value + offsetX - offsetParentX;
                    break;
                case "percY":
                    if (obj.parent)
                        obj.y = (obj.parent.height - realHeight) * value + offsetY - offsetParentY;
                    break;
                case "scaleX":
                    obj.scaleX = value;
                    break;
                case "scaleY":
                    obj.scaleY = value;
                    break;
                case "scaleXY":
                    obj.scaleX = value;
                    obj.scaleY = value;
                    break;
                //--------------------------------------------------------------
                case "x":
                    obj.x = value;
                    break;
                case "y":
                    obj.y = value;
                    break;
                case "rotation":
                    obj.rotation = ps.Mathf.angleToRadian(value);
                    break;
                case "width":
                    obj.width = value;
                    break;
                case "height":
                    obj.height = value;
                    break;
            }
        };
        Layout.prototype.awake = function () {
            //因为做动画需要
            // if (this.scaleXY === undefined || this.scaleXY === null)
            //     this.scaleXY = this.gameObject.scaleX;
            //初始化参数
            for (var key in this.layout) {
                var data = this.parseData(this.layout[key]);
                if (!data)
                    continue;
                this.layoutData[key] = data;
                var keys = Object.keys(data);
                //检测配置的布局数据是否合法
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key_1 = keys_1[_i];
                    if (layoutPriority.indexOf(key_1) < 0) {
                        console.error("\u5BF9\u8C61\u540D\uFF1A" + this.gameObject.name + "  \u9519\u8BEF\uFF1A\u5E03\u5C40\u53C2\u6570\u91CC\u4E0D\u5B58\u5728\"" + key_1 + "\"");
                    }
                }
            }
            this.inited = true;
            this.refresh();
        };
        Layout.prototype.onEnable = function () {
            this.refresh();
        };
        /**
         * 获取布局数据
         * @param otype
         * @param mtype
         */
        Layout.prototype.getData = function (otype, mtype) {
            if (otype === void 0) { otype = "def"; }
            if (mtype === void 0) { mtype = "def"; }
            return this.layoutData[otype + mtype];
        };
        Object.defineProperty(Layout.prototype, "left", {
            get: function () {
                return this.layoutDef.left;
            },
            set: function (v) {
                this.layoutDef.left = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "top", {
            get: function () {
                return this.layoutDef.top;
            },
            set: function (v) {
                this.layoutDef.top = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "right", {
            get: function () {
                return this.layoutDef.right;
            },
            set: function (v) {
                this.layoutDef.right = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "bottom", {
            get: function () {
                return this.layoutDef.bottom;
            },
            set: function (v) {
                this.layoutDef.bottom = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "centerX", {
            get: function () {
                return this.layoutDef.centerX;
            },
            set: function (v) {
                this.layoutDef.centerX = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "centerY", {
            get: function () {
                return this.layoutDef.centerY;
            },
            set: function (v) {
                this.layoutDef.centerY = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "percX", {
            get: function () {
                return this.layoutDef.percX;
            },
            set: function (v) {
                this.layoutDef.percX = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "percY", {
            get: function () {
                return this.layoutDef.percY;
            },
            set: function (v) {
                this.layoutDef.percY = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layout.prototype, "scaleXY", {
            get: function () {
                return this.layoutDef.scaleXY;
            },
            set: function (v) {
                this.layoutDef.scaleXY = ps.Mathf.parseNumber(v);
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        //===========================================================
        /** 刷新布局 */
        Layout.prototype.refresh = function () {
            if (!this.inited)
                return;
            if (!this.enable)
                return;
            var curData = this.layoutDef.clone();
            if (ps.ScrFix.isP) {
                curData.merge(this.getData("p", "def"));
                if (ps.ScrFix.isIPX) {
                    curData.merge(this.getData("def", "ipx"));
                    curData.merge(this.getData("p", "ipx"));
                }
                else if (ps.ScrFix.isPAD) {
                    curData.merge(this.getData("def", "pad"));
                    curData.merge(this.getData("p", "pad"));
                }
            }
            else {
                curData.merge(this.getData("l", "def"));
                if (ps.ScrFix.isIPX) {
                    curData.merge(this.getData("def", "ipx"));
                    curData.merge(this.getData("l", "ipx"));
                }
                else if (ps.ScrFix.isPAD) {
                    curData.merge(this.getData("def", "pad"));
                    curData.merge(this.getData("l", "pad"));
                }
            }
            this.useData(curData);
        };
        /** 使用布局数据 */
        Layout.prototype.useData = function (data) {
            if (this.autoSize) {
                this.gameObject.width = this.gameObject.parent.width;
                this.gameObject.height = this.gameObject.parent.height;
            }
            //根据优先级设置数据
            for (var _i = 0, layoutPriority_1 = layoutPriority; _i < layoutPriority_1.length; _i++) {
                var key = layoutPriority_1[_i];
                var v = data[key];
                if (v != undefined && (!isNaN(v) || typeof (v) === "string")) {
                    Layout.setLayout(this.gameObject, key, v);
                }
            }
        };
        //===========================================================
        /**
         * 把字符串转换为LayoutData
         * @param rawdata 原始数据（字符串)
         */
        Layout.prototype.parseData = function (rawdata) {
            if (rawdata === undefined || rawdata === null || rawdata === "")
                return;
            var propertys = rawdata.split(",");
            var obj = new LayoutData;
            for (var _i = 0, propertys_1 = propertys; _i < propertys_1.length; _i++) {
                var item = propertys_1[_i];
                var a = item.split(":");
                obj[a[0]] = a[1];
            }
            return obj;
            // rawdata = "{\"" + rawdata + "}";
            // rawdata = rawdata.replace(/,/g, ",\"");
            // rawdata = rawdata.replace(/:/g, "\":");
            // let obj2 = JSON.parse(rawdata);
            // return obj2;
        };
        return Layout;
    }(qc.Behaviour));
    ps.Layout = Layout;
    qc.registerBehaviour('ps.Layout', Layout);
    Layout["__menu"] = 'Custom/Layout';
    /** 布局数据 */
    var LayoutData = /** @class */ (function () {
        function LayoutData() {
        }
        /**
         * 克隆布局数据
         */
        LayoutData.prototype.clone = function () {
            var newData = new LayoutData();
            for (var _i = 0, layoutPriority_2 = layoutPriority; _i < layoutPriority_2.length; _i++) {
                var key = layoutPriority_2[_i];
                if (this[key] != undefined)
                    newData[key] = this[key];
            }
            return newData;
        };
        /**
         * 合并布局数据
         * @param data 要合并的数据
         */
        LayoutData.prototype.merge = function (data) {
            if (data) {
                var keys = Object.keys(data);
                for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                    var key = keys_2[_i];
                    this[key] = data[key];
                }
            }
        };
        return LayoutData;
    }());
    ps.LayoutData = LayoutData;
})(ps || (ps = {}));
