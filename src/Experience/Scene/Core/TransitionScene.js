import {Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial} from "three";
import Experience from "../../Experience";
import vertexTransition from './transition.vert'
import fragmentTransition from './transition.frag'
import {gsap} from "gsap";

export default class TransitionScene {
    constructor(_currentScene) {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.scene = new Scene()
        this.currentScene = _currentScene
        this.transitionScene = null
        this.camera = new OrthographicCamera(
            this.sizes.width / -2,
            this.sizes.width / 2,
            this.sizes.height / 2,
            this.sizes.height / -2,
            -10,
            10,
        )

        this.transitionParams = {
            transition: 0,
            transitionSpeed: 3.0,
        }

        this._initQuad()
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

    transition(_transitionScene, _duration = 1) {
        this.transitionScene= _transitionScene
        this.quadMaterial.uniforms.tDiffuse1.value = this.transitionScene.fbo.texture
        this.quadMaterial.uniforms.tDiffuse2.value = this.currentScene.fbo.texture
        gsap.to(this.transitionParams, {
            transition: 1,
            duration: _duration,
            ease: 'power3.easeOut',
            onComplete: () => {
                this.currentScene = this.transitionScene
                this.transitionScene = null
                this.transitionParams.transition = 0
            },
        })
    }

    update() {
        this.quadMaterial.uniforms.mixRatio.value = this.transitionParams.transition
        // Prevent render both scenes when it's not necessary
        if (!this.transitionScene) {
            this.currentScene.update(false)
        } else {
            this.transitionScene.update(true)
            this.currentScene.update(true)
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
    }

}
