class EndingBeh extends ps.Behaviour {
    /** 序列化 */
    private serializableFields: Object = {
    }
    constructor(gameObject: qc.Node) {
        super(gameObject);
    }
    awake() {

    }
    /**
     * 显示结束界面
     * @param result 结果，默认为true
     */
    onEnd(result: boolean = true) {

    }
}
qc.registerBehaviour('EndingBeh', EndingBeh);