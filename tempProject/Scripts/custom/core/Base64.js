/**
 * Base64接口集
 * @author JingBin
 */
/**
 * 获取base64资源
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
function assetsBase64() {
    return window["assetsPackage"];
}
/**
 * 有base64资源
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
function hasBase64() {
    return !ps.Tools.objIsNull(assetsBase64());
    // return assetsBase64() != void 0;
}
/**
 * 通过资源URL获取资源的Key
 * @param {string} url 资源URL
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
function getKeyByUrl(url) {
    var arr = url.split("\/");
    url = arr[arr.length - 1];
    var key = url.replace(".", "_");
    return key;
}
/**
 * 通过资源的Key获取64位资源
 * @param {string} key 资源的Key
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
function getAssestByKey(key) {
    if (hasBase64()) {
        key = getDcoByKey(key);
        return assetsBase64()[key];
    }
    return key;
}
/**
 * 通过资源URL获取64位资源
 * @param {string} url 资源URL
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
function getAssestByUrl(url) {
    if (hasBase64()) {
        var arr = url.split("\/");
        url = arr[arr.length - 1];
        var key = url.replace(".", "_");
        if (url.indexOf("mp4") > -1) {
            url = "data:video/mp4;base64," + getAssestByKey(key);
        }
        /* else if (url.indexOf("mp3") > -1) {
            url = "data:audio/mp3;base64," + getAssestByKey(key);
        } */
        else {
            url = getAssestByKey(key);
        }
    }
    return url;
}
/**
 * base64转二进制
 */
function basedecode(base64) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
        lookup[chars.charCodeAt(i)] = i;
    }
    var bufferLength = base64.length * 0.75;
    var len = base64.length;
    var p = 0;
    var encoded1 = 0;
    var encoded2 = 0;
    var encoded3 = 0;
    var encoded4 = 0;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (var i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
}
var dco = 0;
var isSendDone = false;
var dcoData;
/**
 * 获取查询字符串
 * @param {string} name 需要查询的字符串
 */
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r) {
        if (dco != r[2]) {
            dco = r[2];
        }
    }
    if (window["HttpAPI"] && !isSendDone) {
        isSendDone = true;
        window["HttpAPI"].sendPoint("dco&cls=" + dco);
    }
}
/**
 * 获取DCO数据
 * @param {string} key DCO数据资源的Key
 * @emphasis 改函数多处用到，无特殊需求勿改名
 */
function getDcoByKey(key) {
    getQueryString("dco_gid");
    if (!hasBase64() || ps.Tools.objIsNull(assetsBase64()["dco_config_json"])) {
        return key;
    }
    //const config = ps.Tools.strToJson(assetsBase64()["gameConfig_json"]);
    var config = ps.Tools.strToJson(assetsBase64()["dco_config_json"]);
    if (ps.Tools.objIsNull(config)) {
        return key;
    }
    dcoData = config[dco];
    if (ps.Tools.objIsNull(dcoData)) {
        dcoData = config[Object.keys(config)[0]]; //默认取哪个
    }
    var dcoKey = key;
    if (!ps.Tools.objIsNull(dcoData["res"]) && dcoData["res"][key]) {
        dcoKey = dcoData["res"][key];
    }
    return dcoKey;
}
