/** 数学计算模块 */
declare namespace ps.Mathf {
    /** 角度转弧度 */
    function angleToRadian(a: number): number;
    /** 弧度转角度 */
    function radianToAngle(r: number): number;
    /**
     * 判断给出的数据是否在数值范围内
     * @param value 输入的数值
     * @param min 最小值，默认0
     * @param max 最大值，默认1
     * @param includeBoundary 包含边界，默认true
     */
    function inRange(value: number, min?: number, max?: number, includeBoundary?: boolean): boolean;
    /**
     * 把输入的数据限定在数值范围内
     * @param value 输入的数值
     * @param min 最小值，默认0
     * @param max 最大值，默认1
     */
    function clamp(value: number, min?: number, max?: number): number;
    /**
     * 计算两点距离
     * @param x1 点1的X坐标
     * @param y1 点1的Y坐标
     * @param x2 点2的X坐标
     * @param y2 点2的Y坐标
     * @param rounding 取整类型，默认不取整
     */
    function getDistance(x1: number, y1: number, x2: number, y2: number, rounding?: "round" | "ceil" | "floor"): number;
    /**
     * 计算两点形成的向量弧度
     * @param x1 点1的X坐标
     * @param y1 点1的Y坐标
     * @param x2 点2的X坐标
     * @param y2 点2的Y坐标
     */
    function getRadian(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * 计算两点形成的向量角度
     * @param x1 点1的X坐标
     * @param y1 点1的Y坐标
     * @param x2 点2的X坐标
     * @param y2 点2的Y坐标
     */
    function getAngle(x1: number, y1: number, x2: number, y2: number): number;
    /**
     *  检测点与对象的碰撞(矩形)
     * @param target 目标对象(矩形)
     * @param x 目标点的X坐标
     * @param y 目标点的YU坐标
     */
    function collision(target: any, x?: number, y?: number): boolean;
    /**
    * 把字符串或数字转换成数字
    * @param v 字符串或数字
    */
    function parseNumber(v: number | string): number;
    /** 阻尼计算 */
    function damp(v1: number, v2: number, damping: number): number;
    /** 线性计算 */
    function lerp(v1: number, v2: number, t: number): number;
    /**
     * 保留N位小数（四舍五入）
     * @param {number} val 待修改值
     * @param {number} n = 2 N位小数，大于等于0
     * @returns {number} 保留N位小数后的结果
     *
     * @description
     * round() 方法可把一个数字舍入为最接近的整数。
     * 例如：Math.round(x)，则是将x取其最接近的整数。
     * 其取舍的方法使用的是四舍五入中的方法，符合数学中取舍的规则。
     *
     * @description
     * toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
     * 例如将数据Num保留2位小数，则表示为：toFixed(Num)；
     * 但是其四舍五入的规则与数学中的规则不同，使用的是银行家舍入规则，
     * 银行家舍入：所谓银行家舍入法，其实质是一种四舍六入五取偶（又称四舍六入五留双）法
     */
    function keepDecimal(val: number, n?: number, rounding?: "round" | "ceil" | "floor"): number;
    /**
     * 通过速度求时间（秒）
     * @param {number} x1 点1，X坐标
     * @param {number} y1 点1，Y坐标
     * @param {number} x2 点2，X坐标
     * @param {number} y2 点2，Y坐标
     * @param {number} speed 速度
     * @returns {number} 通过传入的速度，求出时间（秒）
     */
    function getTimeBySpeed(x1: number, y1: number, x2: number, y2: number, speed: number): number;
    /**
     * 两点间按一定分割间距（密度）取出所有点
     * @param {number} x1 点1，X坐标
     * @param {number} y1 点1，Y坐标
     * @param {number} x2 点2，X坐标
     * @param {number} y2 点2，Y坐标
     * @param {number} density = 1 分割间距（密度）
     * @returns {{x?:number,y?:number}[]} 分割结果所有的点
     */
    function pointListByDensity(x1: number, y1: number, x2: number, y2: number, density?: number): {
        x?: number;
        y?: number;
    }[];
}
