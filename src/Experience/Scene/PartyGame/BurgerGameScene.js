import FXScene from "../Core/FXScene";
import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, Vector3} from "three";

export default class BurgerGameScene extends FXScene {
    constructor() {
        super()
        this.positionBurger = new Vector3(0, -1, 0)
        this._initMeshCube()
        window.addEventListener("keydown", this._listener.bind(this), true);
    }

    _initMeshCube() {
        this.geometryCube = new PlaneBufferGeometry(0.5, 0.5);
        this.materialCube = new MeshBasicMaterial({color: 0xffffff});
    }

    _listener(event) {
        if (event.defaultPrevented) return;
        switch (event.keyCode) {
            case 32:
                const mesh = new Mesh(this.geometryCube, this.materialCube)
                mesh.position.y = this.positionBurger.y

                this.positionBurger.y += 0.5

                this.scene.add(mesh)
                console.log(mesh)
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
