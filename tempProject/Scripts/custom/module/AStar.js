var ps;
(function (ps) {
    /**
     * A*寻路地图
     */
    var AStarMap = /** @class */ (function () {
        function AStarMap(rows, cols, v) {
            if (v === void 0) { v = 0; }
            this.data = [];
            this.rows = rows;
            this.cols = cols;
            var arr = [];
            for (var i = 0; i < cols; i++)
                arr.push(v);
            for (var i = 0; i < rows; i++)
                this.data[i] = arr.concat();
        }
        /** 设置障碍或通路 */
        AStarMap.prototype.set = function (x, y, v) {
            if (this.data[x])
                this.data[x][y] = v;
        };
        AStarMap.prototype.get = function (x, y) {
            if (this.data[x])
                return this.data[x][y];
        };
        /** 设置整张地图 */
        AStarMap.prototype.setAll = function (v) {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    this.set(i, j, v);
                }
            }
        };
        /** 设置一片矩形区域 */
        AStarMap.prototype.setArea = function (x, y, w, h, v) {
            for (var i = x; i < x + w; i++) {
                for (var j = y; j < y + h; j++) {
                    this.set(i, j, v);
                }
            }
        };
        /** 寻路 */
        AStarMap.prototype.searchRoad = function (startX, startY, endX, endY) {
            return astar.getPath(this, startX, startY, endX, endY);
        };
        /**
         * 打印当前地图
         */
        AStarMap.prototype.print = function () {
            var astr = "";
            for (var i = 0; i < this.rows; i++) {
                var row = this.data[i];
                var str = "";
                for (var _i = 0, row_1 = row; _i < row_1.length; _i++) {
                    var v = row_1[_i];
                    str += v + " ";
                }
                astr += str + "\n";
            }
            console.log(astr);
        };
        AStarMap.prototype.save = function () {
            var str = '';
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    str += (this.get(i, j));
                }
            }
            console.log(str);
        };
        AStarMap.prototype.load = function (str) {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    var index = i * this.cols + j;
                    this.set(i, j, parseInt(str.charAt(index)));
                }
            }
        };
        return AStarMap;
    }());
    ps.AStarMap = AStarMap;
})(ps || (ps = {}));
var astar;
(function (astar) {
    //其中的map.data是二维数组
    function getPath(map, start_x, start_y, end_x, end_y) {
        var openList = [], //开启列表
        closeList = [], //关闭列表
        result = [], //结果数组
        result_index; //结果数组在开启列表中的序号
        openList.push({ x: start_x, y: start_y, G: 0 }); //把当前点加入到开启列表中，并且G是0
        do {
            var currentPoint = openList.pop();
            closeList.push(currentPoint);
            var surroundPoint = SurroundPoint(currentPoint);
            for (var i in surroundPoint) {
                var item = surroundPoint[i]; //获得周围的八个点
                if (item.x >= 0 && //判断是否在地图上
                    item.y >= 0 &&
                    item.x < map.rows &&
                    item.y < map.cols &&
                    map.data[item.x][item.y] != 1 && //判断是否是障碍物
                    !existList(item, closeList) && //判断是否在关闭列表中
                    map.data[item.x][currentPoint.y] != 1 && //判断之间是否有障碍物，如果有障碍物是过不去的
                    map.data[currentPoint.x][item.y] != 1) {
                    //g 到父节点的位置
                    //如果是上下左右位置的则g等于10，斜对角的就是14
                    var g = currentPoint.G + ((currentPoint.x - item.x) * (currentPoint.y - item.y) == 0 ? 10 : 14);
                    var index = existList(item, openList);
                    if (!index) {
                        //如果不在开启列表中
                        //计算H，通过水平和垂直距离进行确定
                        item['H'] = Math.abs(end_x - item.x) * 10 + Math.abs(end_y - item.y) * 10;
                        item['G'] = g;
                        item['F'] = item['H'] + item['G'];
                        item['parent'] = currentPoint;
                        openList.push(item);
                    }
                    else {
                        //存在在开启列表中，比较目前的g值和之前的g的大小
                        //如果当前点的g更小
                        if (g < openList[index].G) {
                            openList[index].parent = currentPoint;
                            openList[index].G = g;
                            openList[index].F = g + openList[index].H;
                        }
                    }
                }
            }
            //如果开启列表空了，没有通路，结果为空
            if (openList.length == 0) {
                break;
            }
            openList.sort(sortF); //这一步是为了循环回去的时候，找出 F 值最小的, 将它从 "开启列表" 中移掉
        } while (!(result_index = existList({ x: end_x, y: end_y }, openList)));
        //判断结果列表是否为空
        if (!result_index) {
            result = [];
        }
        else {
            var currentObj = openList[result_index];
            do {
                //把路劲节点添加到result当中
                result.unshift({
                    x: currentObj.x,
                    y: currentObj.y
                });
                currentObj = currentObj.parent;
            } while (currentObj.x != start_x || currentObj.y != start_y);
        }
        return result;
    }
    astar.getPath = getPath;
    //用F值对数组排序
    function sortF(a, b) {
        return b.F - a.F;
    }
    //获取周围八个点的值
    function SurroundPoint(curPoint) {
        var x = curPoint.x, y = curPoint.y;
        return [
            { x: x - 1, y: y - 1 },
            { x: x, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x: x + 1, y: y },
            { x: x + 1, y: y + 1 },
            { x: x, y: y + 1 },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y }
        ];
    }
    //判断点是否存在在列表中，是的话返回的是序列号
    function existList(point, list) {
        for (var i in list) {
            if (point.x == list[i].x && point.y == list[i].y) {
                return i;
            }
        }
        return false;
    }
})(astar || (astar = {}));
