/**
 * 标记一个类是过时的
 * @param newName 新类名称
 */
declare function ObsoleteClass(newName: string): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {};
} & T;
/**
 * 标记一个方法是过时的
 * @param newName 新方法名称
 * @param oldName (可选)旧方法名称,可自动识别，识别有问题的需手动输入
 */
declare function ObsoleteMethod(newName: string, oldName?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
