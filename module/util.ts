import path from 'path'

export type UUIDv4 = ReturnType<typeof uuid>
export type UUID = ReturnType<typeof uuidv4>
/**
    * Fast UUID generator, RFC4122 version 4 compliant.
    * @author Jeff Ward (jcward.com).
    * @license MIT license
    * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
    **/
export function uuid() {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var str = '';
    for (var i = 0; i < 12; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    var num = (new Date().getTime() % 1000).toString();
    if (num.length == 1)
        num = "00" + num;
    else if (num.length == 2)
        num = "0" + num;
    return str + num;
}
/**
     * Creates and returns an RFC4122 version 4 compliant UUID.
     * 
     * The string is in the form: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` where each `x` is replaced with a random
     * hexadecimal digit from 0 to f, and `y` is replaced with a random hexadecimal digit from 8 to b.
     *
     * @function Phaser.Utils.String.UUID
     * @since 3.12.0
     *
     * @return {string} The UUID string.
     */
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = (c === 'x') ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    });
}
