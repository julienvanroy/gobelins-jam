import {Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, MathUtils} from "three";
import Experience from "../../Experience";
import vertexTransition from './transition.vert'
import fragmentTransition from './transition.frag'

export default class TransitionScene {
    constructor(_sceneA, _sceneB) {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.scene = new Scene()
        this.camera = new OrthographicCamera(
            this.sizes.width / -2,
            this.sizes.width / 2,
            this.sizes.height / 2,
            this.sizes.height / -2,
            -10,
            10,
        )

        this.transitionParams = {
            transition: 0.5,
            transitionSpeed: 3.0,
        }

        this._initQuad()
        this.setScenes(_sceneA, _sceneB)
    }

    _initQuad() {
        this.quadGeometry = new PlaneGeometry(this.sizes.width, this.sizes.height)
        this.quadMaterial = new ShaderMaterial({
            uniforms: {
                tDiffuse1: {
                    value: null,
                },
                tDiffuse2: {
                    value: null,
                },
                mixRatio: {
                    value: 0.0,
                },
            },
            vertexShader: vertexTransition,
            fragmentShader: fragmentTransition,
        })

        this.quad = new Mesh(this.quadGeometry, this.quadMaterial)
        this.scene.add(this.quad)
    }

    setScenes(_sceneA, _sceneB) {
        this.sceneA = _sceneA
        this.sceneB = _sceneB
        this.quadMaterial.uniforms.tDiffuse1.value = this.sceneA.fbo.texture
        this.quadMaterial.uniforms.tDiffuse2.value = this.sceneB.fbo.texture
    }

    update() {
        const t =
            (1 +
                Math.sin(
                    (this.transitionParams.transitionSpeed * this.time.clock.getElapsedTime()) /
                    Math.PI
                )) /
            2
        this.transitionParams.transition = MathUtils.smoothstep(t, 0.3, 0.7)
        this.quadMaterial.uniforms.mixRatio.value = this.transitionParams.transition
        // Prevent render both scenes when it's not necessary
        if (this.transitionParams.transition === 0) {
            this.sceneB.update(false)
        } else if (this.transitionParams.transition === 1) {
            this.sceneA.update(false)
        } else {
            this.sceneA.update(true)
            this.sceneB.update(true)
            this.renderer.instance.setRenderTarget(null)
            this.renderer.instance.clear()
            this.renderer.instance.render(this.scene, this.camera)
        }
    }

    resize() {
        this.camera.left = this.sizes.width / -2
        this.camera.right = this.sizes.width / 2
        this.camera.top = this.sizes.height / 2
        this.camera.bottom = this.sizes.height / -2
        this.camera.updateProjectionMatrix()
    }

}
