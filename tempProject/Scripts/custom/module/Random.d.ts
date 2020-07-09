/** 随机数模块 */
declare namespace ps.Random {
    /**
     *  取一个随机数四舍五入
     * @param v 边界1
     * @param v2 边界2,默认0
     */
    function round(v1: number, v2?: number): number;
    /**
     * 取一个随机数向下取整
     * @param v 边界1
     * @param v2 边界2,默认0
     */
    function floor(v1: number, v2?: number): number;
    /** 取一个随机数向上取整
      * @param v 边界1
     * @param v2 边界2,默认0
     */
    function ceil(v1: number, v2?: number): number;
    /**
     *  范围随机
     * @param min 边界1
     * @param max 边界2
     * @param rounding  取整类型，默认不取整
     */
    function range(v1: number, v2: number, rounding?: "round" | "ceil" | "floor"): number;
    /**
     *  取一个随机数
     * @param v 值，默认1
     * @param rounding 取整类型，默认不取整
     */
    function ran(v?: number, rounding?: "round" | "ceil" | "floor"): number;
    /**
     * 随机概率
     * @param v 值
     * @param max 最大值，默认1
     */
    function rate(v: number, max?: number): boolean;
    /**
     * 正太分布随机
     * 假如mean=0，std_dev=1,有68.26%的概率返回范围是[-1,1],返回值最大范围是[-5,5]
     * @param mean 数学期望，默认0
     * @param std_dev 标准差，默认1
     */
    function normalDistribution(mean?: number, std_dev?: number): number;
    /** 随机取一个元素 */
    function getElement(...args: any[]): any;
    /**
     * 随机抽取多个元素（不重复
     * @param arr 要抽取的对象数组
     * @param amount 要抽取的数量
     */
    function getElements(arr: any[], amount: number): any[];
    /** 概率抽取,N选1
     *  参数格式为{type1:weight1,type2:weight2,type3:weight3}
     */
    function drawOne(obj: {}): string;
}
