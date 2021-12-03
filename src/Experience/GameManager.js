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

        this.textGameLevel = ["Mange le plus de viande possible !", "Allume les lumières que les idiots ont éteintes !", "Fais des achats compulsifs !"]

        this.replayBtn = document.getElementById('replayBtn')
        this.textGame = document.getElementById('textGame')
        this.chono = document.getElementById('chrono')
        this.chonoText = document.getElementById('chronoText')

        this.reset()
    }

    reset() {
        this.isIntroScene = false
        this.isInterScene = false
        this.isPartyGame = false
        this.isPartyGameWin = false
        this.isPartyGameLost = false
        this.isOutroScene = false
        this.experience.difficultyGameLevel = 1

        this.winRoundCondition = 9
        this.numberWinRound = 0

        this.indexGameLevel = 0

        this.secondsLeft = 6
        this.timerInterval = null
    }

    setupChrono() {
        this.chono.style.display = 'flex'
        this.secondsLeft = 6
        this.chonoText.textContent = `0${this.secondsLeft}`;
        this.timerInterval = setInterval(this.tick.bind(this), 1000)
    }

    tick() {
        this.chonoText.textContent = `0${--this.secondsLeft}`;
        if (this.secondsLeft === 0) {
            this.clearChrono()
            this.isPartyGame = false
            this.isPartyGameLost = true
        }
    }

    clearChrono() {
        clearInterval(this.timerInterval)
    }

    loadInterScene() {
        this.isPartyGame = false
        this.chono.style.display = 'none'
        this.textGame.textContent = ''

        this.isInterScene = true
        this.video.setSrc(`interScene/${this.numberWinRound}/${this.isPartyGameWin ? 'win.mp4' : 'loose.mp4'}`)
        this.transitionScene.transition(this.videoScene)
    }

    loadPartyGame() {
        this.transitionScene.transition(this.gameLevel[this.indexGameLevel])
        this.textGame.textContent = this.textGameLevel[this.indexGameLevel]
        this.setupChrono()
        this.indexGameLevel++
        this.indexGameLevel = this.indexGameLevel >= this.gameLevel.length ? 0 : this.indexGameLevel
    }

    update() {
        // Intro Scene is finished
        if (this.isIntroScene && this.video.instance.ended) {
            this.isIntroScene = false
            this.loadPartyGame()
            this.numberWinRound++
        }

        else if (this.isInterScene && this.video.instance.ended) {
            this.isInterScene = false
            this.loadPartyGame()
        }

        else if (!this.isPartyGame && !this.isPartyGameWin && this.isPartyGameLost) {
            this.isPartyGameLost = false
            this.loadInterScene()
        }

        else if (!this.isPartyGame && !this.isPartyGameWin && this.isPartyGameLost) {
            this.isPartyGameLost = false
            this.loadInterScene()
        }

        // Player Win & and Game
        else if (this.isPartyGame && this.gameLevel[this.indexGameLevel].isWin) {
            this.isPartyGame = false
            this.chono.style.display = 'none'
            this.loadInterScene()
        }

        // Outro Scene is finished
        else if (this.isOutroScene && this.video.instance.ended) {
            this.isOutroScene = false
            this.transitionScene.transition(this.blackScene)
        }
    }
}
