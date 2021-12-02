import Experience from "../../Experience";
import {Scene, LinearFilter, RGBFormat, WebGLMultisampleRenderTarget, Mesh} from "three";

export default class FXScene {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.renderer = this.experience.renderer
        this.camera = this.experience.camera
        this.scene = new Scene()
        const renderTargetParameters = {minFilter: LinearFilter, magFilter: LinearFilter, format: RGBFormat};
        this.fbo = new WebGLMultisampleRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
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

    destroy() {
        // Traverse the whole scene and destroy scene
        for (let i = this.scene.children.length - 1; i >= 0; i--) {
            const child = this.scene.children[i]
            if (child instanceof Mesh) {
                child.geometry.dispose()

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }

                this.scene.remove(child)
            }
        }
    }
}
