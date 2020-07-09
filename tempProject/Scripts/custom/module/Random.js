/** 随机数模块 */
var ps;
(function (ps) {
    var Random;
    (function (Random) {
        /**
         *  取一个随机数四舍五入
         * @param v 边界1
         * @param v2 边界2,默认0
         */
        function round(v1, v2) {
            if (v2 === void 0) { v2 = 0; }
            return range(v1, v2, "round");
        }
        Random.round = round;
        /**
         * 取一个随机数向下取整
         * @param v 边界1
         * @param v2 边界2,默认0
         */
        function floor(v1, v2) {
            if (v2 === void 0) { v2 = 0; }
            return range(v1, v2, "floor");
        }
        Random.floor = floor;
        /** 取一个随机数向上取整
          * @param v 边界1
         * @param v2 边界2,默认0
         */
        function ceil(v1, v2) {
            if (v2 === void 0) { v2 = 0; }
            return range(v1, v2, "ceil");
        }
        Random.ceil = ceil;
        /**
         *  范围随机
         * @param min 边界1
         * @param max 边界2
         * @param rounding  取整类型，默认不取整
         */
        function range(v1, v2, rounding) {
            var min = Math.min(v1, v2);
            var max = Math.max(v1, v2);
            var result = ran(max - min) + min;
            if (rounding)
                result = Math[rounding](result);
            return result;
        }
        Random.range = range;
        /**
         *  取一个随机数
         * @param v 值，默认1
         * @param rounding 取整类型，默认不取整
         */
        function ran(v, rounding) {
            if (v === void 0) { v = 1; }
            var result = Math.random() * v;
            if (rounding)
                result = Math[rounding](result);
            return result;
        }
        Random.ran = ran;
        /**
         * 随机概率
         * @param v 值
         * @param max 最大值，默认1
         */
        function rate(v, max) {
            if (max === void 0) { max = 1; }
            return ran(max) < v;
        }
        Random.rate = rate;
        /**
         * 正太分布随机
         * 假如mean=0，std_dev=1,有68.26%的概率返回范围是[-1,1],返回值最大范围是[-5,5]
         * @param mean 数学期望，默认0
         * @param std_dev 标准差，默认1
         */
        function normalDistribution(mean, std_dev) {
            if (mean === void 0) { mean = 0; }
            if (std_dev === void 0) { std_dev = 1; }
            var u = 0, v = 0, w = 0, c = 0;
            do {
                //获得两个（-1,1）的独立随机变量
                u = range(-1, 1);
                v = range(-1, 1);
                w = u * u + v * v;
            } while (w == 0 || w >= 1);
            //这里就是 Box-Muller转换
            c = Math.sqrt((-2 * Math.log(w)) / w);
            //返回2个标准正态分布的随机数，封装进一个数组返回
            //当然，因为这个函数运行较快，也可以扔掉一个
            //return [u*c,v*c];
            //return u*c;
            var nd = u * c;
            //
            return mean + (nd * std_dev);
        }
        Random.normalDistribution = normalDistribution;
        /** 随机取一个元素 */
        function getElement() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var index = floor(args.length);
            return args[index];
        }
        Random.getElement = getElement;
        /**
         * 随机抽取多个元素（不重复
         * @param arr 要抽取的对象数组
         * @param amount 要抽取的数量
         */
        function getElements(arr, amount) {
            if (arr.length < amount) {
                console.error("抽取数量大于数组长度");
                return;
            }
            var carr = arr.concat();
            var narr = [];
            for (var i = 0; i < amount; i++) {
                var index = Random.floor(carr.length);
                narr.push(carr[index]);
                carr.splice(index, 1);
            }
            return narr;
        }
        Random.getElements = getElements;
        /** 概率抽取,N选1
         *  参数格式为{type1:weight1,type2:weight2,type3:weight3}
         */
        function drawOne(obj) {
            var allWeight = 0;
            for (var key in obj) {
                var weight = obj[key];
                allWeight += weight;
            }
            var v = Math.random() * allWeight;
            var sum = 0;
            for (var key in obj) {
                sum += obj[key];
                if (v < sum) {
                    return key;
                }
            }
        }
        Random.drawOne = drawOne;
    })(Random = ps.Random || (ps.Random = {}));
})(ps || (ps = {}));
