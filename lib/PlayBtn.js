'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _play = require('./assets/play.png');

var _play2 = _interopRequireDefault(_play);

var _play2x = require('./assets/play@2x.png');

var _play2x2 = _interopRequireDefault(_play2x);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlayBtn = function PlayBtn() {
    return _react2.default.createElement(
        'div',
        { className: 'vpb-wrapper' },
        _react2.default.createElement(
            'div',
            { className: 'video-play-button' },
            _react2.default.createElement(
                'div',
                { className: 'icon' },
                _react2.default.createElement('img', { className: 'play-icon', src: _play2.default, srcSet: _play2.default + ' 1.5x, ' + _play2x2.default + ' 2x' })
            )
        )
    );
};

exports.default = PlayBtn;