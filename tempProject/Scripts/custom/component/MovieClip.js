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
var ps;
(function (ps) {
    /**
     * 序列帧播放组件 version 1.1
     */
    var MovieClip = /** @class */ (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(gameObject) {
            var _this = _super.call(this, gameObject) || this;
            _this.actionNames = { "framename": "greenidle{0}.bin|1" };
            _this.defActionName = "framename";
            _this.defPlay = false;
            _this.defLoop = false;
            _this.isReverse = false;
            _this.playTime = -1;
            _this.mcData = {};
            /** 播放间隔 */
            _this.interval = 100;
            _this.isPlaying = false;
            /** 播放完成自动销毁 */
            _this.autoDestory = false;
            _this.serializableFields = {
                interval: qc.Serializer.NUMBER,
                actionNames: qc.Serializer.MAPPING,
                defActionName: qc.Serializer.STRING,
                defPlay: qc.Serializer.BOOLEAN,
                defLoop: qc.Serializer.BOOLEAN,
                autoDestory: qc.Serializer.BOOLEAN
            };
            _this.runInEditor = true;
            return _this;
        }
        MovieClip.prototype.awake = function () {
            for (var key in this.actionNames) {
                var ob = this.actionNames[key];
                var arr = ob.split("|");
                var mc = new McData(key, arr[1], arr[0]);
                this.mcData[key] = mc;
            }
            if (this.defPlay && this.mcData[this.defActionName]) {
                this.gotoAndPlay(this.defActionName, this.defLoop ? -1 : 1);
            }
            // this.setActions({"idle":["resource/texture/movieclip/greenjump1.bin","resource/texture/movieclip/greenjump1.bin","resource/texture/movieclip/greenjump2.bin","resource/texture/movieclip/greenjump3.bin","resource/texture/movieclip/greenjump4.bin",
            // "resource/texture/movieclip/greenjump5.bin","resource/texture/movieclip/greenjump6.bin","resource/texture/movieclip/greenjump7.bin"]}
            // )
            // this.gotoAndPlay("idle", -1);
        };
        /***
         * 设置动作列表 {"run":["xx.bin","yy.bin"],"idle":["aa.bin","cc.bin"]}
         */
        MovieClip.prototype.setActions = function (arr) {
            this.stop();
            for (var key in arr) {
                var list = arr[key];
                var mc = new McData(key, list.length, list);
                this.mcData[key] = mc;
            }
        };
        Object.defineProperty(MovieClip.prototype, "img", {
            get: function () {
                return this.gameObject;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.setTexture = function (url) {
            var _this = this;
            var a = this.game.assets.find(url);
            if (!a) {
                this.game.assets.load(url, url, function () {
                    var a = _this.game.assets.find(url);
                    _this.img.texture = a;
                    _this.img.resetNativeSize();
                });
            }
            else {
                this.img.texture = a;
                this.img.resetNativeSize();
            }
        };
        /**
         * @fName 动作名字
         * @fName 播放次数
         * @callback 完成的回调
         * @context this
         * @backplay 是否来回播放  123456543212345类似这样
         * @startIndex 起始帧
         * @startDirect 起始方向 1正向 -1逆向
        */
        MovieClip.prototype.gotoAndPlay = function (fName, playTime, callback, context, backplay, startIndex, startDirect) {
            if (playTime === void 0) { playTime = -1; }
            if (callback === void 0) { callback = null; }
            if (context === void 0) { context = null; }
            if (backplay === void 0) { backplay = false; }
            if (startIndex === void 0) { startIndex = 1; }
            if (startDirect === void 0) { startDirect = 1; }
            this.callback = callback;
            this.context = context;
            this.currentFrameName = fName;
            this.playTime = playTime;
            this.currentData = this.mcData[fName];
            if (this.currentData) {
                this.nextUpdateTime = this.game.time.scaledTime + this.interval;
                this.currentData.direct = startDirect;
                this.currentData.backplay = backplay;
                this.frameIndex = startIndex;
                var pngname = this.currentData.getPngName(this.frameIndex);
                //load(key, url, callback, override);
                this.setTexture(pngname);
                this.isPlaying = true;
            }
        };
        /** 停止再某个动作的第N帧 */
        MovieClip.prototype.gotoAndStop = function (fName, frameIndex) {
            if (frameIndex === void 0) { frameIndex = 1; }
            if (this.isPlaying) {
                this.isPlaying = false;
                //this.removeEventListener(egret.Event.ENTER_FRAME,this.update,this);
            }
            this.currentFrameName = fName;
            this.currentData = this.mcData[fName];
            this.frameIndex = frameIndex;
            if (this.currentData) {
                var pngname = this.currentData.getPngName(this.frameIndex);
                this.setTexture(pngname);
            }
        };
        /** 停止播放 */
        MovieClip.prototype.stop = function () {
            if (this.isPlaying) {
                this.isPlaying = false;
                //this.removeEventListener(egret.Event.ENTER_FRAME,this.update,this);
            }
        };
        /** 恢复播放 */
        MovieClip.prototype.resume = function () {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.nextUpdateTime = this.game.time.scaledTime + this.interval;
            }
        };
        MovieClip.prototype.dispatch = function () {
            if (this.callback) {
                this.callback.call(this.context, this);
            }
            this.callback = null;
            this.context = null;
            if (this.autoDestory) {
                this.gameObject.destroy();
            }
        };
        MovieClip.prototype.updateFrame = function () {
            this.nextUpdateTime += this.interval;
            if (this.isReverse && this.frameIndex <= 1) {
                this.stop();
                this.dispatch();
                //this.dispatchEventWith(egret.Event.COMPLETE);
                return;
            }
            this.frameIndex += this.currentData.direct;
            if (this.frameIndex > this.currentData.frameCnt) {
                if (this.currentData.direct == 1 && this.currentData.backplay) {
                    this.frameIndex -= 2;
                    this.currentData.direct = -1;
                }
                else {
                    this.frameIndex = 1;
                }
                if (this.playTime == -1) {
                    //循环播放
                }
                else if (!this.currentData.backplay) //正常播放的时候 播放到最后 次数减少一次
                 {
                    //次数播放
                    this.playTime--;
                    if (this.playTime == 0) {
                        this.stop();
                        this.dispatch();
                        //this.dispatchEventWith(egret.Event.COMPLETE);
                        return;
                    }
                }
            }
            else if (this.frameIndex < 1) {
                if (this.currentData.direct == -1 && this.currentData.backplay) {
                    this.frameIndex = 1;
                    this.currentData.direct = 1;
                }
                //次数播放
                this.playTime--;
                if (this.playTime == 0) {
                    this.stop();
                    this.dispatch();
                    return;
                }
            }
            // console.log("this.frameIndex:"+this.frameIndex);
            var pngname = this.currentData.getPngName(this.frameIndex);
            this.setTexture(pngname);
        };
        MovieClip.prototype.onDestroy = function () {
            this.context = null;
            this.callback = null;
            this.actionNames = null;
            this.mcData = null;
        };
        MovieClip.prototype.update = function () {
            if (this.isPlaying) {
                while (this.game.time.scaledTime >= this.nextUpdateTime) {
                    this.updateFrame();
                    if (!this.isPlaying) {
                        break;
                    }
                }
            }
        };
        return MovieClip;
    }(qc.Behaviour));
    ps.MovieClip = MovieClip;
    qc.registerBehaviour('ps.MovieClip', MovieClip);
    MovieClip["__menu"] = 'Custom/MovieClip';
    var McData = /** @class */ (function () {
        //播放完成后返回播放
        function McData(act, fcnt, fName, backplay) {
            if (backplay === void 0) { backplay = false; }
            this.action = "1";
            //播放方向
            this.direct = 1;
            this.backplay = backplay;
            this.action = act;
            this.frameCnt = fcnt;
            if (typeof (fName) == "string") {
                this.frameName = fName;
            }
            else {
                this.frameNames = fName;
            }
        }
        McData.prototype.getPngName = function (frameIndex) {
            if (this.frameNames) {
                return this.frameNames[frameIndex - 1];
            }
            else {
                return this.frameName.replace("{0}", frameIndex.toString());
            }
        };
        return McData;
    }());
    ps.McData = McData;
})(ps || (ps = {}));
