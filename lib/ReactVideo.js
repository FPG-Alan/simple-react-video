var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import React, { Component } from 'react';
import { observable, autorun } from 'mobx';

/*eslint-disable */
import utils from './utils';
import Control from './Control';
import PlayBtn from './PlayBtn';
import Loading from './Loading';

import '../assets/style.css';
/*eslint-enable */

var ReactVideo = (_class = function (_Component) {
    _inherits(ReactVideo, _Component);

    function ReactVideo() {
        _classCallCheck(this, ReactVideo);

        var _this = _possibleConstructorReturn(this, (ReactVideo.__proto__ || Object.getPrototypeOf(ReactVideo)).call(this));

        _initDefineProp(_this, 'videoData', _descriptor, _this);

        _this.mouseenter = false;

        _this.nowStep = 20;
        _this.throttling = 20;
        _this.showCtr = true;
        _this.videoInited = false;

        _this.onMouseEnterHandle = _this.onMouseEnter.bind(_this);
        _this.onMouseLeaveHandle = _this.onMouseLeave.bind(_this);
        _this.onMouseClickHandle = _this.onMouseClick.bind(_this);
        _this.togglePlayPauseHandle = _this._togglePlayPause.bind(_this);
        _this.checkHandle = _this.check.bind(_this);
        return _this;
    }

    _createClass(ReactVideo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.options = Object.assign({
                controls: {}
            }, this.props);

            autorun(function () {
                if (_this2.videoData.state.actived) {
                    setTimeout(function () {
                        if (utils.platform.isDesktop) {
                            if (!_this2.mouseenter) {
                                _this2.onMouseLeaveHandle();
                            }
                        } else {
                            if (_this2.videoData.state.actived && _this2.showCtr) {
                                _this2.ctr.ctrdom.style.opacity = 0;
                                _this2.showCtr = false;
                            }
                        }
                    }, 1500);
                }
                // state drive video action
                // ---------------------------------------------
                if (_this2.videoData.state.playing) {
                    if (_this2.videoBlock) {
                        _this2.videoBlock.classList.remove('paused');
                    }
                } else {
                    if (_this2.videoBlock) {
                        _this2.videoBlock.classList.add('paused');
                        _this2.videoBlock.classList.remove('video-loading');
                    }
                }
                if (_this2.videoData.needCheck) {
                    utils.requestAF(_this2.checkHandle, _this2.props.flatID);
                } else {
                    utils.removeAf(_this2.props.flatID);
                }
                if (_this2.videoData.state.canShow) {
                    if (_this2.videoBlock) {
                        _this2.videoBlock.classList.add('active');
                    }
                }
                if (_this2.videoData.state.loading) {
                    if (_this2.videoData.state.playing) {
                        if (_this2.videoBlock) {
                            _this2.videoBlock.classList.add('video-loading');
                        }
                    }
                } else {
                    if (_this2.videoBlock) {
                        _this2.videoBlock.classList.remove('video-loading');
                    }
                }
                if (!_this2.videoData.state.actived) {
                    if (_this2.videoBlock) {
                        _this2.videoBlock.classList.remove('active');
                        _this2.videoBlock.classList.remove('video-loading');
                    }
                }

                if (_this2.videoData.metadata.radio !== 0) {
                    if (_this2.videoBlock) {
                        _this2.videoBlock.style.paddingBottom = _this2.videoData.metadata.radio * 100 + '%';
                    }
                }
            });
        }
    }, {
        key: 'initVideo',
        value: function initVideo(ref) {
            var _this3 = this;

            if (ref && !this.videoInited) {
                this.videoInited = true;
                this.video = ref;
                this.video.addEventListener('loadedmetadata', function () {
                    _this3.videoData.metadata.duration = _this3.video.duration;
                    _this3.videoData.metadata.radio = _this3.video.videoHeight / _this3.video.videoWidth;
                });
                this.video.addEventListener('canplay', function () {
                    if (_this3.videoData.requestPlay) {
                        _this3.videoData.requestPlay = false;
                        _this3.requestPlay();
                    }
                });

                this.props.afterInit && this.props.afterInit(this);
                console.log('init video , should only run once....');
            }
        }

        // control method 
        // ---------------------------------------------

    }, {
        key: 'requestPlay',
        value: function requestPlay() {
            if (this.videoInited) {
                this._playVideo();
            } else {
                this.videoData.requestPlay = true;
            }
        }
    }, {
        key: 'requestStop',
        value: function requestStop() {
            if (this.videoInited) {
                if (this.videoData.state.playing) {
                    this._stopVideo();
                }
            } else {
                this.videoData.requestPlay = false;
            }
        }
        // ---------------------------------------------

    }, {
        key: '_stopVideo',
        value: function _stopVideo() {
            this._pause(this.video);
            this.video.currentTime = 0;

            this.videoData.state.actived = false;
            this.videoData.needCheck = false;
        }
    }, {
        key: '_playVideo',
        value: function _playVideo() {
            this._play(this.video);
            this.videoData.state.actived = true;

            this.videoData.needCheck = true;
        }
    }, {
        key: '_togglePlayPause',
        value: function _togglePlayPause() {
            if (this.videoData.state.playing) {
                this._pause();
            } else {
                this._play();
            }
        }
    }, {
        key: '_play',
        value: function _play() {
            if (!this.videoData.state.loaded) {
                this.video.load();
                this.videoData.state.loaded = true;
            }
            this.video.play();
            this.video.muted = this.videoData.state.mute;

            this.videoData.state.playing = true;
        }
    }, {
        key: '_pause',
        value: function _pause() {
            this.video.pause();
            this.videoData.state.playing = false;
        }
    }, {
        key: '_seek',
        value: function _seek(t) {
            if (this.video) {
                this.video.currentTime = t;
            }
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter() {
            if (utils.platform.isDesktop) {
                this.mouseenter = true;
                if (this.ctr) {
                    if (!this.showCtr) {
                        this.ctr.ctrdom.style.opacity = 1;
                        this.showCtr = true;
                    }
                }
            }
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave() {
            if (utils.platform.isDesktop) {
                this.mouseenter = false;
                if (this.ctr) {
                    if (this.videoData.state.actived && this.showCtr) {
                        this.ctr.ctrdom.style.opacity = 0;
                        this.showCtr = false;
                    }
                }
            }
        }
    }, {
        key: 'onMouseClick',
        value: function onMouseClick() {
            if (this.videoData.state.playing) {
                if (this.ctr) {
                    if (!this.showCtr) {
                        this.ctr.ctrdom.style.opacity = 1;
                        this.showCtr = true;
                        return;
                    } else {
                        this.ctr.ctrdom.style.opacity = 0;
                        this.showCtr = false;
                    }
                }
            } else {
                if (!this.videoData.state.actived) {
                    this.requestPlay();
                } else {
                    this._togglePlayPause();
                }
            }
        }
        // ---------------------------------------------

    }, {
        key: 'check',
        value: function check() {
            if (this.nowStep == this.throttling) {
                var ct = this.video.currentTime;
                this.ctr.check(this.video, ct);
                if (ct >= 0.1) {
                    if (!this.videoData.state.canShow) {
                        this.videoData.state.canShow = true;
                    }
                }
                // loading......
                if (ct == this.videoData.lastTime) {
                    this.videoData.state.loading = true;
                    // playing
                } else {
                    this.videoData.state.loading = false;
                    this.videoData.lastTime = ct;
                }
                this.nowStep = 0;
            }
            this.nowStep = this.nowStep + 1;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return React.createElement(
                'div',
                { className: 'wrapper', onMouseEnter: this.onMouseEnterHandle, onMouseLeave: this.onMouseLeaveHandle, ref: function ref(_ref4) {
                        _this4.videoWrapper = _ref4;
                    } },
                React.createElement(
                    'div',
                    { className: 'video-block ' + this.options.videoClass, ref: function ref(_ref2) {
                            _this4.videoBlock = _ref2;if (_this4.options.videoRadio) {
                                _ref2.style.paddingBottom = _this4.options.videoRadio * 100 + '%';
                            }
                        }, onClick: utils.platform.isDesktop ? this.togglePlayPauseHandle : this.onMouseClickHandle },
                    this.options.posterSrc && React.createElement('img', { className: 'poster', src: this.options.posterSrc, onError: function onError() {
                            if (_this4.videoBlock) {
                                _this4.videoBlock.classList.add('poster-error');
                            }
                        } }),
                    React.createElement(PlayBtn, null),
                    React.createElement(Loading, null),
                    React.createElement(
                        'video',
                        { loop: true, playsInline: true, muted: true, preload: 'none', ref: function ref(_ref) {
                                _this4.initVideo(_ref);
                            }, id: this.options.flatID, onError: function onError() {
                                if (_this4.videoBlock) {
                                    _this4.videoBlock.classList.add('video-error');
                                }
                            } },
                        React.createElement('source', { src: this.options.videoSrc, type: 'video/' + this.options.videoExt })
                    )
                ),
                React.createElement(Control, _extends({}, this.options, { videoData: this.videoData, seekVideo: this._seek.bind(this), videoObj: this, ref: function ref(_ref3) {
                        _this4.ctr = _ref3;
                    } }))
            );
        }
    }]);

    return ReactVideo;
}(Component), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'videoData', [observable], {
    enumerable: true,
    initializer: function initializer() {
        return {
            metadata: {
                duration: 0,
                radio: 0
            },
            state: {
                loaded: false,
                mute: true,
                loading: false,
                canShow: false,
                actived: false,
                playing: false
            },
            needCheck: false,
            lastTime: 0,
            requestPlay: false
        };
    }
})), _class);
export { ReactVideo as default };