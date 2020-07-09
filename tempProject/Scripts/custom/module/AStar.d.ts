declare namespace ps {
    /**
     * A*寻路地图
     */
    class AStarMap {
        readonly rows: number;
        readonly cols: number;
        data: number[][];
        constructor(rows: number, cols: number, v?: 0 | 1);
        /** 设置障碍或通路 */
        set(x: number, y: number, v: number): void;
        get(x: number, y: number): number;
        /** 设置整张地图 */
        setAll(v: 0 | 1): void;
        /** 设置一片矩形区域 */
        setArea(x: number, y: number, w: number, h: number, v: 0 | 1): void;
        /** 寻路 */
        searchRoad(startX: number, startY: number, endX: number, endY: number): any[];
        /**
         * 打印当前地图
         */
        print(): void;
        save(): void;
        load(str: string): void;
    }
}
declare namespace astar {
    function getPath(map: any, start_x: any, start_y: any, end_x: any, end_y: any): any[];
}
