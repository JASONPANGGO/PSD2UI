/**
 * Base64接口集
 * @author JingBin
 */
/**
 * 获取base64资源
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
declare function assetsBase64(): any;
/**
 * 有base64资源
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
declare function hasBase64(): boolean;
/**
 * 通过资源URL获取资源的Key
 * @param {string} url 资源URL
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
declare function getKeyByUrl(url: string): string;
/**
 * 通过资源的Key获取64位资源
 * @param {string} key 资源的Key
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
declare function getAssestByKey(key: string): any;
/**
 * 通过资源URL获取64位资源
 * @param {string} url 资源URL
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
declare function getAssestByUrl(url: string): string;
/**
 * base64转二进制
 */
declare function basedecode(base64: any): ArrayBuffer;
declare let dco: any;
declare let isSendDone: boolean;
declare let dcoData: {
    param: string;
    res: Object;
};
/**
 * 获取查询字符串
 * @param {string} name 需要查询的字符串
 */
declare function getQueryString(name: string): void;
/**
 * 获取DCO数据
 * @param {string} key DCO数据资源的Key
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
declare function getDcoByKey(key: string): string;
