declare namespace ps {
    /**
     * 脚本基类
     * pl状态回调(onInit、onStart、onEnding、onRetry、onResize)
     * 如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
     * @author VaMP
     */
    class Behaviour extends qc.Behaviour {
        constructor(gameObject: qc.Node);
        private call;
        private createEvent;
        pos(x: number, y: number): void;
    }
}
