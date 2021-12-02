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
import {Vector3} from "three";
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
        this.posMesh = new Vector3(0, 0, 0);
        this._initScenes()
        this.transitionScene = new TransitionScene(this.burgerGameScene)
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
    }

    _initScenes() {
        this.worldScene = new WorldScene()
        this.blackScene = new BlackScene()
        this.videoScene = new VideoScene()
        this.burgerGameScene = new BurgerGameScene()
        this.lightGameScene = new LightGameScene()
        this.marketGameScene = new MarketGameScene()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
        this.transitionScene.resize()
    }

    mouseMove() {
        const vector = new Vector3(this.mouse.position.x, this.mouse.position.y, 0.5);
        vector.unproject(this.camera.instance);
        const dir = vector.sub(this.camera.instance.position).normalize();
        const distance = -this.camera.instance.position.z / dir.z;
        this.posMesh = this.camera.instance.position.clone().add(dir.multiplyScalar(distance));
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
