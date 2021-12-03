import Experience from "./Experience";

export default class GameManager {
    constructor() {
        this.experience = new Experience()
        this.video = this.experience.video
        this.overlay = this.experience.overlay
        this.transitionScene = this.experience.transitionScene
        this.blackScene = this.experience.blackScene
        this.videoScene = this.experience.videoScene
        this.gameLevel = this.experience.gameLevel

        this.replayBtn = document.getElementById('replayBtn')

        this.reset()
    }

    reset() {
        this.isIntroScene = false
        this.isPartyGame = false
        this.isOutroScene = false

        this.winRoundCondition = 9
        this.numberWinRound = 0

        this.indexGameLevel = 0
    }

    loadPartyGame()
    {
        this.transitionScene.transition(this.gameLevel[this.indexGameLevel])
        this.indexGameLevel++
        this.indexGameLevel = this.indexGameLevel >= this.gameLevel.length ? 0 : this.indexGameLevel
    }

    checkWinGame()
    {
        if(this.isPartyGame && this.numberWinRound >= this.winRoundCondition) {
            this.isPartyGame = false
            this.isOutroScene = true
            this.video.setSrc('outro.mp4')
            this.transitionScene.transition(this.videoScene)
        }
    }

    update() {
        // Intro Scene is finished
        if(this.isIntroScene && this.video.instance.ended) {
            this.isIntroScene = false
            this.loadPartyGame()
        }

        // Player Win & and Game
        this.checkWinGame()

        // Outro Scene is finished
        if(this.isOutroScene && this.video.instance.ended) {
            this.isOutroScene = false
            this.transitionScene.transition(this.blackScene)
        }
    }
}
