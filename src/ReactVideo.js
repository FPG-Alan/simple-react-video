import React, { Component } from 'react';
import { observable, autorun } from 'mobx';



 /*eslint-disable */
 import utils from 'simple-react-video/lib/utils';
import Control from 'simple-react-video/lib/Control';
import PlayBtn from 'simple-react-video/lib/PlayBtn';
import Loading from 'simple-react-video/lib/Loading';

import 'simple-react-video/assets/style.css';
 /*eslint-enable */ 

export default class ReactVideo extends Component {
    @observable videoData = {
        metadata: {
            duration: 0,
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
        requestPlay: false,
    }
    constructor() {
        super();
        this.mouseenter = false;

        this.nowStep = 20;
        this.throttling = 20;
        this.showCtr = true;
        this.videoInited = false;

        this.onMouseEnterHandle = this.onMouseEnter.bind(this);
        this.onMouseLeaveHandle = this.onMouseLeave.bind(this);
        this.onMouseClickHandle = this.onMouseClick.bind(this);
        this.togglePlayPauseHandle = this._togglePlayPause.bind(this);
        this.checkHandle = this.check.bind(this);
    }
    componentWillMount() {
        autorun(() => {
            /* this.actived;
            if (this.actived) {
                setTimeout(() => {
                    if (utils.platform.isDesktop) {
                        if (!this.mouseenter) {
                            this.onMouseLeaveHandle();
                        }
                    } else {
                        if (this.actived && !this.videoState.pauseLock && this.videoState.showCtr) {
                            this.ctr.ctrdom.style.opacity = 0;
                            this.videoState.showCtr = false;
                        }
                    }



                }, 500);
            } */
            // state drive video action
            // ---------------------------------------------
            if (this.videoData.state.playing) {
                if (this.videoBlock) {
                    this.videoBlock.classList.remove('paused');
                }
            } else {
                if (this.videoBlock) {
                    this.videoBlock.classList.add('paused');
                    this.videoBlock.classList.remove('video-loading');
                }
            }
            if (this.videoData.needCheck) {
                utils.requestAF(this.checkHandle, this.props.flatID);
            } else {
                utils.removeAf(this.props.flatID);
            }
            if (this.videoData.state.canShow) {
                if (this.videoBlock) {
                    this.videoBlock.classList.add('active');
                }
            }
            if (this.videoData.state.loading) {
                if (this.videoData.state.playing) {
                    if (this.videoBlock) {
                        this.videoBlock.classList.add('video-loading');
                    }
                }
            } else {
                if (this.videoBlock) {
                    this.videoBlock.classList.remove('video-loading');
                }
            }
            if(!this.videoData.state.actived){
                if(this.videoBlock){
                    this.videoBlock.classList.remove('active');
                    this.videoBlock.classList.remove('video-loading');
                }
            }
        });
    }
    initVideo(ref) {
        if (ref && !this.videoInited) {
            this.videoInited = true;
            this.video = ref;
            this.video.addEventListener('loadedmetadata', () => {
                this.videoData.metadata.duration = this.video.duration;
            });
            this.video.addEventListener('canplay', () => {
                if (this.videoData.requestPlay) {
                    this.videoData.requestPlay = false;
                    this.requestPlay();
                }
            });

            this.props.afterInit && this.props.afterInit(this);
            console.log('init video , should only run once....');
        }
    }

    // control method 
    // ---------------------------------------------
    requestPlay() {
        if (this.videoInited) {
            this._playVideo();
        } else {
            this.videoData.requestPlay = true;
        }
    }
    requestStop() {
        if (this.videoInited) {
            if (this.videoData.state.playing) {
                this._stopVideo();
            }
        } else {
            this.videoData.requestPlay = false;
        }
    }
    // ---------------------------------------------
    _stopVideo() {
        this._pause(this.video);
        this.video.currentTime = 0;

        this.videoData.state.actived = false;
        this.videoData.needCheck = false;
    }
    _playVideo() {
        this._play(this.video);
        this.videoData.state.actived = true;

        this.videoData.needCheck = true;
    }
    _togglePlayPause() {
        if (this.videoData.state.playing) {
            this._pause();
        } else {
            this._play();
        }
    }
    _play() {
        if (!this.videoData.state.loaded) {
            this.video.load();
            this.videoData.state.loaded = true;
        }
        this.video.play();
        this.video.muted = this.videoData.state.mute;

        this.videoData.state.playing = true;
    }
    _pause() {
        this.video.pause();
        this.videoData.state.playing = false;
    }
    _seek(t) {
        if(this.video){
            this.video.currentTime = t;
        }
    }


    onMouseEnter() {
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
    onMouseLeave() {
        if (utils.platform.isDesktop) {
            this.mouseenter = false;
            if (this.ctr) {
                /* if (this.actived && !this.videoState.pauseLock && this.videoState.showCtr) {
                    this.ctr.ctrdom.style.opacity = 0;
                    this.videoState.showCtr = false;
                } */
            }
        }

    }
    onMouseClick(){
        if (this.videoData.state.playing) {
            if (this.ctr) {
                if (!this.showCtr) {
                    this.ctr.ctrdom.style.opacity = 1;
                    this.showCtr = true;
                    return;
                }else{
                    this.ctr.ctrdom.style.opacity = 0;
                    this.showCtr = false;
                }

            }
        }else{
            if(!this.videoData.state.actived){
                this.requestPlay();
            }else{
                this._togglePlayPause();
            }
        }
    }
    // ---------------------------------------------

    check() {
        if (this.nowStep == this.throttling) {
            console.log('video check');
            let ct = this.video.currentTime;
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
    render() {
        console.log('video render');
        return (
            <div className='wrapper' onMouseEnter={this.onMouseEnterHandle} onMouseLeave={this.onMouseLeaveHandle} ref={(ref) => { this.videoWrapper = ref; }}>
                <div className={`video-block ${this.props.videoClass}`} ref={(ref) => { this.videoBlock = ref; }} onClick={utils.platform.isDesktop ? this.togglePlayPauseHandle : this.onMouseClickHandle}>

                    {this.props.posterSrc && <img className="poster" src={this.props.posterSrc} onError={() => {
                        if (this.videoBlock) {
                            this.videoBlock.classList.add('poster-error');
                        }
                    }} />}
                    <PlayBtn />
                    <Loading />
                    <video loop playsInline muted preload='none' ref={(ref) => { this.initVideo(ref) }} id={this.props.flatID} onError={() => {
                        if (this.videoBlock) {
                            this.videoBlock.classList.add('video-error');
                        }
                    }}>
                        <source src={this.props.videoSrc} type={`video/${this.props.videoExt}`} />
                    </video>
                </div>
                <Control {...this.props} videoData={this.videoData} seekVideo={this._seek.bind(this)} videoObj={this} ref={(ref) => { this.ctr = ref; }} />
            </div>)
    }
}