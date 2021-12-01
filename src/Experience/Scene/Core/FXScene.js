import Experience from "../../Experience";
import {Scene, WebGLRenderTarget, LinearFilter, RGBFormat} from "three";

export default class FXScene {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer
        this.camera = this.experience.camera
        this.scene = new Scene()
        const renderTargetParameters = {minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat};
        this.fbo = new WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
    }

    update(_rtt) {
        if (_rtt) {
            this.renderer.instance.setRenderTarget(this.fbo);
            this.renderer.instance.clear();
            this.renderer.instance.render(this.scene, this.camera.instance);
        } else {
            this.renderer.instance.setRenderTarget(null);
            this.renderer.instance.render(this.scene, this.camera.instance);
        }
    }
}
