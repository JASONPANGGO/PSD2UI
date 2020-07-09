/**
 * 拓展工具模块
 */
declare namespace ps.Tools {
    /**
     * 把当前对象坐标系转换到目标对象坐标系
     * @param current 当前对象
     * @param target 目标对象
     * @param point 坐标点
     */
    function transPos(current: qc.Node, target: qc.Node, point?: qc.Point): qc.Point;
    /**
     * 检测对象是否为空
     * @param {Object} obj 待检测对象
     * @returns {boolean} 对象是否为空（包含{}、对象里所有val都为空）
     */
    function objIsNull(obj: Object): boolean;
    /**
     * 删除数组中的指定值
     * @param {any[]} arr 待检测数组
     * @param {any} val 待删除的指定值
     */
    function deleteElement(arr: any[], val: any): boolean;
    /**
     * 转换数字
     * @param {number} num 待转换数字
     * @param {boolean} isComma 是否每3位加一个","
     * @param {number} min 是否限制最小位数，不够位数时补0
     * @param {number} unitType 单位类型 0:无单位  1:K、M、G  2:百、千、万、百万、千万。。。
     * @param {number} retain 保留几位小数，默认为：2
     * @param {"round"|"ceil"|"floor“} rounding 取整方式
     */
    function switchNum(num: number, isComma?: boolean, min?: number, unitType?: number, retain?: number, rounding?: "round" | "ceil" | "floor"): string;
    /**
     * 转换小时为 00:00 格式
     */
    function switchHour(hour: number, is24?: boolean): string;
    /**
     * 字符串转JSON
     * @param str 待转换字符串数据
     */
    function strToJson(str: string): Object;
    /**
     * JSON转字符串
     * @param obj 待转换JSON数据
     */
    function jsonToStr(obj: Object): string;
}
