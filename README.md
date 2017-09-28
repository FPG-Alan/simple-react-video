## Simple React based HTML5 video wrapper.

### Usage:

1. Install

        yarn add simple-react-video

2. Add a video

        const settings = {
            videoSrc: {video source url},
            videoExt: {video extension},
            posterSrc: {video poster image url},
            controls: {
                progress: true,
                volume: true,
                fullscreen: true,
            },
            videoClass: '',
            controlClass: '',
            flatID: ID
        };
        return <ReactVideo {...settings} ref={(ref)=>{this.videoController = ref}}/>


3. API

        requestPlay()

        requestStop()