import React from 'react';

 /*eslint-disable */ 
import playImg from 'simple-react-video/assets/play.png';
import playImg2x from 'simple-react-video/assets/play@2x.png';
 /*eslint-enable */ 

const PlayBtn = () => {
    return (<div className="vpb-wrapper" >
        <div className="video-play-button">
            <div className="icon">
                <img className='play-icon' src={playImg} srcSet={`${playImg} 1.5x, ${playImg2x} 2x`} />
            </div>
        </div>
    </div>)
};


export default PlayBtn;