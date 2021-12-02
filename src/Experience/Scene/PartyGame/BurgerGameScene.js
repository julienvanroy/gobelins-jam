import FXScene from "../Core/FXScene";
import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, NearestFilter} from "three";
import {gsap} from "gsap";

export default class BurgerGameScene extends FXScene {
    constructor() {
        super()
        this.resources = this.experience.resources

        this.difficultyGameLevel = this.experience.difficultyGameLevel

        this.geometryPlane = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);

        this.resources.on('ready', () => {
            this.load()
        })
    }

    load() {
        this.setWinCondition()
        const colorTexture = this.resources.items[`burgerGame${this.difficultyGameLevel}Background`]
        colorTexture.generateMipmaps = false
        colorTexture.minFilter = NearestFilter
        const material = new MeshBasicMaterial({map: colorTexture});
        const mesh = new Mesh(this.geometryPlane, material)
        this.scene.add(mesh)
        window.addEventListener("keydown", this._listener.bind(this), true);
    }

    setWinCondition() {
        this.isWin = false
        this.counterWinCondition = 0
        switch (this.difficultyGameLevel) {
            case 1:
                this.winCondition = 8
                break;
            case 2:
                this.winCondition = 18
                break;
            case 3:
                this.winCondition = 28
                break;
            default:
                return;
        }
    }

    _listener(event) {
        if (event.defaultPrevented || this.isWin) return;
        switch (event.keyCode) {
            case 32:
                const colorTexture = this.resources.items[`burgerGame${this.difficultyGameLevel}-${this.counterWinCondition}`]
                colorTexture.generateMipmaps = false
                colorTexture.minFilter = NearestFilter
                const material = new MeshBasicMaterial({map: colorTexture, transparent: true});
                const mesh = new Mesh(this.geometryPlane, material)
                mesh.position.y = 3
                this.scene.add(mesh)
                this.counterWinCondition++
                this.isWin = (this.counterWinCondition > this.winCondition)
                if(this.isWin) {
                    gsap.to(mesh.position, {
                        y: 0,
                        duration: 0.25,
                        onComplete: () => {
                            if (this.isWin) {
                                setTimeout(() => {
                                    this.destroy()
                                    this.difficultyGameLevel+=1
                                }, 1000)

                                setTimeout(() => {
                                    this.load()
                                }, 2000)
                            }
                        }
                    })
                } else {
                    gsap.to(mesh.position, {
                        y: 0,
                        duration: 0.25
                    })
                }
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    destroy() {
        super.destroy()
        window.removeEventListener("keydown", this._listener.bind(this), true);
    }
}
