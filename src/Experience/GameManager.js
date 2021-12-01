import Experience from "./Experience";

export default class GameManager {
    constructor() {
        this.experience = new Experience()
        this.video = this.experience.video
        this.transitionScene = this.experience.transitionScene
        this.blackScene = this.experience.blackScene
        this.videoScene = this.experience.videoScene
        this.burgerScene = this.experience.burgerScene
        this.isIntroScene = false
        this.isPartyGame = false
        this.isOutroScene = false

        this.maxRound = 9
        this.round = 0
    }

    nextRound()
    {
        this.round ++
    }

    update() {
        if(this.isIntroScene && this.video.instance.ended) {
            this.isIntroScene = false
            this.transitionScene.transition(this.burgerScene)
        }
        if(this.isPartyGame && this.round >= this.maxRound) {
            this.isPartyGame = false
            this.isOutroScene = true
            this.video.setSrc('outro.mp4')
            this.transitionScene.transition(this.videoScene)
        }
        if(this.isOutroScene && this.video.instance.ended) {
            this.isOutroScene = false
            this.transitionScene.transition(this.blackScene)
        }
    }
}
