import React from 'react';
/*eslint-disable */  
import ReactDOM from 'react-dom';
/*eslint-enable */ 

import ReactVideo from '../src';
import './style.scss';

const settings = {
    videoSrc: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    videoExt: 'mp4',
    posterSrc: 'https://media.w3.org/2010/05/sintel/poster.png',
    controls: {
        progress: true,
        volume: true,
        fullscreen: true,
    },
    // videoRadio: 1,
    videoClass: 'test',
    controlClass: 'test-ctrl',
    flatID: 0
}
ReactDOM.render(
    <ReactVideo {...settings} ref={(ref)=>{ref.requestPlay()}}/>,
    document.getElementById('main-story')
);