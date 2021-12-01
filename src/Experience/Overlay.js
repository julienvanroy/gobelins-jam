import Experience from "./Experience";

export default class Overlay {
    constructor() {
        this.experience = new Experience()
        this.video = this.experience.video
        this.transitionScene = this.experience.transitionScene
        this.gameManager = this.experience.gameManager
        this.videoScene = this.experience.videoScene
        this.element = document.getElementById('overlay')

        this.element.addEventListener('click', this.hide.bind(this))
    }

    show() {
        this.element.style.display = 'block'
    }

    hide() {
        this.element.style.display = 'none'
        this.video.setSrc('intro.mp4')
        this.video.instance.play()
        this.transitionScene.transition(this.videoScene)
        this.gameManager.isIntroScene = true
    }

    destroy() {
        this.element.removeEventListener('click', this.hide.bind(this))
    }
}
