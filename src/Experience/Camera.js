import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {MathUtils, PerspectiveCamera} from "three";

export default class Camera
{
    constructor(_positionX= 0, _positionY = 0, _positionZ = 7)
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this._setInstance(_positionX, _positionY, _positionZ)
        this._setControls()

        this.vFOV = MathUtils.degToRad( this.instance.fov ); // convert vertical fov to radians
    }

    _setInstance(_positionX, _positionY, _positionZ)
    {
        this.instance = new PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(_positionX, _positionY, _positionZ)
        this.scene.add(this.instance)
    }

    _setControls()
    {
        if(!this.debug.active) return
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if(this.debug.active) this.controls.update()
    }
}
