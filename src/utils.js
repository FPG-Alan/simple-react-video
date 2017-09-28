class utils {
    constructor() {
        this.AFFunArr = [];
        this.engineRunning = false;

        this.setPlatformDetect();
        this.setRequestAnimation();
    }
    setPlatformDetect() {
        var ua = window.navigator.userAgent.toLowerCase();

        this.platform = {
            hasTouch: ('ontouchstart' in window),
            isiPod: ua.match(/ipod/i) !== null,
            isiPad: ua.match(/ipad/i) !== null,
            isiPhone: ua.match(/iphone/i) !== null,
            isAndroid: ua.match(/android/i) !== null,
            isBustedAndroid: ua.match(/android 2\.[12]/) !== null,
            isIE: window.navigator.appName.indexOf("Microsoft") != -1,
            isIE10: ua.match(/msie 10/) !== null,
            isIE11: ua.match(/trident.*rv:11\./) !== null,
            isEdge: ua.indexOf('edge/') > 0,
            isChrome: ua.match(/Chrome/gi) !== null,
            isFirefox: ua.match(/firefox/gi) !== null,
            isSafari: ua.indexOf('safari') != -1 && ua.indexOf('chrome') == -1,
            isWebkit: ua.match(/webkit/gi) !== null,
            isGecko: ua.match(/gecko/gi) !== null,
            isOpera: ua.match(/opera/gi) !== null,
            isMac: ua.match('mac') !== null,
            isIOS8: ua.match(/(iphone|ipod|ipad).* os 8_/) !== null,
            isIOS9: ua.match(/(iphone|ipod|ipad).* os 9_/) !== null,

            supportsSvg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
        }

        this.platform.isMobile = this.platform.isiPhone || this.platform.isAndroid;
        this.platform.ios_webview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        this.platform.isTablet = this.platform.isiPad;
        this.platform.isDesktop = !(this.platform.isMobile || this.platform.isTablet);
        this.platform.isIE = this.platform.isIE10 || this.platform.isIE11 || this.platform.isEdge;
        this.platform.isIos = this.platform.isiPhone || this.platform.isiPad;

        this.platform.isRetina = (window.devicePixelRatio > 1);

        this.platform.sunsumOrigin = (ua.indexOf('samsungbrowser')>=0);
        function getChromeVersion() {
            var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            return raw ? parseInt(raw[2], 10) : false;
        }
        var chromeVersion = getChromeVersion();

        this.platform.BgVideo = true;
        if (chromeVersion) {
            if (chromeVersion < 53 && this.platform.isMobile) {
                this.platform.BgVideo = false;
            }
        }
        if (this.platform.isIOS9) {
            this.platform.BgVideo = false;
        }
        if (this.platform.ios_webview) {
            this.platform.BgVideo = false;
        }

        if(this.platform.isMobile){
            this.platform.BgVideo = ('playsInline' in document.createElement('video'));
        }
    }
    setRequestAnimation() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }
    toHHMMSS(num){
        let sec_num = parseInt(num, 10); // don't forget the second param
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);
    
        // if (hours   < 10) {hours   = "0"+hours;}
        // if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        return minutes+':'+seconds;
    }
    requestAF(func, ID){
        for(let i = 0,l = this.AFFunArr.length; i<l; i++){
            if(this.AFFunArr[i].id == ID){
                return;
            }
        }
        this.AFFunArr.push({
            func: func,
            id: ID
        });
        if(!this.engineRunning){
            requestAnimationFrame(this.engine.bind(this));
            this.engineRunning = true;
        }
    }
    removeAf(ID){
        for(let i = 0, l = this.AFFunArr.length; i<l; i++){
            if(this.AFFunArr[i] && (this.AFFunArr[i].id == ID)){
                this.AFFunArr.splice(i, 1);
            }
        }
    }
    engine(){
        if(this.AFFunArr.length>0){
            for(let i = 0,l = this.AFFunArr.length; i<l; i++){
                this.AFFunArr[i].func();
            }
            requestAnimationFrame(this.engine.bind(this));
        }else{
            this.engineRunning = false;
        }
    }
    toggleFullScreen(video) {
        if (video.webkitEnterFullScreen) {
            video.webkitEnterFullScreen();
        }
    }
}
export default new utils;