import FXScene from "../Core/FXScene";
import {AxesHelper} from "three/src/helpers/AxesHelper";
import {Mesh, MeshBasicMaterial, NearestFilter, PlaneBufferGeometry, Group} from "three";
import { Text } from 'troika-three-text';
export default class LightGameScene extends FXScene {
    constructor() {
        super()
        this.resources = this.experience.resources
        this.backgroundColor = '#fff';

        this.resources.on('ready', () =>
        {
            const geometry = new PlaneBufferGeometry(1,1);
            const colorTexture = this.resources.items.lightGame3Background
            colorTexture.generateMipmaps = false
            colorTexture.minFilter = NearestFilter
            const material = new MeshBasicMaterial({map: colorTexture, transparent: true});
            this.background = new Mesh(geometry, material)
            this.background.position.z = 1;
            // this.group.add(group)


            this._initTirage();
            this._initGroup();
        })

        this.keyToPress = null;
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
        // const myText = new Text();

        // Set properties to configure:
        // myText.text = String.fromCharCode(keyToPress);
        // myText.fontSize = 2;
        // myText.position.z = 0;
        // myText.color = 0x9966ff;

        // Update the rendering:
        // myText.sync();
        // this.group.add(myText);

        // setInterval(() => {
        //     this.scene.remove(myText)
        // }, 2000);

    }

    _initLightOff() {
        // const materialLightOn = new MeshBasicMaterial({color: 0xffb870});
        const materialLightOn = new MeshBasicMaterial({color: 0xffb870, transparent: true, opacity: 0.5});
        const geometry1 = new PlaneBufferGeometry(0.13, 0.09);
        const smallLight = new PlaneBufferGeometry(0.05, 0.09);
        const mediumLight = new PlaneBufferGeometry(0.09, 0.12);
        const miniLight = new PlaneBufferGeometry(0.028, 0.06);
        
        // * light 1 - batiment central, en haut
        const light1 = new Mesh(geometry1, materialLightOn)
        light1.position.set(-0.02, 0.09, 0.9);
        this.group.add(light1);

        // * light 2 - batiment central, en bas
        const light2 = new Mesh(geometry1, materialLightOn)
        light2.position.set(-0.02, -0.18, 0.9);
        this.group.add(light2);

        // * light 3 - batiment droite, en haut
        const light3 = new Mesh(smallLight, materialLightOn)
        light3.position.set(0.22, -0.08, 0.9);
        this.group.add(light3);

        // * light 4 - niv 2 - batiment central, au centre
        const light4 = new Mesh(geometry1, materialLightOn)
        light4.position.set(-0.02, -0.09, 0.9);
        this.group.add(light4);

        // * light 5 - niv 2 - 2e fenetre au dessus du store
        const light5 = new Mesh(smallLight, materialLightOn)
        light5.position.set(-0.26, -0.05, 0.9);
        this.group.add(light5);

        // * light 6 - niv 2 - store 
        const light6 = new Mesh(mediumLight, materialLightOn)
        light6.position.set(-0.26, -0.245, 0.9);
        this.group.add(light6);

        // * light 7 - niv 2 - batiement loin gauche
        const light7 = new Mesh(smallLight, materialLightOn)
        light7.position.set(-0.15, 0.19, 0.9);
        this.group.add(light7);

        // * light 8 - niv 2 - projecteur droite
        const light8 = new Mesh(mediumLight, materialLightOn)
        light8.position.set(0.29, 0.21, 0.9);
        light8.rotation.set(0, 0, Math.PI / 2 * 0.07);
        this.group.add(light8);

        // * light 9 - niv 3 - projecteur gauche
        const light9 = new Mesh(mediumLight, materialLightOn)
        light9.position.set(-0.33, 0.25, 0.9);
        light9.rotation.set(0, 0, Math.PI / 2 * 0.5);
        this.group.add(light9);

        // * light 10 - niv 3 - fenetre au dessus du store
        const light10 = new Mesh(smallLight, materialLightOn)
        light10.position.set(-0.274, -0.14, 0.9);
        this.group.add(light10);

        // * light 11 - niv 3 - fenetre loin en haut à gauche
        const light11 = new Mesh(miniLight, materialLightOn)
        light11.position.set(-0.234, 0.257, 0.9);
        this.group.add(light11);

        // * light 12 - niv 3 - fenetre loin en bas 
        const light12 = new Mesh(miniLight, materialLightOn)
        light12.position.set(-0.234, 0.20, 0.9);
        this.group.add(light12);

        // * light 13 - niv 3 - fenetre analzon
        const light13 = new Mesh(smallLight, materialLightOn)
        light13.position.set(-0.165, -0.136 , 0.9);
        this.group.add(light13);
    } 

    _initGroup() {
        this.group = new Group();
        this.group.add(this.background)
        this._initLightOff()
        this.group.scale.set(this.camera.widthVisible, this.camera.heightVisible, 1)
        this.scene.add(this.group)
    }
}
