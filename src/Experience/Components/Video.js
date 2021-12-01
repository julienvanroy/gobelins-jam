export default class Video {
    constructor() {
        this.instance = document.getElementById('video');
        this.instance.addEventListener('play', this._play);
    }

    setSrc(_src) {
        this.instance.pause()
        this.src = _src
    }

    _play() {
        this.currentTime = 0;
    }

    destroy() {
        this.instance.addEventListener('play', this._play);
    }
}
