import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import Experience from "../../Experience";

export default class MiniGameOrdi {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this._initGeometry();
    this._initMaterial();
    this._initMesh();
    this._initMisc();
  }

  _initGeometry() {
    this.geometry = new BoxGeometry();
  }

  _initMaterial() {
    this.material = new MeshBasicMaterial({ color: 0xffffff });
  }

  _initMesh() {
    this.cube = new Mesh(this.geometry, this.material);
    this.scene.add(this.cube);
  }

  _initMisc() {
      let keyCodes = [81, 69, 84, 85, 83, 70, 72, 75, 90, 67, 66, 77];
      let keyToPress;
    
      setInterval(() => {
        keyToPress = keyCodes[Math.floor(Math.random() * keyCodes.length)];

        console.log(String.fromCharCode(keyToPress))
      }, 2000);

      document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == keyToPress) {
        console.log("RIGHT")
      } else {
        console.log("FALSE")
      }
    }

  }

  update() {
    var xSpeed = 0.0001;
    var ySpeed = 0.0001;
  }
}
