import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Video from "./Components/Video";
import VideoScene from "./Scene/VideoScene";
import TransitionScene from "./Scene/Core/TransitionScene";
import WorldScene from "./Scene/WorldScene";
import BlackScene from "./Scene/BlackScene";
import Overlay from "./Overlay";
import GameManager from "./GameManager";
import BurgerGameScene from "./Scene/PartyGame/BurgerGameScene";
import LightGameScene from "./Scene/PartyGame/LightGameScene";
import MarketGameScene from "./Scene/PartyGame/MarketGameScene";
import Mouse from "./Utils/Mouse";
import Resources from "./Utils/Resources";
import sources from "./sources";

let instance = null;

export default class Experience {
    constructor(_canvas) {
        // Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this;

        // Options
        this.canvas = _canvas;

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.mouse = new Mouse();
        this.time = new Time()
        this.resources = new Resources(sources)
        this.video = new Video()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources.on('ready', () => {
            this._initScenes()
            this.transitionScene = new TransitionScene(this.blackScene)
            this.gameManager = new GameManager()
            this.overlay = new Overlay()

            // Resize event
            this.sizes.on('resize', () => {
                this.resize()
            })

            // Time tick event
            this.time.on('tick', () => {
                this.update()
            })

            this.mouse.on("mouseMove", () => {
                this.mouseMove();
            });
        })
    }

    _initScenes() {
        this.worldScene = new WorldScene()
        this.blackScene = new BlackScene()
        this.videoScene = new VideoScene()
        this._initScenePartyGame()
    }

    _initScenePartyGame() {
        this.difficultyGameLevel = 1

        this.burgerGameScene = new BurgerGameScene()
        this.marketGameScene = new MarketGameScene()
        this.lightGameScene = new LightGameScene()
        this.marketGameScene = new MarketGameScene()

        this.gameLevel = [this.burgerGameScene, this.lightGameScene, this.marketGameScene]
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
        this.transitionScene.resize()
    }

    mouseMove() {
        this.marketGameScene.mouseMove()
    }

    update() {
        this.debug.begin()
        this.camera.update()
        this.transitionScene.update()
        this.gameManager.update()
        this.debug.end()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')
        this.time.off('mouseMove')

        this.overlay.destroy()

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()
    }
}
