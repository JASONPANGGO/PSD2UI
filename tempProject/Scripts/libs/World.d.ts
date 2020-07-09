// Type definitions for World.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare class Box2DWorld {
	/**
	 * 是否开启 debug 绘制，默认false
	 */
	debugDraw: boolean;
	/**
	 * debug绘制参数
	 */
	debugFlags: number;
	/**
	 * 世界的重力值设定,默认10
	 */
	gravity: number;
	/**
	 * 期望物理的调度帧率,默认30
	 */
	frameRate: number;
	/**
     * 像素到米的转换比率,默认20
     */
	PTM: number;
	/**
     * 使用实际delta的时间调度，还是使用固定的帧时间,默认false
     */
	useElapsedTime: number;
	/**
	 * 当前是否暂停状态
	 */
	paused: boolean;
	//---------------------------------------------------------------------------
	/**
	 * 
	 * @param game 
	 * @return  
	 */
	new(game: any): Box2DWorld;

	/**
	 * preUpdate 调度
	 */
	preUpdate(): /* void */ any;

	/**
	 * update 调度
	 */
	update(): /* void */ any;

	/**
	 * pixel 到 meter 的换算公式
	 * @param v 
	 * @param type 
	 * @return  
	 */
	pixelToMeter(v: number, type: any): number;

	/**
	 * 游戏的 x 到 box2d 的 x
	 * @param v 
	 * @return  
	 */
	toBox2DX(v: number): number;

	/**
	 * 游戏的 y 到 box2d 的 y
	 * @param v 
	 * @return  
	 */
	toBox2DY(v: number): number;

	/**
	 * meter 到 pixel 的换算公式
	 * @param v 
	 * @param type 
	 * @return  
	 */
	meterToPixel(v: any, type: any): number;

	/**
	 * box2d 的 x 到游戏的 x
	 * @param v 
	 * @return  
	 */
	toWorldX(v: any): number;

	/**
	 * box2d 的 y 到游戏的 y
	 * @param v 
	 * @return  
	 */
	toWorldY(v: any): number;

	/**
	 * 
	 */
	setBoundsToWorld(): /* void */ any;

	/**
	 * 
	 */
	clear(): /* void */ any;

	/**
	 * 
	 */
	reset(): /* void */ any;

	/**
	 * 
	 */
	destroy(): /* void */ any;

	/**
	 * 游戏 frameRate 发生变化的时候，重置物理的 frameRate
	 */
	onFrameRateChanged(): /* void */ any;

	/**
	 * qc game Started
	 */
	onGameStart(): /* void */ any;

	/**
	 * 驱动 box2d 世界向前进行 elapseTime 毫秒
	 */
	step(): /* void */ any;

	/**
	 * 驱动 box2d 世界开始绘制 debug 形状
	 */
	drawDebugData(): /* void */ any;

	/**
	 * 注册contact 事件监听
	 * @param handler 
	 */
	setContactListener(handler: any): /* void */ any;

	/**
	 * 注册为 Debug Draw 响应
	 * @param handler 
	 */
	setDebugDraw(handler: any): /* void */ any;

	/**
	 * 设置暂停
	 */
	pause(): /* void */ any;

	/**
	 * 设置恢复 box2d 世界的运作
	 */
	resume(): /* void */ any;

	/**
	 * 创建一个 body 对象
	 * @param bodyDef 
	 */
	createBody(bodyDef: any): /* void */ any;

	/**
	 * 干掉 node 身上附着的 body 对象
	 * @param node 
	 */
	destroyBody(node: any): /* void */ any;

	/**
	 * 从游戏世界的某个节点开始，获取旗下所有 Body 对象
	 * @param node 
	 * @param ret 
	 */
	getBodyByGameWorld(node: any, ret: Function): /* void */ any;

	/**
	 * 获取当前世界所有的 Body 对象
	 * @return  
	 */
	getBodyList(): Array<any>;

	/**
	 * 获取一条射线上的目标
	 * @param x1 
	 * @param y1 
	 * @param x2 
	 * @param y2 
	 * @param closest 
	 * @param filter 
	 * @return  
	 */
	raycast(x1: any, y1: any, x2: any, y2: any, closest: any, filter: any): any;

	/**
	 * 查询区域内的所有目标
	 * @param x 
	 * @param y 
	 * @param width 
	 * @param height 
	 * @param findAll 
	 * @param filter 
	 */
	queryAABB(x: any, y: any, width: any, height: any, findAll: any, filter: any): /* void */ any;

	/**
	 * 查询一个点选中的所有 Fixtures
	 * @param x 
	 * @param y 
	 * @param findAll 
	 * @param filter 
	 */
	queryFixtureAtPoint(x: any, y: any, findAll: any, filter: any): /* void */ any;

	/**
	 * 将 qc.Point 转为 Box2D 格式的 vector
	 * @param p 
	 */
	_parseVector2(p: any): /* void */ any;

	/**
	 * 初始化默认的 joint 长度
	 * @param length 
	 * @param bodyA 
	 * @param bodyB 
	 * @param anchorA 
	 * @param anchorB 
	 * @return  
	 */
	_initJoinLength(length: number, bodyA: any, bodyB: any, anchorA: any, anchorB: any): number;

	/**
	 * 创建个 distance joint（距离关节）
	 * @param obA 
	 * @param obB 
	 * @param anchorA 
	 * @param anchorB 
	 * @param length 
	 * @param dampingRatio 
	 * @param frequency 
	 * @param collideConnected 
	 */
	createDistanceJoint(obA: any, obB: any, anchorA: any, anchorB: any, length: number, dampingRatio: number, frequency: number, collideConnected: boolean): /* void */ any;

	/**
	 * 创建个 Revolute joint（旋转关节）
	 * @param obA 
	 * @param obB 
	 * @param anchorA 
	 * @param anchorB 
	 * @param enableLimit 
	 * @param lowerAngle 
	 * @param upperAngle 
	 * @param enableMotor 
	 * @param maxMotorTorque 
	 * @param motorSpeed 
	 * @param collideConnected 
	 */
	createRevoluteJoint(obA: any, obB: any, anchorA: any, anchorB: any, enableLimit: boolean, lowerAngle: any, upperAngle: any, enableMotor: boolean, maxMotorTorque: any, motorSpeed: any, collideConnected: boolean): /* void */ any;

	/**
	 * 创建一个 Rope joint（绳索关节）
	 * @param obA 
	 * @param obB 
	 * @param anchorA 
	 * @param anchorB 
	 * @param length 
	 * @param collideConnected 
	 */
	createRopeJoint(obA: any, obB: any, anchorA: any, anchorB: any, length: number, collideConnected: any): /* void */ any;

	/**
	 * 创建一个Prismatic Joint（移动关节）
	 * @param obA 
	 * @param obB 
	 * @param anchorA 
	 * @param anchorB 
	 * @param enableLimit 
	 * @param localAxisA 
	 * @param lowerLimit 
	 * @param upperLimit 
	 * @param refAngle 
	 * @param enableMotor 
	 * @param motorSpeed 
	 * @param maxMotorTorque 
	 * @param collideConnected 
	 */
	createPrismaticJoint(obA: any, obB: any, anchorA: any, anchorB: any, enableLimit: any, localAxisA: any, lowerLimit: any, upperLimit: any, refAngle: any, enableMotor: any, motorSpeed: any, maxMotorTorque: any, collideConnected: any): /* void */ any;

	/**
	 * 创建一个 Wheel joint（齿轮关节）
	 * @param obA 
	 * @param obB 
	 * @param offsetX 
	 * @param offsetY 
	 * @param enableMotor 
	 * @param localAxisA 
	 * @param maxMotorTorque 
	 * @param motorSpeed 
	 * @param dampingRatio 
	 * @param frequency 
	 * @param collideConnected 
	 */
	createWheelJoint(obA: any, obB: any, offsetX: any, offsetY: any, enableMotor: any, localAxisA: any, maxMotorTorque: any, motorSpeed: any, dampingRatio: any, frequency: any, collideConnected: any): /* void */ any;

	/**
	 * 创建一个 Motor joint（马达关节）
	 * @param obA 
	 * @param obB 
	 * @param offsetX 
	 * @param offsetY 
	 * @param angularOffset 
	 * @param maxForce 
	 * @param maxTorque 
	 * @param correctionFactor 
	 * @param collideConnected 
	 */
	createMotorJoint(obA: any, obB: any, offsetX: any, offsetY: any, angularOffset: any, maxForce: any, maxTorque: any, correctionFactor: any, collideConnected: any): /* void */ any;

	/**
	 * 创建一个 Friction joint（摩擦关节）
	 * @param obA 
	 * @param obB 
	 * @param anchorA 
	 * @param anchorB 
	 * @param maxForce 
	 * @param maxTorque 
	 * @param collideConnected 
	 */
	createFrictionJoint(obA: any, obB: any, anchorA: any, anchorB: any, maxForce: any, maxTorque: any, collideConnected: any): /* void */ any;

	/**
	 * 创建一个 Weld joint（焊接关节）
	 * @param obA 
	 * @param obB 
	 * @param anchorA 
	 * @param anchorB 
	 * @param refAngle 
	 * @param dampingRatio 
	 * @param frequency 
	 * @param collideConnected 
	 */
	createWeldJoint(obA: any, obB: any, anchorA: any, anchorB: any, refAngle: any, dampingRatio: any, frequency: any, collideConnected: any): /* void */ any;

	/**
	 * 设置这个节点成为 root 节点
	 * @param node 
	 */
	setRootNode(node: any): /* void */ any;

	/**
	 * 取消某个节点，不再作为 root 节点
	 * @param node 
	 */
	removeRootNode(node: any): /* void */ any;

	/**
	 * 收到 root transform 变化的消息
	 */
	_onRootTransformChanged(): /* void */ any;

	/**
	 * 调试输出当前的世界信息
	 */
	debugInfo(): /* void */ any;
}