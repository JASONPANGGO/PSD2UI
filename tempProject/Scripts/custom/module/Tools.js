/**
 * 拓展工具模块
 */
var ps;
(function (ps) {
    var Tools;
    (function (Tools) {
        /**
         * 把当前对象坐标系转换到目标对象坐标系
         * @param current 当前对象
         * @param target 目标对象
         * @param point 坐标点
         */
        function transPos(current, target, point) {
            if (point === void 0) { point = new qc.Point; }
            var pos = new qc.Point(current.x + point.x, current.y + point.y);
            pos = current.parent.toGlobal(pos);
            pos = target.parent.toLocal(pos);
            return pos;
        }
        Tools.transPos = transPos;
        /**
         * 检测对象是否为空
         * @param {Object} obj 待检测对象
         * @returns {boolean} 对象是否为空（包含{}、对象里所有val都为空）
         */
        function objIsNull(obj) {
            if (!obj || obj === "{}" || ps.Tools.jsonToStr(obj) === "{}") {
                return true;
            }
            for (var key in obj) {
                var val = obj[key];
                if (val != void 0) {
                    return false;
                }
            }
            return true;
        }
        Tools.objIsNull = objIsNull;
        /**
         * 删除数组中的指定值
         * @param {any[]} arr 待检测数组
         * @param {any} val 待删除的指定值
         */
        function deleteElement(arr, val) {
            if (!arr || arr.length <= 0)
                return;
            var index = arr.indexOf(val);
            if (index >= 0) {
                arr.splice(index, 1);
                return true;
            }
        }
        Tools.deleteElement = deleteElement;
        /**
         * 转换数字
         * @param {number} num 待转换数字
         * @param {boolean} isComma 是否每3位加一个","
         * @param {number} min 是否限制最小位数，不够位数时补0
         * @param {number} unitType 单位类型 0:无单位  1:K、M、G  2:百、千、万、百万、千万。。。
         * @param {number} retain 保留几位小数，默认为：2
         * @param {"round"|"ceil"|"floor“} rounding 取整方式
         */
        function switchNum(num, isComma, min, unitType, retain, rounding) {
            if (unitType === void 0) { unitType = 0; }
            if (retain === void 0) { retain = 2; }
            if (rounding === void 0) { rounding = "round"; }
            var unit = "";
            switch (unitType) {
                /** K、M、G */
                case 1:
                    if (num >= 1000000000) {
                        unit = "G";
                        num /= 1000000000;
                    }
                    else if (num >= 1000000) {
                        unit = "M";
                        num /= 1000000;
                    }
                    else if (num >= 1000) {
                        unit = "K";
                        num /= 1000;
                    }
                    break;
                /** 百、千、万、百万、千万。。。 */
                case 2:
                    if (num >= 100000000) {
                        unit = "亿";
                        num /= 100000000;
                    }
                    else if (num >= 10000000) {
                        unit = "千万";
                        num /= 10000000;
                    }
                    else if (num >= 1000000) {
                        unit = "百万";
                        num /= 1000000;
                    }
                    else if (num >= 100000) {
                        unit = "十万";
                        num /= 100000;
                    }
                    else if (num >= 10000) {
                        unit = "万";
                        num /= 10000;
                    }
                    else if (num >= 1000) {
                        unit = "千";
                        num /= 1000;
                    }
                    else if (num >= 100) {
                        unit = "百";
                        num /= 100;
                    }
                    break;
                /** 无单位 */
                default:
                    break;
            }
            num = ps.Mathf.keepDecimal(num, retain, rounding);
            var str = num + "";
            if (min != void 0) {
                var diff = min - str.length;
                if (diff > 0) {
                    for (var i = 0; i < diff; i++) {
                        str = "0" + str;
                    }
                }
            }
            if (isComma) {
                // const arr: string[] = str.split(".");
                var str1 = str; //arr[0];
                // const str2: string = arr.length > 1 ? arr[1] : "";
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(str1)) {
                    str1 = str1.replace(rgx, "$1" + "," + "$2");
                }
                str = str1; // + str2;
            }
            return str + unit;
        }
        Tools.switchNum = switchNum;
        /**
         * 转换小时为 00:00 格式
         */
        function switchHour(hour, is24) {
            if (is24 === void 0) { is24 = true; }
            var str;
            var max = is24 ? 23 : 11;
            if (hour > max) {
                hour %= (max + 1);
            }
            if (hour < 10) {
                str = "0" + hour + ":00";
            }
            else {
                str = hour + ":00";
            }
            return str;
        }
        Tools.switchHour = switchHour;
        /**
         * 字符串转JSON
         * @param str 待转换字符串数据
         */
        function strToJson(str) {
            if (typeof str !== "string")
                return str;
            return JSON.parse(str);
        }
        Tools.strToJson = strToJson;
        /**
         * JSON转字符串
         * @param obj 待转换JSON数据
         */
        function jsonToStr(obj) {
            if (typeof obj !== "object")
                return obj;
            return JSON.stringify(obj);
        }
        Tools.jsonToStr = jsonToStr;
    })(Tools = ps.Tools || (ps.Tools = {}));
})(ps || (ps = {}));
