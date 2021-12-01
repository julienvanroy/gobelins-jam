import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, VideoTexture, NearestFilter} from "three";
import Experience from "../Experience";

export default class VideoPlane {
    constructor(_src, _width, _height, _scene) {
        this.experience = new Experience()
        this.scene = _scene
        this.video = this.experience.video

        this._initGeometry(_width, _height)
        this._initTexture()
        this._initMaterial()
        this._initMesh()
    }

    _initGeometry(_width, _height) {
        this.geometry = new PlaneBufferGeometry(_width, _height, 1, 1);
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
