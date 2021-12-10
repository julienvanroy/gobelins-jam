import Experience from "./Experience";
import {Howl} from 'howler';

export default class GameManager {
    constructor() {
        this.experience = new Experience()
        this.video = this.experience.video
        this.overlay = this.experience.overlay
        this.transitionScene = this.experience.transitionScene
        this.blackScene = this.experience.blackScene
        this.videoScene = this.experience.videoScene
        this.gameLevel = this.experience.gameLevel
        this.indexGameLevel = 0
        this.gameSound = new Howl({
            src: ['./mp3/game.mp3'],
            loop: true,
            volume: 0.25
        });

        this.cmeurrentGame = this.gameLevel[this.indexGameLevel]

        this.textGameLevel = ["Appuie sur espace pour manger le plus de viande !", "Allume les lumières que les idiots ont éteintes !", "Fais des achats compulsifs en bougeant le caddie!"]

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
        this.indexCurrentGame = this.indexGameLevel

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
            if(this.indexCurrentGame === 2) {
                this.currentGame.stopGame()
                if(this.currentGame.isLost) this.isPartyGameLost = true
                else this.isPartyGameWin = true
            } else this.isPartyGameLost = true
        }
    }

    changeDifficulty(){
        if(this.numberWinRound < 3) {
            this.experience.difficultyGameLevel = 1
        }else if(this.numberWinRound < 6) {
            this.experience.difficultyGameLevel = 2
        }else this.experience.difficultyGameLevel = 3
    }

    clearChrono() {
        clearInterval(this.timerInterval)
    }

    loadInterScene(isWin) {
        this.gameSound.stop();
        if(isWin) this.numberWinRound++
        this.isPartyGame = false
        this.chono.style.display = 'none'
        this.textGame.textContent = ''

        this.isInterScene = true
        if(this.numberWinRound === 0) this.video.setSrc('interScene/start.mp4')
        else this.video.setSrc(`interScene/${this.numberWinRound}/${isWin ? 'win.mp4' : 'loose.mp4'}`)
        this.transitionScene.transition(this.videoScene)
    }

    loadPartyGame() {
        this.gameSound.play();
        this.changeDifficulty()
        this.isPartyGame = true
        this.currentGame = this.gameLevel[this.indexGameLevel]
        this.currentGame.destroy()
        this.currentGame.load()
        this.transitionScene.transition(this.currentGame)
        this.textGame.textContent = this.textGameLevel[this.indexGameLevel]
        this.setupChrono()
        this.indexCurrentGame = this.indexGameLevel
        this.indexGameLevel++
        this.indexGameLevel = this.indexGameLevel >= this.gameLevel.length ? 0 : this.indexGameLevel
    }

    update() {
        // Intro Scene is finished
        if (this.isIntroScene && this.video.instance.ended) {
            this.isIntroScene = false
            this.loadInterScene(false)
        }

        // if inter scene finished
        else if (this.isInterScene && this.video.instance.ended) {
            this.isInterScene = false
            if(this.numberWinRound >= this.winRoundCondition) {
                this.isPartyGame = false
                this.isOutroScene = true
                this.video.setSrc('outro.mp4')
                this.transitionScene.transition(this.videoScene)
            } else {
                this.loadPartyGame()
            }
        }

        else if (!this.isPartyGame && !this.isPartyGameWin && this.isPartyGameLost) {
            this.isPartyGameLost = false
            this.loadInterScene(false)
        }

        else if (!this.isPartyGame && this.isPartyGameWin && !this.isPartyGameLost) {
            this.isPartyGameWin = false
            this.loadInterScene(true)
        }

        // Player Win & and Game
        else if (this.isPartyGame && this.currentGame.isWin) {
            this.isPartyGame = false
            this.clearChrono()
            setTimeout(() => this.loadInterScene(true), 750)
        }

        // Outro Scene is finished
        else if (this.isOutroScene && this.video.instance.ended) {
            this.isOutroScene = false
            this.replayBtn.style.display = 'block'
        }
    }
}
