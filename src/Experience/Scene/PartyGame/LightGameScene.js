import FXScene from "../Core/FXScene";
import {AxesHelper} from "three/src/helpers/AxesHelper";
import {Mesh, MeshBasicMaterial, NearestFilter, PlaneBufferGeometry} from "three";

export default class LightGameScene extends FXScene {
    constructor() {
        super()
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            const geometry = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);
            const colorTexture = this.resources.items.lightGame1Background
            colorTexture.generateMipmaps = false
            colorTexture.minFilter = NearestFilter
            const material = new MeshBasicMaterial({map: colorTexture});
            const background = new Mesh(geometry, material)
            this.scene.add(background)
        })

        this.keyToPress = null;
        //this._initTirage();
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

        // event listener![](../../../../static/262232304_618700865842370_551201813994132176_n.jpeg)
        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode === keyToPress) {
                console.log("RIGHT");
            } else {
                console.log("FALSE");
            }
        }
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
}
