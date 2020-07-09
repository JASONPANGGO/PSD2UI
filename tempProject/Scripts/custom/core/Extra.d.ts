declare let qici: {
    /** 一些配置信息 */
    config: {
        /** 编辑器模式下 */
        editor: boolean;
    };
};
declare namespace qc {
    /**
     * 定义快捷查找对象的方法
     * 根据唯一名字查找对象
     */
    function N(name: string): qc.Node;
}
declare namespace ps {
    /**
     * 定义快捷查找对象的方法
     * 根据唯一名字查找对象
     */
    function find(uniqueName: string): qc.Node;
    /**
     * 克隆物体或预设
     * @param node 物体或预设
     * @param parent 父亲
     */
    function Instantiate(node: qc.Node | qc.Prefab, parent?: qc.Node): qc.Node;
    /**
     * 根据Y对孩子的层次排序
     * @param parent 父容器
     */
    function sortChild(parent: qc.Node): void;
}
