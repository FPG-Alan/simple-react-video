import React from 'react';

/*eslint-disable */
import playImg from '../assets/play.png';
import playImg2x from '../assets/play@2x.png';
/*eslint-enable */

var PlayBtn = function PlayBtn() {
    return React.createElement(
        'div',
        { className: 'vpb-wrapper' },
        React.createElement(
            'div',
            { className: 'video-play-button' },
            React.createElement(
                'div',
                { className: 'icon' },
                React.createElement('img', { className: 'play-icon', src: playImg, srcSet: playImg + ' 1.5x, ' + playImg2x + ' 2x' })
            )
        )
    );
};

export default PlayBtn;