import Experience from "./Experience";

export default class Overlay {
    constructor() {
        this.experience = new Experience()
        this.video = this.experience.video
        this.transitionScene = this.experience.transitionScene
        this.gameManager = this.experience.gameManager
        this.replayBtn = this.gameManager.replayBtn
        this.videoScene = this.experience.videoScene
        this.overlay = document.getElementById('overlay')
        this.overlayBtn = document.getElementById('overlayBtn')

        this.overlayBtn.addEventListener('click', this.hideOverlay.bind(this))
        this.replayBtn.addEventListener('click', this.replayGame.bind(this))
    }

    hideOverlay() {
        this.overlay.remove()
        this.overlayBtn.removeEventListener('click', this.hideOverlay.bind(this))
        this.overlay = null
        this.overlayBtn = null

        this.playIntro()
    }

    replayGame() {
        this.replayBtn.style.display = 'none'

        this.playIntro()
    }

    playIntro() {
        this.video.setSrc('intro.mp4')
        this.video.instance.play()
        this.transitionScene.transition(this.videoScene)
        this.gameManager.isIntroScene = true
    }

    destroy() {
        this.overlayBtn.removeEventListener('click', this.hideOverlay.bind(this))
        this.replayBtn.removeEventListener('click', this.replayGame.bind(this))
    }
}
