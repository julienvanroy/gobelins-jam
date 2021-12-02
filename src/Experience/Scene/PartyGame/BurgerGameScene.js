import FXScene from "../Core/FXScene";
import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, Vector3, NearestFilter} from "three";
import {gsap} from "gsap";

export default class BurgerGameScene extends FXScene {
    constructor() {
        super()
        this.resources = this.experience.resources

        this.index = 0

        this.resources.on('ready', () =>
        {
            this.geometryPlane = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);
            const colorTexture = this.resources.items.burgerGame3Background
            colorTexture.generateMipmaps = false
            colorTexture.minFilter = NearestFilter
            const material = new MeshBasicMaterial({map: colorTexture});
            const mesh = new Mesh(this.geometryPlane, material)
            this.scene.add(mesh)
            window.addEventListener("keydown", this._listener.bind(this), true);
        })
    }

    _listener(event) {
        if (event.defaultPrevented) return;
        switch (event.keyCode) {
            case 32:
                const colorTexture = this.resources.items[`burgerGame3-${this.index}`]
                colorTexture.generateMipmaps = false
                colorTexture.minFilter = NearestFilter
                const material = new MeshBasicMaterial({map: colorTexture, transparent: true});
                const mesh = new Mesh(this.geometryPlane, material)
                mesh.position.y = 3
                this.scene.add(mesh)
                this.index ++
                gsap.to(mesh.position, {
                    y: 0,
                    duration: 0.25
                })
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    destroy() {
        window.removeEventListener("keydown", this._listener.bind(this), true);
    }
}
