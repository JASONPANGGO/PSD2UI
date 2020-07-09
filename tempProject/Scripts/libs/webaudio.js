/*
 * Copyright (C) 2013, Intel Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var jwv = "2.3.0";

var jWebAudio = function () {
    if (window.hasOwnProperty('AudioContext')) {
        this.context = new AudioContext();
    } else if (window.hasOwnProperty('webkitAudioContext')) {
        this.context = new webkitAudioContext();
    } else {
        this.context = null;
        console.error('Web audio is not supported in current ' +
            'web browser. Please try with the latest' +
            ' Chrome.');
    }




};
jWebAudio = new jWebAudio();
var triggerSoundStr = "";
jWebAudio.SoundEngine = function () {
    console.log("SoundEngine");

    this.soundArray = [];
    triggerSoundStr = "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";

    if (window.MW_CONFIG) {

        this.dingSound = this.addSoundSource({
            'data': triggerSoundStr,
            'preLoad': true,
            'loop': false,
            'multishot': true,
            'playtime': 1
        });
    }


};

jWebAudio.SoundEngine.prototype = {
    /* Create new Sound in `soundArray`.
     * `options`: {'url': ..., 'preLoad': ..., 'callback':..., 
     * 'multishot': ..., `finish`: ...}
     * Note that if there is already sound in current div,
     * it will be destroyed and a new one will be created.
     * `url`: file location of the sound
     * `preLoad`: load instantly if true, else will load when call `load`
     *            or `play`. Default false.
     * `callback`: function to be called after load, if preLoad. Note that if 
     *             url is an array, callback will be called when all sounds are
     *             loaded.
     * `multishot`: true if to allow play multi times with the same sound.
     *             Default false.
     * `finish`: function to be called when sound plays to the end, if is not
     *              multishot.
     * Returns sound object or array of objects accordingly
     */
    addSoundSource: function (options) {
        if (typeof options !== 'object' || (!options.hasOwnProperty('url') && !options.hasOwnProperty('data'))) {
            console.error('Error url in addSoundSource.');
            return;
        }
        if (options.preLoad !== true) {
            options.preLoad = false;
        }
        if (typeof options.callback !== 'function'
            && typeof options.callback !== 'object') {
            options.callback = null;
        }
        if (options.multishot !== true) {
            options.multishot = false;
        }
        if (options.playtime == undefined) {
            options.playtime = -1;
        }

        if (typeof options.url === 'string') {
            if (window.hasBase64()) {
                var base64 = window.getAssestByUrl(options.url);
                options.data = base64;
            }
            this.soundArray.push(new jWebAudio.SoundSource(
                this.soundArray.length, options));
            return this.soundArray[this.soundArray.length - 1];

        } else if (typeof options.data === 'string') {
            this.soundArray.push(new jWebAudio.SoundSource(
                this.soundArray.length, options));
            return this.soundArray[this.soundArray.length - 1];

        }
        else if (typeof options.url === 'object') {
            // Array of urls
            if (options.preLoad) {
                // Change callback, call callback when all are loaded.
                var totalCount = options.url.length;
                var count = 0;
                var realCallback = options.callback;
                options.callback = function () {
                    ++count;
                    if (count === totalCount) {
                        // last loaded
                        if (realCallback) {
                            realCallback();
                        }
                    }
                };
            }
            var start = this.soundArray.length;
            var urls = options.url.slice();
            for (var i in options.url) {
                options.url = urls[i];
                this.soundArray.push(new jWebAudio.SoundSource(
                    this.soundArray.length, options));
            }
            var returnArr = [];
            for (var i = start; i < this.soundArray.length; ++i) {
                returnArr[i - start] = this.soundArray[i];
            }
            return returnArr;
        }
    },

    /* Stops and destroys a sound in this element.
     * This function should be called when the sound is sure to be not 
     * used again.
     * `id`: id in jWebAudio.SoundEngine.soundArray
     */
    destroySound: function (id) {
        if (this.soundArray[id]) {
            if (this.soundArray[id].isLoaded) {
                this.soundArray[id].stop();
            }
            delete this.soundArray[id];
        }
    }
};



/* Constructor should not be called other than by jWebAudio.SoundEngine
 * `id`: id in jWebAudio.SoundEngine.soundArray
 * `options`: {'url': ..., 'preLoad': ..., 'callback':..., 'multishot': ...}
 * `url`: file location of the sound
 * `preLoad`: load instantly if true, else will load when call `load`
 *            or `play`. Default false.
 * `callback`: function to be called after loaded, only useful if preLoad
 * `multishot`: true if to allow play multi times with the same sound.
 *              Default false.
 * `finish`: function to be called when sound plays to the end, if is not
 *              multishot.
 * `options` also contain sound options like muted, loop...
 */
jWebAudio.SoundSource = function (id, options) {
    this.id = options.id;
    this.url = options.url;
    this.multishot = options.multishot;
    this.isLoaded = false;
    this.options = options; // used only to load
    this.finish = options.finish;
    this.playtime = options.playtime;

    var self = this;
    this.sound = null;

    if (options.preLoad === true) {
        this.load(options.callback);
    }
};

/* Load content of audio 
 * `callback`: function to be called after loaded.
 */
jWebAudio.SoundSource.prototype.load = function (callback) {
    if (!this.isLoaded) {

        if (this.options.data) {
            //直接从base64里面转化成音频 by 神奇小飞侠
            var buf = basedecode(this.options.data);
            var self = this;
            jWebAudio.context.decodeAudioData(
                buf, function (buffer) {
                if (self.multishot) {
                    self.sound = new jWebAudio.WebAudioMultishotSound(
                        buffer);
                } else {
                    self.sound =
                        new jWebAudio.WebAudioSound(
                            buffer, self.finish);
                }
                self.sound.options = self.options;
                self.isLoaded = true;
                if (self.options.callback) {
                    self.options.callback();
                }
                return true;
            }, function () {
                console.error('Cannot decode: ' + self.url);
                return false;
            });

        } else {

            //加载url
            var request = new XMLHttpRequest();
            request.open("GET", this.url, true);
            request.responseType = "arraybuffer";

            var self = this;
            request.onload = function () {
                var _response = request.response;
                jWebAudio.context.decodeAudioData(
                    _response, function (buffer) {
                    if (self.multishot) {
                        self.sound = new jWebAudio.WebAudioMultishotSound(
                            buffer);
                    } else {
                        self.sound =
                            new jWebAudio.WebAudioSound(
                                buffer, self.finish);
                    }
                    self.sound.options = self.options;
                    self.isLoaded = true;
                    if (self.options.callback) {
                        self.options.callback();
                    }
                    return true;
                }, function () {
                    console.error('Cannot decode: ' + self.url);
                    return false;
                });
            };

            request.onerror = function () {
                console.error("Load error");
            };

            request.send();

        }


    }
};


var basedecode = function (base64) {
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
};



/*** Helper functions ***/
/* Make Child class extends Parent class */
jWebAudio.extend = function (Child, Parent) {
    var P = function () { };
    P.prototype = Parent.prototype;
    Child.prototype = new P();
    Child.prototype.constructor = Child;
};

/* Merge right into left with properties existing in left */
jWebAudio.leftMerge = function (left, right) {
    for (var i in right) {
        if (left.hasOwnProperty(i)) {
            if (typeof left[i] === 'object') {
                if (typeof right[i] === 'object') {
                    leftMerge(left[i], right[i]);
                } // ignore if right[i] is not object
            } else {
                left[i] = right[i];
            }
        }
    }
};



/* Basic control of sound */
jWebAudio.Sound = function () {
    // Play status
    this.STOPPED = 0;
    this.PLAYING = 1;
    this.PAUSED = 2;

    // Default fadeIn and fadeOut time
    var defaultFadeInTime = 3;
    var defaultFadeOutTime = 3;

    var defaultVolume = 100;
    var self = this;
    // Default options for sound
    var options = {
        'loop': false,
        'loopGap': 0,
        'muted': false,
        'volume': 100,

        // fade in and out are not for multishot sound
        'fadeIn': false,
        'fadeOut': false,
        'fadeInTime': defaultFadeInTime,
        'fadeOutTime': defaultFadeOutTime
    };
    /* Get options */
    this.getOptions = function () {
        return options;
    };
    this.__defineGetter__('options', this.getOptions);
    /* Set options */
    this.setOptions = function (arg) {
        if (arg) {
            if (typeof arg.muted === 'boolean' &&
                arg.muted !== options.muted) {
                self.setMuted(arg.muted);
            }
            if (typeof arg.volume === 'number' &&
                arg.volume !== options.volume) {
                self.setVolume(arg.volume);
            }
            if (typeof arg.fadeIn === 'boolean') {
                options.fadeIn = arg.fadeIn;
                self.setFadeIn(options.fadeIn, arg.fadeInTime);
            }
            if (typeof arg.fadeOut === 'boolean') {
                options.fadeOut = arg.fadeOut;
                self.setFadeOut(options.fadeOut, arg.fadeOutTime);
            }
            self.playtime = arg.playtime;

            // update only those with existing id
            jWebAudio.leftMerge(options, arg);
        }
    };
    this.__defineSetter__('options', this.setOptions);

    /* Set if to mute */
    this.setMuted = function (arg) {
        if (typeof arg !== 'boolean') {
            console.error('Error type of mute!');
            return;
        }
        options.muted = arg;
        if (arg) {
            gain.gain.value = 0;
        } else {
            gain.gain.value = options.volume / 100;
        }
    };
    this.getMuted = function (arg) {
        return self.options.muted;
    }

    /* Set volume */
    this.setVolume = function (arg) {
        arg = +arg;
        if (isNaN(arg)) {
            console.error('Error type of volume in setVolume');
            return;
        }
        if (arg != 0) {
            this.defaultVolume = arg;
        }

        options.volume = arg;
        gain.gain.value = arg / 100;
    };
    /* Get volume */
    this.getVolume = function () {
        return self.options.volume;
    };

    /* Get Loop */
    this.getLoop = function () {
        return self.options.loop;
    };

    var ctx = jWebAudio.context;

    var gain = ctx.createGain();
    this.__defineGetter__('gain', function () {
        return gain;
    });

    var effectArr = [];
    var effectName = [];

    /* Add sound effect */
    this.addEffect = function (effect) {
        if (typeof effect === 'string') {
            effect = new jWebAudio.Effect(effect);
        }
        if (!(effect instanceof jWebAudio.Effect)) {
            console.error('Error in addEffect: effect is not instance of Effect');
            return;
        }

        var first = firstEffect();
        var last = lastEffect();

        if (first !== null) {
            // Effect exists already
            // Disconnect last from dest
            last.outNode.disconnect();
            // Connect last to new effect
            last.outNode.connect(effect.inNode);
        } else {
            // First effect
            // Disconnect gain to dest
            gain.disconnect();
            // Connect gain to new effect
            gain.connect(effect.inNode);
        }
        // Connect new effect to dest
        effect.outNode.connect(ctx.destination);

        effectArr.push(effect);
        effectName.push(effect.getName());

        return effectArr.length - 1;
    };

    /* Get sound names */
    this.getEffectNames = function () {
        return effectName;
    };

    /* Get effect */
    this.getEffect = function (id) {
        return effectArr[id];
    };

    /* Delete effect with given index */
    this.deleteEffect = function (id) {
        if (effectArr[id] !== undefined) {
            // Find the nearest left effect
            var left = null;
            for (var i = id - 1; i >= 0; --i) {
                if (effectArr[i] !== undefined) {
                    left = effectArr[i].outNode;
                    break;
                }
            }
            // Find the nearst right effect
            var right = ctx.destination;
            for (var i = id + 1; i < effectArr.length; ++i) {
                if (effectArr[i] !== undefined) {
                    right = effectArr[i].inNode;
                    break;
                }
            }

            if (left === null) {
                // Connect to gain
                gain.disconnect();
                gain.connect(right);
            } else {
                // Connect to left
                left.disconnect();
                left.connect(right);
            }

            delete effectArr[id];
            delete effectName[id];
        }
    };

    /* Clear all effects */
    this.clearAllEffects = function () {
        for (var i = effectArr.length - 1; i >= 0; --i) {
            if (effectArr[i] !== undefined) {
                gain.disconnect();
                effectArr[i].outNode.disconnect();
                gain.connect(ctx.destination);

                effectArr = [];
                effectName = [];
                return;
            }
        }
    };

    /* Get left-most effect that is not undefined */
    function firstEffect() {
        for (var i = 0; i < effectArr.length; ++i) {
            if (effectArr[i] !== undefined) {
                return effectArr[i];
            }
        }
        return null;
    }

    /* Get right-most effect that is not undefined */
    function lastEffect() {
        for (var i = effectArr.length - 1; i >= 0; --i) {
            if (effectArr[i] !== undefined) {
                return effectArr[i];
            }
        }
        return null;
    }

    gain.connect(ctx.destination);
};

/* Web audio implementation of Sound class, extends Sound 
 * `finishFunc`: callback function to be called when sound is finished
 */
jWebAudio.WebAudioSound = function (buffer, finishFunc) {
    jWebAudio.Sound.call(this);

    var self = this; // for inner functions to call WebAudioSound

    var _ctx = jWebAudio.context;

    // Gain node for fading in and out
    var _fadeGain = _ctx.createGain();
    // Source connect _fadeGain, _fadeGain connect gain, 
    // gain connect sound effect gains
    _fadeGain.connect(self.gain);

    var _source = null;

    var _buffer = buffer;
    /* Get duration */
    this.__defineGetter__('duration', function () {
        return _buffer.duration;
    });

    var _offset = 0;
    /* Get offset */
    this.__defineGetter__('offset', function () {
        if (_state === self.PLAYING) {
            return (_ctx.currentTime - _startTime + _offset);
        }
        return _offset;
    });
    /* Seek position */
    this.seek = function (arg) {
        if (typeof arg !== 'number' || arg < 0 || arg > _buffer.duration) {
            console.error('Error arg in WebAudioSound.');
            return;
        }
        var wasPlaying = _state;
        //stop();



        var a = _source;

        setTimeout(function () {
            if (a) {
                a.stop(0)
                a = null;
            }

        }, 1000);



        _offset = arg;
        // Play if was playing
        if (wasPlaying === this.PLAYING) {
            play();
        }
    };

    var _startTime = 0;
    this.startTime = 0;
    var _state = this.STOPPED;
    /* Get state */
    this.__defineGetter__('state', function () {
        return _state;
    });

    var _finishEvent = null;
    var _fadeOutEvent = null;
    var _loopGapEvent = null;

    // Play if was not playing
    this.play = function (time) {
        if (soundIsMute) {
            return;
        }

        if (window.playsound === false) {
            return;
        }



        if (_state === self.PLAYING) {
            return;
        }
        var time = time == undefined ? 0 : time;
        play(time);
    };
    // Play without checking previous state
    function play(time) {
        var time = time == undefined ? 0 : time;
        if (time != 0) {
            _offset = time;
        }
        //console.log("startPlayTime:"+_offset);

        var duration = _buffer.duration - _offset;
        //console.log("采样率："+_buffer.sampleRate);
        _source = _ctx.createBufferSource();
        _source.buffer = _buffer;
        _source.loop = self.options.loop;
        _source.connect(_fadeGain);

        // fade in
        if (self.options.fadeIn) {
            _fadeGain.gain.setValueAtTime(
                _fadeGain.gain.minValue, _ctx.currentTime);
            _fadeGain.gain.linearRampToValueAtTime(_fadeGain.gain.maxValue,
                _ctx.currentTime + self.options.fadeInTime);
        }

        _source.start(0, _offset, duration);

        _startTime = _ctx.currentTime;
        this.startTime = _startTime;
        _state = self.PLAYING;

        // Event fired when audio come to the end
        var finishTime = function () {
            return setTimeout(function () {
                self.playtime--;
                if (self.options.loop === true || self.playtime != 0) {
                    // start from beginning
                    self.seek(0);
                    // wait for loopGap to play
                    if (self.options.loopGap && self.options.loopGap > 0) {
                        self.stop();
                        loopGapEvent = setTimeout(function () {
                            play();
                        }, self.options.loopGap * 1000);
                    }
                }
                else {
                    _offset = 0;
                    _state = self.STOPPED;
                }

                if (finishFunc) {
                    // finish function defined
                    finishFunc();
                }
            }, (duration - (0.05)) * 1000);//marks 2019 循环播放的因为 为了让他看上去无缝  就重叠播放  self.options.loop === true?1:0
        };
        _finishEvent = finishTime();

        // Fade out when play to the end
        if (self.options.fadeOut === true) {
            var fadeOutFunc = function () {
                return setTimeout(function () {
                    _fadeGain.gain.setValueAtTime(_fadeGain.gain.maxValue,
                        _ctx.currentTime);
                    _fadeGain.gain.linearRampToValueAtTime(_fadeGain.gain.minValue,
                        _ctx.currentTime + self.options.fadeOutTime);
                }, (duration - self.options.fadeOutTime) * 1000);
            };
            _fadeOutEvent = fadeOutFunc();
        }
    }

    this.pause = function () {
        if (_state !== self.PLAYING) {
            return;
        }

        stop();
        _state = self.PAUSED;
    };

    // Stop if is not stopped
    this.stop = function () {
        if (_state === self.STOPPED) {
            return;
        }

        function nodeOff() {
            stop();
            _offset = 0;
            _state = self.STOPPED;
        }

        // Fade out
        if (self.options.fadeOut) {
            var timeLeft = self.options.fadeOutTime;
            _fadeGain.gain.linearRampToValueAtTime(
                _fadeGain.gain.minValue, _ctx.currentTime + timeLeft);
            // Stop source after faded out
            setTimeout(function () {
                nodeOff();
            }, timeLeft * 1000);
        } else {
            // Stop source immediately
            nodeOff();
        }
    };
    // Stop playing without checking
    // Note that is function makes the sound not playing, may either
    // caused by stopping or pausing the sound
    this.endTime = 0;
    function stop() {
        if (_state === self.PLAYING) {
            _source.stop(0)
            _source = null;

            _offset += (_ctx.currentTime - _startTime);

            self.endTime = _offset;
            clearTimeout(_finishEvent);
            clearTimeout(_fadeOutEvent);
        }
    }

    /* Set fade in */
    this.setFadeIn = function (ifFadeIn, fadeInTime) {
        if (typeof ifFadeIn === 'boolean') {
            self.options.fadeIn = ifFadeIn;
            // Use fade time if defined, use default time if not
            if (typeof fadeInTime === 'number') {
                self.options.fadeInTime = fadeInTime;
            }
        } else {
            self.options.fadeOut = ifFadeOut;
            console.error('Error type in setFadeIn.');
        }
    };

    /* Set fade out */
    this.setFadeOut = function (ifFadeOut, fadeOutTime) {
        if (typeof ifFadeOut === 'boolean') {
            // Use fade time if defined, use default time if not
            if (typeof fadeOutTime === 'number') {
                self.options.fadeOutTime = fadeOutTime;
            }
        }
    };
};
// Extends Sound
jWebAudio.extend(jWebAudio.WebAudioSound, jWebAudio.Sound);


/* Web audio that allows to play under multi-shot, extends Sound */
jWebAudio.WebAudioMultishotSound = function (buffer) {
    jWebAudio.Sound.call(this);

    var _ctx = jWebAudio.context;

    var _buffer = buffer;
    var _playedSrc = [];

    var self = this;

    this.play = function () {
        var src = _ctx.createBufferSource();
        src.buffer = _buffer;
        src.loop = this.loop;

        src.connect(self.gain);
        src.start(0, 0);

        _playedSrc.push(src);
    };

    this.stop = function () {
        _playedSrc.forEach(function (element) {
            element.stop();
            element.disconnect();
        });

        _playedSrc = [];
    };
};
// Extends Sound
jWebAudio.extend(jWebAudio.WebAudioMultishotSound, jWebAudio.Sound);



/* Sound effects */
jWebAudio.Effect = function (name) {
    if (name === 'telephonize') {
        return new jWebAudio.Filter(name, [{
            'type': jWebAudio.Filter.prototype.LOWPASS,
            'frequency': 2000.0
        }, {
            'type': jWebAudio.Filter.prototype.HIGHPASS,
            'frequency': 500.0
        }]);

    } else if (name === 'cathedral') {
        return new jWebAudio.Filter(name, [{
            'type': jWebAudio.Filter.prototype.BANDPASS,
            'frequency': 3000.0
        }, {
            'type': jWebAudio.Filter.prototype.ALLPASS,
            'frequency': 1000.0
        }]);

    } else if (name === '3d') {
        return new jWebAudio.Spatiality();

    } else {
        console.error('Effect name: "' + name + '" not found');
    }
}



/* Sound filters, extends Effect */
jWebAudio.Filter = function (name, arg) {
    var effectName = name;
    this.getName = function () {
        return effectName;
    };

    var i, j, configArr = [], config, filter,
        _nodes = [];

    if (arg instanceof Array) {
        configArr = arg;
    } else if (arg instanceof Object) {
        configArr.push(arg);
    } else {
        return;
    }

    var ctx = jWebAudio.context;
    for (i = 0; i < configArr.length; ++i) {
        config = configArr[i];
        if (config.type >= 0 && config.type <= 7) {
            filter = ctx.createBiquadFilter();
            filter.type = config.type;
            filter.frequency.value = config.frequency;
            filter.Q.value = config.Q;
            filter.gain.value = config.gain;

            _nodes.push(filter);
        }
    }

    for (i = 0; i < _nodes.length - 1; ++i) {
        j = i + 1;
        _nodes[i].connect(_nodes[j]);
    }

    this.__defineGetter__('inNode', function () {
        return _nodes[0];
    });

    this.__defineGetter__('outNode', function () {
        return _nodes[_nodes.length - 1];
    });
}
// Filter extends Effect
jWebAudio.extend(jWebAudio.Filter, jWebAudio.Effect);

jWebAudio.Filter.prototype.LOWPASS = 0;
jWebAudio.Filter.prototype.HIGHPASS = 1;
jWebAudio.Filter.prototype.BANDPASS = 2;
jWebAudio.Filter.prototype.LOWSHELF = 3;
jWebAudio.Filter.prototype.HIGHSHELF = 4;
jWebAudio.Filter.prototype.PEAKING = 5;
jWebAudio.Filter.prototype.NOTCH = 6;
jWebAudio.Filter.prototype.ALLPASS = 7;



/* 3D sound, extends effect */
jWebAudio.Spatiality = function () {
    var ctx = jWebAudio.context;
    this.soundObject = ctx.createPanner();

    var self = this;
    this.__defineGetter__('inNode', function () {
        return self.soundObject;
    });

    this.__defineGetter__('outNode', function () {
        return self.soundObject;
    });
};
jWebAudio.extend(jWebAudio.Spatiality, jWebAudio.Effect);

jWebAudio.Spatiality.prototype.getName = function () {
    return '3d';
};

var soundIsMute = false;
window.mvSoundMgr = new jWebAudio.SoundEngine();


var soundLoadAutoPlay;
//gameStart的时候调用播放
function playEnterSound(url, withPlay, loadAutoPlay) {
    if (window.playsound === false) {
        return;
    }

    var playsound;
    if (withPlay === false) {
        playsound = false;
    } else {
        playsound = withPlay.length > 0 && withPlay[0] !== undefined ? withPlay[0] : true;
    }

    if (loadAutoPlay == undefined) {
        loadAutoPlay = true;
    }

    soundLoadAutoPlay = loadAutoPlay;

    //soundIsMute 是全局的 如果为false, playable直接播放背景音乐 否则点击后将这个字段
    //设置为fale并且播放背景音乐   另外音效的播放也要遵守这个规律来进行判断
    soundIsMute = !playsound;


    if (soundIsActive == false) {
        activeSound();
    }


    if (!window["bg_mp3"]) {
        window["bg_mp3"] = window["mvSoundMgr"].addSoundSource({
            'url': url,
            'preLoad': true,
            'loop': true,
            'multishot': false,
            'callback': loadBgComplete
        });
    }

}


var soundIsActive = false;
function activeSound() {
    soundIsActive = true;
    console.log("激活音乐");
    console.log("jWebAudio versions:" + jwv);
    if (window.OMG && window.OMG.config) {

        return;
    }

    if (window.MW_CONFIG && window.MW_CONFIG.end_screen_info && window.MW_CONFIG.end_screen_info.ad_type == 288) {

        if (window.mvSoundMgr.dingSound && window.mvSoundMgr.dingSound.sound) {
            console.log("触发型音效成功播放")
            window.mvSoundMgr.dingSound.sound.play();
            window.mvSoundMgr.dingSound.sound.setVolume(10);
        }


        //var buffer = jWebAudio.context.createBuffer(1, 1, 44100); 
        //var dummy = jWebAudio.context.createBufferSource(); 
        //dummy.buffer = buffer; 
        //dummy.connect(jWebAudio.context.destination); 
        //dummy.start(0); 


    } else {
        var buffer = jWebAudio.context.createBuffer(1, 1, 44100);
        var dummy = jWebAudio.context.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(jWebAudio.context.destination);
        dummy.start(0);





        //IOS低版本的波特率是全局的 如果波特率不正确 就销毁AudioContext重建一个新的
        if (jWebAudio.context.sampleRate < 400000) {
            //重新建立一个 AudioContext

            jWebAudio.context.close(); // dispose old context 
            if (window.hasOwnProperty('AudioContext')) {
                jWebAudio.context = new AudioContext();
            } else if (window.hasOwnProperty('webkitAudioContext')) {
                jWebAudio.context = new webkitAudioContext();
            } else {
                jWebAudio.context = null;
                console.error('Web audio is not supported in current ' +
                    'web browser. Please try with the latest' +
                    ' Chrome.');
            }

            var buffer = jWebAudio.context.createBuffer(1, 1, 44100);
            var dummy = jWebAudio.context.createBufferSource();
            dummy.buffer = buffer;
            dummy.connect(jWebAudio.context.destination);
            dummy.start(0);


            document.addEventListener('touchend', function (e) {
                var buffer = jWebAudio.context.createBuffer(1, 1, 44100);
                var dummy = jWebAudio.context.createBufferSource();
                dummy.buffer = buffer;
                dummy.connect(jWebAudio.context.destination);
                dummy.start(0);
            }, true);

        }

    }








}


//切换背景音乐
function changeBgMusic(url) {
    if (window.playsound === false || soundIsMute) {
        return;
    }
    if (window["bg_mp3"] && window["bg_mp3"].sound) {
        window["bg_mp3"].sound.stop();
        window["bg_mp3"] = null;
    }

    window["bg_mp3"] = window["mvSoundMgr"].addSoundSource({
        'url': url,
        'preLoad': true,
        'loop': true,
        'multishot': false,
        'callback': function () {
            if (window["bg_mp3"] && window["bg_mp3"].sound) {
                window["bg_mp3"].sound.play();
            }
        }
    });

}
//播放音效  url:resource/assets/end.mp3   playtime:播放次数 <=0 无限循环播放
function playSoundEff(url, playtime) {
    if (window.playsound === false || soundIsMute) {
        return;
    }

    if (window.soundIsPause) {
        return;
    }
    if (playtime == undefined) {
        playtime = 1;
    }


    var urlkeyArr = url.split("/");
    var urlKey = urlkeyArr[urlkeyArr.length - 1];
    urlKey = urlKey.replace(".", "_");

    if (window[urlKey] == null) {
        window[urlKey] = window["mvSoundMgr"].addSoundSource({
            'url': url,
            'preLoad': true,
            'loop': false,
            'multishot': playtime == 1,
            'playtime': playtime,
            'callback': function () {
                window[urlKey].sound.play();
            }
        });
    } else if (window[urlKey].sound) {
        window[urlKey].sound.playtime = playtime;
        window[urlKey].sound.play();


    } else {
        console.log(urlKey + "还在处理中");
    }
}

//停止  url:resource/assets/end.mp3
function stopSoundEff(url) {
    if (window.playsound === false || soundIsMute) {
        return;
    }

    var urlkeyArr = url.split("/");
    var urlKey = urlkeyArr[urlkeyArr.length - 1];
    urlKey = urlKey.replace(".", "_");

    if (window[urlKey] == null) {
        return;
    }


    if (window[urlKey].isLoaded == false) {
        window[urlKey].callback = null;
        window[urlKey].options.callback = null;
    }


    if (window[urlKey].sound) {
        window[urlKey].sound.playtime = 1;
        window[urlKey].sound.stop();
    }

}





//bg加载完成
function loadBgComplete() {


    if (soundIsMute)//DSP的静音模式
    {
        document.addEventListener('touchend', function (e) {
            console.log("点击了 播放音乐")
            soundIsMute = false;
            if (window["bg_mp3"]) {
                window["bg_mp3"].sound.play();
            }

        }, true);
    } else {
        if (soundLoadAutoPlay && window["bg_mp3"] && window["bg_mp3"].sound) {
            window["bg_mp3"].sound.play();
        }
    }
    registerListener();

}

function stopBgSound() {
    if (window["bg_mp3"] && window["bg_mp3"].sound) {
        window["bg_mp3"].sound.stop();
        return window["bg_mp3"].sound.endTime;
    }
}

function playBgSound(time) {
    var time = time == undefined ? 0 : time;
    soundLoadAutoPlay = true;
    if (window["bg_mp3"] && window["bg_mp3"].sound) {
        window["bg_mp3"].sound.play(time);
    }
}

var webIsActivate = true;
function registerListener() {
    //失去焦点


    var getDeviceType = function () {
        var e = window.navigator.userAgent;
        return {
            isAndroid: -1 < e.indexOf("Android") || -1 < e.indexOf("Adr"),
            isiOS: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        }
    }

    var onBlurHandler = function () {

        if (window.OMG && OMG.config && OMG.config.adx === 'chartboost' && getDeviceType().isiOS) {
            if (webIsActivate) {
                return;
            }
            webIsActivate = true;
            //console.log("获得焦点!!!!")

            recoveryAllSound();
        } else {
            if (!webIsActivate) {
                return;
            }
            webIsActivate = false;
            //console.log("失去焦点!!!!")
            stopAllSound();
        }


    };
    //激活
    var onFocusHandler = function () {



        if (window.OMG && OMG.config && OMG.config.adx === 'chartboost' && getDeviceType().isiOS) {
            if (!webIsActivate) {
                return;
            }
            webIsActivate = false;
            //console.log("失去焦点!!!!")
            stopAllSound();
        } else {
            if (webIsActivate) {
                return;
            }
            webIsActivate = true;
            //console.log("获得焦点!!!!")

            recoveryAllSound();
        }

    };
    var handleVisibilityChange = function () {
        if (!document[hidden]) {
            onFocusHandler();
        }
        else {
            onBlurHandler();
        }
    };
    window.addEventListener("focus", onFocusHandler, false);
    window.addEventListener("blur", onBlurHandler, false);
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    }
    else if (typeof document["mozHidden"] !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    }
    else if (typeof document["msHidden"] !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    }
    else if (typeof document["webkitHidden"] !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    else if (typeof document["oHidden"] !== "undefined") {
        hidden = "oHidden";
        visibilityChange = "ovisibilitychange";
    }
    if ("onpageshow" in window && "onpagehide" in window) {
        window.addEventListener("pageshow", onFocusHandler, false);
        window.addEventListener("pagehide", onBlurHandler, false);
    }
    if (hidden && visibilityChange) {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
}

var soundIsPause = false;

//暂停所有声音
function stopAllSound() {
    //console.log("暂停所有声音!!!!")
    soundIsPause = true;
    var list = window.mvSoundMgr;
    for (var i = 0; i < list.soundArray.length; i++) {
        var sound = list.soundArray[i].sound;
        if (sound) {
            sound.setVolume(0);
        }
    }
}

//恢复所有声音
function recoveryAllSound() {
    soundIsPause = false;
    //console.log("恢复所有声音!!!!")
    var list = window.mvSoundMgr;
    for (var i = 0; i < list.soundArray.length; i++) {
        var sound = list.soundArray[i].sound;
        if (sound) {
            sound.setVolume(sound.defaultVolume ? sound.defaultVolume : 100);
        }
    }
}

//销毁
function destorySound() {
    if (window["bg_mp3"]) {
        window["bg_mp3"].sound.stop();
        window["bg_mp3"] = null;
    }
}
