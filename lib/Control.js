var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _descriptor;

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
import { observable } from 'mobx';
import { observer } from 'mobx-react';

/*eslint-disable */
import utils from './utils';
import fsImage from '../assets/fullscreen.png';
/*eslint-enable */

var Control = observer(_class = (_class2 = function (_Component) {
    _inherits(Control, _Component);

    function Control() {
        _classCallCheck(this, Control);

        var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this));

        _initDefineProp(_this, 'mute', _descriptor, _this);

        _this.preLoadBarInited = false;
        _this.toggleMuteHandle = _this.toggleMute.bind(_this);
        return _this;
    }

    _createClass(Control, [{
        key: 'progressAddControl',
        value: function progressAddControl() {
            var _this2 = this;

            if (this.progressPadBar) {
                this.progressPadBar.addEventListener('click', function (e) {
                    _this2.props.seekVideo(e.offsetX / _this2.progressPadBar.getBoundingClientRect().width * _this2.props.videoData.metadata.duration);
                });
            }
        }
    }, {
        key: 'initPreloadBar',
        value: function initPreloadBar(ref) {
            if (ref && !this.preLoadBarInited) {
                this.preLoadBarInited = true;
                this.preBar = ref;
                this.preContext = ref.getContext('2d');
                this.preBarWidth = ref.getBoundingClientRect().width;

                // set canvas's intrinsic dimensions(use style.width as extrinsic dimensions)
                this.preBar.width = this.preBarWidth;

                this.preContext.fillStyle = 'rgba(255,255,255,0)';
                this.preContext.fillRect(0, 0, this.preBarWidth, 10);
                this.preContext.fillStyle = 'rgba(255,255,255,0.5)';
            }
        }
    }, {
        key: 'toggleMute',
        value: function toggleMute() {
            this.mute = !this.mute;
            this.props.videoObj.video.muted = this.mute;
        }
    }, {
        key: 'check',
        value: function check(video, ct) {
            if (video.buffered.length > 0) {
                var bufferlength = video.buffered.length;
                this.preContext.clearRect(0, 0, this.preBarWidth, 10);
                for (var m = 0; m < bufferlength; m++) {
                    var startX = video.buffered.start(m) * (this.preBarWidth / this.props.videoData.metadata.duration);
                    var endX = video.buffered.end(m) * (this.preBarWidth / this.props.videoData.metadata.duration);
                    var width = endX - startX;

                    this.preContext.fillRect(startX, 0, width, 10);
                }
            }

            this.proBar.style.transform = 'scaleX(' + ct / this.props.videoData.metadata.duration + ')';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            // console.log('video control rerender');
            return React.createElement(
                'div',
                { className: 'controls ' + this.props.controlClass, ref: function ref(_ref6) {
                        _this3.ctrdom = _ref6;
                    } },
                React.createElement('div', { className: 'ctrl-bg' }),
                this.props.controls.progress && React.createElement(
                    'div',
                    { className: 'progress-bar', ref: function ref(_ref5) {
                            _this3.progressBar = _ref5;
                        } },
                    React.createElement('div', { className: 'progress-padding', ref: function ref(_ref) {
                            _this3.progressPadBar = _ref;_this3.progressAddControl();
                        } }),
                    React.createElement(
                        'div',
                        { className: 'progress-list' },
                        React.createElement('div', { className: 'bg bar' }),
                        React.createElement('canvas', { className: 'preload-progress-bar bar', ref: function ref(_ref2) {
                                _this3.initPreloadBar(_ref2);
                            }, height: '5' }),
                        React.createElement('div', { className: 'hover-progress-bar bar', ref: function ref(_ref3) {
                                _this3.hoverBar = _ref3;
                            } }),
                        React.createElement('div', { className: 'play-progress-bar bar', ref: function ref(_ref4) {
                                _this3.proBar = _ref4;
                            } })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'widgets' },
                    React.createElement(
                        'div',
                        { className: 'left-part' },
                        React.createElement('i', { className: 'play-pause-btn widget ' + (this.props.videoData.state.playing && 'pause'),
                            onClick: this.props.videoObj.togglePlayPauseHandle
                        }),
                        React.createElement(
                            'div',
                            { className: 'time-duration widget' },
                            utils.toHHMMSS(this.props.videoData.lastTime),
                            '/',
                            utils.toHHMMSS(this.props.videoData.metadata.duration)
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'right-part' },
                        this.props.controls.volume && React.createElement('i', { className: 'mute-btn widget ' + (this.mute && 'mute'),
                            onClick: this.toggleMuteHandle
                        }),
                        this.props.controls.fullscreen && React.createElement(
                            'div',
                            { className: 'fullscreen widget', onClick: function onClick() {
                                    {
                                        utils.toggleFullScreen(_this3.props.videoObj.video);
                                    }
                                } },
                            React.createElement('img', { src: fsImage })
                        )
                    )
                )
            );
        }
    }]);

    return Control;
}(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'mute', [observable], {
    enumerable: true,
    initializer: function initializer() {
        return true;
    }
})), _class2)) || _class;

export { Control as default };