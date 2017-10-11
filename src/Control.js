import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

 /*eslint-disable */ 
import utils from './utils';
import fsImage from '../assets/fullscreen.png';
 /*eslint-enable */ 

@observer
export default class Control extends Component{
    @observable mute = true;
    constructor() {
        super();
        this.preLoadBarInited = false;
        this.toggleMuteHandle = this.toggleMute.bind(this);
    }
    progressAddControl() {
        if (this.progressPadBar) {
            this.progressPadBar.addEventListener('click', (e) => {
                this.props.seekVideo((e.offsetX / this.progressPadBar.getBoundingClientRect().width) * this.props.videoData.metadata.duration);
            });
        }
    }
    initPreloadBar(ref) {
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
    toggleMute() {
        this.mute = !this.mute;
        this.props.videoObj.video.muted = this.mute;
    }

    check(video, ct){
        if (video.buffered.length > 0) {
            let bufferlength = video.buffered.length;
            this.preContext.clearRect(0, 0, this.preBarWidth, 10);
            for (let m = 0; m < bufferlength; m++) {
                let startX = video.buffered.start(m) * (this.preBarWidth / this.props.videoData.metadata.duration);
                let endX = video.buffered.end(m) * (this.preBarWidth / this.props.videoData.metadata.duration);
                let width = endX - startX;

                this.preContext.fillRect(startX, 0, width, 10);
            }
        }

        this.proBar.style.transform = `scaleX(${ct / this.props.videoData.metadata.duration})`;
    }
    render() {
        // console.log('video control rerender');
        return (
            <div className={`controls ${this.props.controlClass}`} ref={(ref) => { this.ctrdom = ref; }}>
                <div className='ctrl-bg'></div>
                {this.props.controls.progress && <div className='progress-bar' ref={(ref) => { this.progressBar = ref; }}>
                    <div className='progress-padding' ref={(ref) => { this.progressPadBar = ref; this.progressAddControl() }}></div>
                    <div className='progress-list'>
                        <div className='bg bar'></div>
                        <canvas className='preload-progress-bar bar' ref={(ref) => { this.initPreloadBar(ref) }} height='5'></canvas>
                        <div className='hover-progress-bar bar' ref={(ref) => { this.hoverBar = ref }}></div>
                        <div className='play-progress-bar bar' ref={(ref) => { this.proBar = ref }}></div>

                    </div>
                </div>}

                <div className='widgets'>
                    <div className='left-part'>
                        <i className={`play-pause-btn widget ${this.props.videoData.state.playing && 'pause'}`}
                            onClick={this.props.videoObj.togglePlayPauseHandle}
                        ></i>
                        <div className='time-duration widget'>{utils.toHHMMSS(this.props.videoData.lastTime)}/{utils.toHHMMSS(this.props.videoData.metadata.duration)}</div>
                    </div>

                    <div className='right-part'>
                        {this.props.controls.volume && <i className={`mute-btn widget ${this.mute && 'mute'}`}
                            onClick={this.toggleMuteHandle}
                        >
                        </i>}
                        {this.props.controls.fullscreen && <div className="fullscreen widget" onClick={() => {
                            { utils.toggleFullScreen(this.props.videoObj.video); }
                        }}><img src={fsImage} />
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}