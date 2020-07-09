declare namespace ps {
    /**
     * 数字滚动组件
     * @author JingBin
     */
    class NumScroll extends ps.Behaviour {
        gameObject: qc.UIText;
        curNum: number;
        addNum: number;
        chgInterval: number;
        chgCount: number;
        maxNum: number;
        roundCnt: number;
        /** 是否每3位加一个"," */
        isComma: boolean;
        /** 序列化 */
        private serializableFields;
        constructor(gameObject: qc.UIText);
        awake(): void;
        refresh(add?: number): void;
        private playDelay;
        private playing;
        private playStop;
        /** 播放数字切换效果 */
        private playNum;
        updateRender(num: number): void;
    }
}
/**
帧回调（preUpdate、update、postUpdate）
如果实现了这几个函数，系统会自动每帧进行调度（当挂载的Node节点处于可见、并且本脚本的enable=true时）
初始化（awake）
如果实现了awake函数，系统会在Node节点构建完毕（反序列化完成后）自动调度
脚本可用/不可用（onEnable、onDisable）
当脚本的enable从false->true时，会自动调用onEnable函数；反之调用onDisable函数
ps:在awake结束时,如果当前脚本的enable为true，会自动调用onEnable函数
交互回调（onClick、onUp、onDown、onDrag、onDragStart、onDragEnd）
当挂载的Node具备交互时，一旦捕获相应的输入事件，这些函数会自动被调用
脚本析构（onDestroy）
当脚本被移除时，会自动调用onDestroy函数，用户可以定义必要的资源回收代码
*/ 
