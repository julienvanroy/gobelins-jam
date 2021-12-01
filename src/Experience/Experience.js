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

let instance = null

export default class Experience {
    constructor(_canvas) {
        // Singleton
        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.video = new Video()
        this.camera = new Camera()
        this.renderer = new Renderer()
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
    }

    _initScenes() {
        this.worldScene = new WorldScene()
        this.blackScene = new BlackScene()
        this.videoScene = new VideoScene()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
        this.transitionScene.resize()
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

        this.overlay.destroy()

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active)
            this.debug.ui.destroy()
    }
}
