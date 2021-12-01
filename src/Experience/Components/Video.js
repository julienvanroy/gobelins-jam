export default class Video {
    constructor() {
        this.instance = document.getElementById('video');
        this.instance.addEventListener('play', this._play.bind(this));
    }

    setSrc(_src) {
        this.instance.pause()
        this.instance.src = _src
    }

    isVideoPlaying(){
        return !!(this.instance.currentTime > 0 && !this.instance.paused && !this.instance.ended && this.instance.readyState > 2);
    }

    _play() {
        this.instance.currentTime = 0;
    }

    destroy() {
        this.instance.addEventListener('play', this._play.bind(this));
    }
}
