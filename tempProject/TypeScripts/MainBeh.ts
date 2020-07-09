import Random = ps.Random;
import Print = ps.Print;
import Mathf = ps.Mathf;
import Tween = ps.Tween;

/** 游戏主对象 */
let main: MainBeh;

enum GameEvent { a, b, c };

class MainBeh extends ps.Behaviour {
    gameEvent = new ps.EventDispatcher();
    /** 序列化 */
    private serializableFields: Object = {

    }
    constructor(gameObject: qc.Node) {
        super(gameObject);
        main = this;
    }
    /** 试玩初始化的处理 */
    onInit() {
        ps.Print.purple("mainInit");
        //在这里初始化游戏场景需要的东西
        // ps.GameConfig.createTemplete();

        if (box2d) {
            //console.log(box2d);
            box2d.debugDraw = true;
            box2d.debugFlags = 17;
        }
    }
    /** 试玩开始时的处理 */
    onStart() {
        ps.Print.purple("mainStart");
        //动态参数的使用,playAgain参数会随着再玩一次而减少
        // console.log(GAME_CFG.playAgain);
    }
    /** 试玩结束时的处理 */
    onEnd() {
        ps.Print.purple("mainEnd");
    }
    /** 再来一次时的处理(onInit后,onStart前) */
    onRetry() {
        ps.Print.purple("mainRetry");
    }
}
qc.registerBehaviour('MainBeh', MainBeh);
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
//PlaySmart新增回调(继承ps.Behaviour)
pl状态回调(onInit、onStart、onEnding、onRetry)
如果实现了这几个函数，会在pl进行到相应状态的时候进行回调
*/