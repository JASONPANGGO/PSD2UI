class StartBeh extends ps.Behaviour {
    /** 序列化 */
    private serializableFields: Object = {
    }
    constructor(gameObject: qc.Node) {
        super(gameObject);
        
    }
    onGameStart() {
        ps.Print.purple("onGameStart");
    }
}
qc.registerBehaviour('StartBeh', StartBeh);