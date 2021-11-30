import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import Experience from "../../Experience";
import { AxesHelper } from "three/src/helpers/AxesHelper";

import { Text } from "troika-three-text";

export default class MiniGameOrdi {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.keyToPress; 
    this._initTirage();  
  }

  _initTirage() {
    console.log('initTirage');
    
    // touches
    let keyCodes = [81, 69, 84, 85, 83, 70, 72, 75, 90, 67, 66, 77];
    let keyToPress;
    
    setInterval(() => {
      keyToPress = keyCodes[Math.floor(Math.random() * keyCodes.length)];
      this._initMesh(keyToPress);
    }, 2000);

      // event listener
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == keyToPress) {
        console.log("RIGHT");
      } else {
        console.log("FALSE");
      }
    }
  }

  _initGeometry() {
    console.log("initGeometry");
    this.geometry = new BoxGeometry();
  }

  _initMaterial() {
    console.log("initMaterial");
    this.material = new MeshBasicMaterial({ color: 0xffffff });
    this.textMaterial = new MeshBasicMaterial();
  }

  _initMesh(keyToPress) {
    console.log("initMesh");
    console.log('topress', String.fromCharCode(this.keyToPress));
    
    // Create:
    const myText = new Text();
    
    // Set properties to configure:
    myText.text = String.fromCharCode(keyToPress);
    myText.fontSize = 2;
    myText.position.z = 0;
    myText.color = 0x9966ff;
    
    // Update the rendering:
    myText.sync();
    this.scene.add(myText);

    setInterval(() => {
      this.scene.remove(myText)
    }, 2000);

    this.scene.add(new AxesHelper(200));
  }

  update() {
  }
}
