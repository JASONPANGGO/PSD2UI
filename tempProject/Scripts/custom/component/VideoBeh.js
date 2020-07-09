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
var VideoEvent;
(function (VideoEvent) {
    VideoEvent["PLAY_STAET"] = "playStart";
    VideoEvent["PLAY_COMPLETE"] = "playComplete";
})(VideoEvent || (VideoEvent = {}));
;
/**
 * 交互视频组件
 * @description 交互视频组件，交互视频模板使用
 * @author JingBin
 */
var VideoBeh = /** @class */ (function (_super) {
    __extends(VideoBeh, _super);
    function VideoBeh(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.bgUrl = "resource/texture/pb_bg.jpg";
        _this.videoUrl = "resource/video/p_v.ts";
        /** 视频播放类型：1:交互后播放，2:播放后交互, 3:循环播放 */
        _this.playType = 1;
        _this.eventDisp = new ps.EventDispatcher();
        /** 序列化 */
        _this.serializableFields = {
            bgUrl: qc.Serializer.STRING,
            videoUrl: qc.Serializer.STRING,
            playType: qc.Serializer.NUMBER,
        };
        return _this;
    }
    /** 试玩初始化的处理 */
    VideoBeh.prototype.onInit = function () {
        //在这里初始化游戏场景需要的东西
        this.gameDiv = document.getElementById("gameDiv");
        if (qici.config.editor || this.isChartboost) {
            this.game.timer.loop(200, this._update, this);
        }
        this.initBg();
        // this.resieBg();
        this.loadVideo();
    };
    /** 试玩开始时的处理 */
    VideoBeh.prototype.onStart = function () {
        this.isGameStart = true;
        this.gameStart();
    };
    VideoBeh.prototype.onResize = function () {
        // this.resieBg();
    };
    VideoBeh.prototype.resetGameStart = function () {
        this.isGameStart = false;
        this.gameStart();
    };
    VideoBeh.prototype.gameStart = function () {
        // console.info("gameStart", this.playType);
        if (!this.player) {
            return;
        }
        if (!this.videoLoaded) {
            return;
        }
        if (!this.isGameStart) {
            return;
        }
        this.videoEle.style.display = "block";
        this.player.stop();
        if (this.playType == void 0) {
            this.playType = 1;
        }
        switch (this.playType) {
            //交互后播放
            case 1:
                this.gameObject.addListenerOnce(qc_game.input.onPointerDown, this.touchStage, this);
                break;
            //播放后交互
            case 2:
                this.playVideo();
                break;
            //循环播放
            case 3:
                this.playVideo();
                this.gameObject.addListenerOnce(qc_game.input.onPointerDown, this.touchStage, this);
                break;
        }
    };
    /** 试玩结束时的处理 */
    VideoBeh.prototype.onEnd = function () {
    };
    /** 再来一次时的处理(onInit后,onStart前) */
    VideoBeh.prototype.onRetry = function () {
    };
    VideoBeh.prototype.update = function () {
        // console.log("update");
        if (this.isChartboost) {
            return;
        }
        this._update();
    };
    VideoBeh.prototype.refresh = function () {
        // console.log("refresh");
        this.resetGameStart();
    };
    VideoBeh.prototype.playVideo = function () {
        var _this = this;
        this.eventDisp.dispatch(VideoEvent.PLAY_STAET);
        var player = this.player;
        player.loop = false;
        this.playContinue();
        this.game.timer.add(10, function () {
            _this.onTouchInstallId = _this.gameObject.addListener(qc_game.input.onPointerDown, ps.install, ps);
        });
    };
    VideoBeh.prototype.playContinue = function () {
        // console.log("playContinue", this.player);
        var player = this.player;
        player.options.onEnded = null;
        player.options.onEnded = this.playComplete.bind(this);
        player.stop();
        player.play();
        ps.Audio.stopSound("sm_sm");
        ps.Audio.playSound("sm_sm");
    };
    VideoBeh.prototype.playComplete = function () {
        // console.info("playComplete");
        this.eventDisp.dispatch(VideoEvent.PLAY_COMPLETE);
        if (this.isPlayToOver) {
            return;
        }
        switch (this.playType) {
            //交互后播放
            case 1:
            //播放后交互
            case 2:
                this.playToOver();
                break;
            //循环播放
            case 3:
                this.playContinue();
                break;
        }
    };
    VideoBeh.prototype.playToOver = function () {
        // console.info("playToOver");
        this.isPlayToOver = true;
        var player = this.player;
        player.options.onEnded = null;
        ps.Audio.stopSound("sm_sm");
        if (this.onTouchInstallId != void 0) {
            this.gameObject.removeListener(this.onTouchInstallId);
        }
        switch (this.playType) {
            //交互后播放
            case 1:
                this.startTurn();
                break;
            //播放后交互
            case 2:
                this.gameObject.addListenerOnce(qc_game.input.onPointerDown, this.touchStage, this);
                break;
            //循环播放
            case 3:
                this.startTurn();
                break;
        }
    };
    VideoBeh.prototype.touchStage = function () {
        // console.info("touchStage");
        switch (this.playType) {
            //交互后播放
            case 1:
                this.playVideo();
                break;
            //播放后交互
            case 2:
                this.startTurn();
                break;
            //循环播放
            case 3:
                this.playToOver();
                break;
        }
    };
    /** 开始转场 */
    VideoBeh.prototype.startTurn = function () {
        // console.info("touchStage");
        if (this.startTurned) {
            return;
        }
        this.startTurned = true;
        ps.gameEnd();
        ps.install();
        this.videoEle.style.display = "none";
    };
    VideoBeh.prototype._update = function () {
        if (!this.videoLoaded) {
            return;
        }
        var offsetLen = 20;
        var winW = this.getWinW;
        var winH = this.getWinH;
        if (this.isChartboost) {
            if (winW == 0 || winH == 0) {
                return;
            }
            var minV = Math.min(winW, winH);
            var scale = 750 / minV;
            var _w = Math.ceil(scale * winW);
            var _h = Math.ceil(scale * winH);
            if (Math.abs(this.currentW - _w) + Math.abs(this.currentH - _h) < offsetLen) {
                return;
            }
            // if (this.currentW == _w && this.currentH == _h) {
            // 	return;
            // }
            if (!this.gameDiv.parentNode) {
                return;
            }
            document.body.removeChild(this.gameDiv);
            this.game.timer.add(50, this.initConVideo, this);
        }
        else {
            if (this.curW !== winW || this.curH !== winH) {
                // console.log(this.curW, winW);
                this.initConVideo();
                this.curW = winW;
                this.curH = winH;
            }
        }
    };
    Object.defineProperty(VideoBeh.prototype, "getWinW", {
        get: function () {
            var winW = this.gameObject.div.offsetWidth; // window["adWidth"] || window.innerWidth;
            if (window["MW_CONFIG"]) {
                if (MW_CONFIG.channel == "vungle" /* || MW_CONFIG.channel == "dsp"*/) {
                    // const vPlayer = document.getElementById("vPlayer") as HTMLCanvasElement;
                    // winW = vPlayer.offsetWidth;
                    // } else
                    // 	if (MW_CONFIG.channel == "dsp") {
                    var body = document.body;
                    winW = body.offsetWidth;
                }
            }
            return winW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoBeh.prototype, "getWinH", {
        get: function () {
            var winH = this.gameObject.div.offsetHeight; // window["adHeight"] || window.innerHeight;
            if (window["MW_CONFIG"]) {
                if (MW_CONFIG.channel == "vungle" /* || MW_CONFIG.channel == "dsp"*/) {
                    // const vPlayer = document.getElementById("vPlayer") as HTMLCanvasElement;
                    // winH = vPlayer.offsetHeight;
                    // 	} else
                    // if (MW_CONFIG.channel == "dsp") {
                    // 		const _winH = this._getWinH;
                    // 		if (_winH != void 0) {
                    // 			winH = _winH;
                    // 		} else {
                    var body = document.body;
                    winH = body.offsetHeight;
                    // 		}
                }
            }
            return winH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoBeh.prototype, "isChartboost", {
        get: function () {
            return /*window["MW_CONFIG"] && MW_CONFIG.channel == "dsp" &&*/ window["OMG"] && window["OMG"].config && window["OMG"].config.adx === "chartboost" && typeof window["mraid"] === "undefined";
        },
        enumerable: true,
        configurable: true
    });
    VideoBeh.prototype.initBg = function () {
        var bgEle = this.gameObject.div;
        var urlStr = this.bgUrl;
        var url = getAssestByUrl(urlStr);
        bgEle.style.background = "url(" + url + ")";
        bgEle.style.backgroundRepeat = "no-repeat";
        bgEle.style.backgroundPosition = "center";
        bgEle.style.backgroundSize = "cover";
        bgEle.style.webkitBackgroundSize = "cover";
    };
    // private resieBg() {
    //     const bgEle = this.gameObject.div;
    //     // console.log("resizeBg", bgEle);
    //     bgEle.style.left = "0px";
    //     bgEle.style.top = "0px";
    // }
    VideoBeh.prototype.loadVideo = function () {
        // ps.Print.purple("loadVideo");
        var urlStr = this.videoUrl;
        var url = urlStr;
        var videoEle = this.videoEle;
        if (!this.videoEle) {
            videoEle = this.videoEle = document.createElement("canvas");
        }
        videoEle.style.display = "none";
        var player = this.player = videoEle["player"] = new JSMpeg.Player(url, {
            canvas: videoEle,
            disableWebAssembly: true,
            onSourceCompleted: this.loadVideoComplete.bind(this),
            progressive: false,
        });
        // player.loop = false;
        // player.startLoading();
        player.stop();
        this.gameObject.div.appendChild(videoEle);
    };
    VideoBeh.prototype.loadVideoComplete = function (player) {
        ps.Print.purple("loadVideoComplete");
        // console.log(player);
        this.videoLoaded = true;
        this.gameStart();
    };
    /** 初始化视频容器 */
    VideoBeh.prototype.initConVideo = function () {
        this.fitDOMElementInArea(this.videoEle);
    };
    /** 适配 DOM 节点 */
    VideoBeh.prototype.fitDOMElementInArea = function (ele) {
        if (!ele) {
            return;
        }
        // let styleVal: string = "";
        if (!ele["_fitLayaAirInitialized"]) {
            ele["_fitLayaAirInitialized"] = true;
            ele.style.transformOrigin = ele.style.webkitTransformOrigin = "left top";
            ele.style.position = "absolute";
        }
        var rotate = 0;
        var winW = this.getWinW;
        var winH = this.getWinH;
        var s1 = winW / ele.width;
        var s2 = winH / ele.height;
        var scale = Math.min(s1, s2);
        scale = Mathf.keepDecimal(scale, 2, "ceil");
        var left = Mathf.keepDecimal((winW - ele.width * scale) / 2, 0);
        var top = Mathf.keepDecimal((winH - ele.height * scale) / 2, 0);
        // styleVal += "; transform: scale(" + scale + "," + scale + ") rotate(" + rotate + "deg)";
        // ele.setAttribute("style", styleVal);
        ele.style.transform = ele.style.webkitTransform = "scale(" + scale + "," + scale + ") rotate(" + rotate + "deg)",
            // ele.style.width = GameMgr.stage.stageWidth + "px",
            // ele.style.height = GameMgr.stage.stageHeight + "px",
            ele.style.left = left + "px",
            ele.style.top = top + "px";
    };
    return VideoBeh;
}(ps.Behaviour));
qc.registerBehaviour('ps.VideoBeh', VideoBeh);
VideoBeh["__menu"] = 'Custom/VideoBeh';
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
