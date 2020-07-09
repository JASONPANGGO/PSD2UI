var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * 标记一个类是过时的
 * @param newName 新类名称
 */
function ObsoleteClass(newName) {
    return function replace(target) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                var fun = target;
                if (ps.ENV === "DEBUG")
                    console.error(fun.name + " \u5DF2\u8FC7\u65F6\uFF0C\u8BF7\u4F7F\u7528 " + newName);
                return _this;
            }
            return class_1;
        }(target));
    };
}
/**
 * 标记一个方法是过时的
 * @param newName 新方法名称
 * @param oldName (可选)旧方法名称,可自动识别，识别有问题的需手动输入
 */
function ObsoleteMethod(newName, oldName) {
    return function (target, propertyKey, descriptor) {
        var oldFunction = target[propertyKey];
        var newFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (ps.ENV === "DEBUG")
                console.error(oldName + " \u5DF2\u8FC7\u65F6\uFF0C\u8BF7\u4F7F\u7528 " + newName);
            return oldFunction.call.apply(oldFunction, __spreadArrays([target], args));
        };
        descriptor.value = newFunction; // 替换原声明
    };
}
// /**
//  * 标记一个属性是过时的
//  * @param newMethodName 新方法名称
//  * @param oldMethodName (可选)旧方法名称,可自动识别，识别有问题的需手动输入
//  */
// function ObsoleteV() {
// }
// let listt = {};
// function sumCount(name: string) {
//     if (listt[name] != undefined) {
//         listt[name]++;
//     } else {
//         listt[name] = 1;
//     }
//     console.log(listt);
// }
// function useCount<T extends { new(...args: any[]): {} }>(target: T) {
//     return class extends target {
//         constructor(...args: any[]) {
//             super(...args);
//             if (ps.ENV === "DEBUG") {
//                 sumCount(target.name);
//             }
//         }
//     }
// }
