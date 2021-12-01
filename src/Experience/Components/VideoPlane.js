import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, VideoTexture, NearestFilter} from "three";
import Experience from "../Experience";

export default class VideoPlane {
    constructor(_src, _scene) {
        this.experience = new Experience()
        this.scene = _scene
        this.camera = this.experience.camera
        this.video = this.experience.video

        this._initGeometry()
        this._initTexture()
        this._initMaterial()
        this._initMesh()
    }

    _initGeometry() {
        this.heightGeometry = 2 * Math.tan(this.camera.vFOV / 2) * this.camera.instance.position.z; // visible height
        this.widthGeometry = this.heightGeometry * this.camera.instance.aspect;
        this.geometry = new PlaneBufferGeometry(this.widthGeometry, this.heightGeometry, 1, 1);
    }

    _initTexture() {
        this.texture = new VideoTexture(this.video);
        this.texture.generateMipmaps = false
        this.texture.minFilter = NearestFilter
    }

    _initMaterial() {
        this.material = new MeshBasicMaterial({map: this.texture});
    }

    _initMesh() {
        this.videoPlane = new Mesh(this.geometry, this.material);
        this.scene.add(this.videoPlane);
    }
}
