import Experience from "./Experience";

export default class GameManager {
    constructor() {
        this.experience = new Experience()
        this.video = this.experience.video
        this.transitionScene = this.experience.transitionScene
        this.worldScene = this.experience.worldScene
        this.isIntroScene = false
    }

    update() {
        if(this.isIntroScene && this.video.instance.ended) {
            this.isIntroScene = false
            this.transitionScene.transition(this.worldScene)
        }
    }
}
