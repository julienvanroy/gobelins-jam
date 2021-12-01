import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, Vector2 } from "three";
import Experience from "../../Experience";
import { AxesHelper } from "three/src/helpers/AxesHelper";

import { Text } from "troika-three-text";

export default class MiniGameCaddie {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.keyToPress;
    this._initGeometry();
    this._initMaterial();
    this._initMesh();
    this._initControls();
  }

  _initGeometry() {
    console.log("initGeometry");
    this.caddie = new BoxGeometry();
  }

  _initMaterial() {
    console.log("initMaterial");
    this.material = new MeshBasicMaterial({ color: 0x99a39c });
  }

  _initMesh() {
    console.log("initMesh");
    this.mesh = new Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  _initControls() {
    console.log("initControls");
    let mouse = new Vector2();

    document.addEventListener("mousemove", onDocumentMouseMove, false);

    function onDocumentMouseMove(event) {
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      console.log(mouse);
    }
  }

  update() {}
}
