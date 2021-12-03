import FXScene from "../Core/FXScene";
import {AxesHelper} from "three/src/helpers/AxesHelper";
import {
    Mesh,
    MeshBasicMaterial,
    NearestFilter,
    PlaneBufferGeometry,
    Group,
} from "three";
import {Text} from "troika-three-text";

export default class LightGameScene extends FXScene {
    constructor() {
        super();
        this.resources = this.experience.resources;
        this.difficultyGameLevel = this.experience.difficultyGameLevel
        this.materialLightOn = new MeshBasicMaterial({
            color: 0xffb870,
        });
        this.materialLightOff = new MeshBasicMaterial({
            color: 0xffb870,
            transparent: true,
            opacity: 0,
        });
    }

    load(){
        this._initBackground()
        this._initGroup();
        this._initTirage();
    }

    _initBackground()
    {
        const geometry = new PlaneBufferGeometry(1, 1);
        const colorTexture =
            this.resources.items[`lightGame${this.difficultyGameLevel}Background`];
        colorTexture.generateMipmaps = false;
        colorTexture.minFilter = NearestFilter;
        const material = new MeshBasicMaterial({
            map: colorTexture,
            transparent: true,
        });
        this.background = new Mesh(geometry, material);
        this.background.position.z = 1;
    }

    _initTirage() {
        console.log("initTirage");

        switch (this.difficultyGameLevel) {
            case '1':
                this.nWindows = 3;
                break;
            case '2':
                this.nWindows = 5;
                break;
            case '3':
                this.nWindows = 8;
                break;
            default:
                this.nWindows = 3;
                break;
        }

        // touches
        let keyCodes = [81, 69, 84, 85, 83, 70, 72, 75, 90, 67, 66];
        let mixedCodes = keyCodes.sort(() => 0.5 - Math.random());

        this.toPressCodes = mixedCodes.slice(0, this.nWindows);
        this.textsKey = [];
        this._initMesh();

        console.log('touches', this.toPressCodes);
        this.toPressCodes.forEach((key) => {
            console.log(String.fromCharCode(key));
            console.log(key);
        });

        document.addEventListener("keydown", onDocumentKeyDown.bind(this), false);

        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            console.log('1', keyCode)
            console.log('2', this.toPressCodes)
            if (this.toPressCodes.includes(keyCode)) {
                // retire la lettre des touches à presser
                this._turnOnLight(keyCode);
                var index = this.toPressCodes.indexOf(keyCode)
                this.toPressCodes[index] = '/'
                console.log('tableau', this.toPressCodes)
                if (this.toPressCodes.every(item => item === '/')) {
                    console.log("jeu fini");
                }
            } else {
                console.log("n'est pas une touche à appuyer");
            }
        }
    }

    _initMesh() {
        console.log("initMesh");
        console.log("topress", String.fromCharCode(this.toPressCodes));

        this.groupText = new Group();

        if (this.difficultyGameLevel === '1') {
            this.toPressCodes.forEach((key, index) => {
                this.textsKey[key] = new Text();
                this.textsKey[key].text = String.fromCharCode(key);
                // myText.position.set(0, 0, 1.2);
                this.textsKey[key].color = 0xf3e9e2;

                switch (index) {
                    case 0:
                        this.textsKey[key].position.set(-0.23, 0.53, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 1:
                        this.textsKey[key].position.set(-0.23, -0.64, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 2:
                        this.textsKey[key].position.set(1.6, -0.23, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    default:
                        break;
                }

                this.textsKey[key].sync();
                this.groupText.add(this.textsKey[key]);
                this.scene.add(this.groupText);
            });
        }

        if (this.difficultyGameLevel === '2') {
            this.toPressCodes.forEach((key, index) => {
                this.textsKey[key] = new Text();
                this.textsKey[key].text = String.fromCharCode(key);
                // myText.position.set(0, 0, 1.2);
                this.textsKey[key].color = 0xf3e9e2;

                switch (index) {
                    case 0:
                        this.textsKey[key].position.set(-0.19, -0.28, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 1:
                        this.textsKey[key].position.set(-1.9, -0.95, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 2:
                        this.textsKey[key].position.set(-2.12, -0.14, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 3:
                        this.textsKey[key].position.set(-1.19, 0.95, 1.2);
                        this.textsKey[key].fontSize = 0.10;
                        break;
                    case 4:
                        this.textsKey[key].position.set(2.3, 1.07, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    default:
                        break;
                }

                this.textsKey[key].sync();
                this.groupText.add(this.textsKey[key]);
                this.scene.add(this.groupText);
            });
        }

        if (this.difficultyGameLevel === '3') {
            this.toPressCodes.forEach((key, index) => {
                this.textsKey[key] = new Text();
                this.textsKey[key].text = String.fromCharCode(key);
                // myText.position.set(0, 0, 1.2);
                this.textsKey[key].color = 0xf3e9e2;

                switch (index) {
                    case 0:
                        this.textsKey[key].position.set(-0.23, 0.53, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 1:
                        this.textsKey[key].position.set(-1.9, -0.95, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 2:
                        this.textsKey[key].position.set(-2.12, -0.51, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 3:
                        this.textsKey[key].position.set(-1.77, 1.14, 1.2);
                        this.textsKey[key].fontSize = 0.10;
                        break;
                    case 4:
                        this.textsKey[key].position.set(-1.77, 0.9, 1.2);
                        this.textsKey[key].fontSize = 0.10;
                        break;
                    case 5:
                        this.textsKey[key].position.set(-1.3, -0.52, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 6:
                        this.textsKey[key].position.set(1.6, -0.25, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 7:
                        this.textsKey[key].position.set(-2.45, 1.13, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    default:
                        break;
                }

                this.textsKey[key].sync();
                this.groupText.add(this.textsKey[key]);
                this.scene.add(this.groupText);
            });
        }
    }

    _initLightOff() {
        const materialLightOff = new MeshBasicMaterial({color: 0xffb870, transparent: true, opacity: 0});
        this.materialLightOn = new MeshBasicMaterial({color: 0xffb870});
        const geometry1 = new PlaneBufferGeometry(0.13, 0.09);
        const smallLight = new PlaneBufferGeometry(0.05, 0.09);
        const mediumLight = new PlaneBufferGeometry(0.09, 0.12);
        const miniLight = new PlaneBufferGeometry(0.028, 0.06);

        // * light 1 - batiment central, en haut
        this.light1 = new Mesh(geometry1, this.materialLightOff);
        this.light1.position.set(-0.02, 0.09, 0.9);
        this.group.add(this.light1);

        // * light 2 - batiment central, en bas
        this.light2 = new Mesh(geometry1, this.materialLightOff);
        this.light2.position.set(-0.02, -0.18, 0.9);
        this.group.add(this.light2);

        // * light 3 - batiment droite, en haut
        this.light3 = new Mesh(smallLight, this.materialLightOff);
        this.light3.position.set(0.22, -0.08, 0.9);
        this.group.add(this.light3);

        // * light 4 - niv 2 - batiment central, au centre
        this.light4 = new Mesh(geometry1, this.materialLightOff);
        this.light4.position.set(-0.02, -0.09, 0.9);
        this.group.add(this.light4);

        // * light 5 - niv 2 - 2e fenetre au dessus du store
        this.light5 = new Mesh(smallLight, this.materialLightOff);
        this.light5.position.set(-0.28, -0.05, 0.9);
        this.group.add(this.light5);

        // * light 6 - niv 2 - store
        this.light6 = new Mesh(mediumLight, this.materialLightOff);
        this.light6.position.set(-0.26, -0.245, 0.9);
        this.group.add(this.light6);

        // * light 7 - niv 2 - batiement loin gauche
        this.light7 = new Mesh(smallLight, this.materialLightOff);
        this.light7.position.set(-0.15, 0.19, 0.9);
        this.group.add(this.light7);

        // * light 8 - niv 2 - projecteur droite
        this.light8 = new Mesh(mediumLight, this.materialLightOff);
        this.light8.position.set(0.31, 0.22, 0.9);
        this.light8.rotation.set(0, 0, (Math.PI / 2) * 0.07);
        this.group.add(this.light8);

        // * light 9 - niv 3 - projecteur gauche
        this.light9 = new Mesh(mediumLight, this.materialLightOff);
        this.light9.position.set(-0.33, 0.25, 0.9);
        this.light9.rotation.set(0, 0, (Math.PI / 2) * 0.5);
        this.group.add(this.light9);

        // * light 10 - niv 3 - fenetre au dessus du store
        this.light10 = new Mesh(smallLight, this.materialLightOff);
        this.light10.position.set(-0.274, -0.14, 0.9);
        this.group.add(this.light10);

        // * light 11 - niv 3 - fenetre loin en haut à gauche
        this.light11 = new Mesh(miniLight, this.materialLightOff);
        this.light11.position.set(-0.234, 0.257, 0.9);
        this.group.add(this.light11);

        // * light 12 - niv 3 - fenetre loin en bas
        this.light12 = new Mesh(miniLight, this.materialLightOff);
        this.light12.position.set(-0.234, 0.2, 0.9);
        this.group.add(this.light12);

        // * light 13 - niv 3 - fenetre analzon
        this.light13 = new Mesh(smallLight, this.materialLightOff);
        this.light13.position.set(-0.165, -0.136, 0.9);
        this.group.add(this.light13);
    }

    _turnOnLight(keyPressed) {
        if (this.difficultyGameLevel == '1') {
            if (this.toPressCodes.includes(keyPressed)) {
                switch (this.toPressCodes.indexOf(keyPressed)) {
                    case 0:
                        console.log('premiere lettre pressed')
                        this.light1.material = this.materialLightOn
                        break;
                    case 1:
                        this.light2.material = this.materialLightOn
                        break;
                    case 2:
                        this.light3.material = this.materialLightOn
                        break;

                    default:
                        break;
                }
            }
        }
        if (this.difficultyGameLevel == '2') {
            if (this.toPressCodes.includes(keyPressed)) {
                switch (this.toPressCodes.indexOf(keyPressed)) {
                    case 0:
                        console.log('premiere lettre pressed')
                        this.light4.material = this.materialLightOn
                        break;
                    case 1:
                        this.light6.material = this.materialLightOn
                        break;
                    case 2:
                        this.light5.material = this.materialLightOn
                        break;
                    case 3:
                        this.light7.material = this.materialLightOn
                        break;
                    case 4:
                        this.light8.material = this.materialLightOn
                        break;

                    default:
                        break;
                }
            }
        }
        if (this.difficultyGameLevel == '3') {
            if (this.toPressCodes.includes(keyPressed)) {
                switch (this.toPressCodes.indexOf(keyPressed)) {
                    case 0:
                        console.log('premiere lettre pressed')
                        this.light1.material = this.materialLightOn
                        break;
                    case 1:
                        this.light6.material = this.materialLightOn
                        break;
                    case 2:
                        this.light10.material = this.materialLightOn
                        break;
                    case 3:
                        this.light11.material = this.materialLightOn
                        break;
                    case 4:
                        this.light12.material = this.materialLightOn
                        break;
                    case 5:
                        this.light13.material = this.materialLightOn
                        break;
                    case 6:
                        this.light3.material = this.materialLightOn
                        break;
                    case 7:
                        this.light9.material = this.materialLightOn
                        break;

                    default:
                        break;
                }
            }
        }
    }

    _initGroup() {
        this.group = new Group();
        this.group.add(this.background);
        this._initLightOff();
        this.group.scale.set(
            this.camera.widthVisible,
            this.camera.heightVisible,
            1
        );
        this.scene.add(this.group);
    }
}
