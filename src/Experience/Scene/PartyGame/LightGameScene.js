import FXScene from "../Core/FXScene";
import {Group, Mesh, MeshBasicMaterial, PlaneBufferGeometry,} from "three";
import {Text} from "troika-three-text";
import * as Tone from 'tone'

export default class LightGameScene extends FXScene {
    constructor() {
        super();
        this.resources = this.experience.resources;

        this.player = new Tone.Player("/mp3/interrupteur.mp3").toDestination();
        this.player.volume.value = 14;

        this.materialLight = new MeshBasicMaterial({
            color: 0xffb870,
            transparent: true,
            opacity: 0,
        });

        this.difficultyGameLevel = this.experience.difficultyGameLevel

        this._initBackground()
        this._initLight();
    }

    load() {
        this.difficultyGameLevel = this.experience.difficultyGameLevel
        this.isWin = false
        this.experience.renderer.instance.setClearColor('#1d1e82')
        //Update Background
        this.materialBg.map = this.resources.items[`lightGame${this.difficultyGameLevel}Background`]
        this.background.material.needsUpdate = true
        this._initTirage();
        document.addEventListener("keydown", this._onDocumentKeyDown.bind(this), false);
    }

    _onDocumentKeyDown(event) {
        const keyCode = event.which;
        if (this.toPressCodes.includes(keyCode)) {
            // retire la lettre des touches à presser
            this._turnOnLight(keyCode);
            this.player.start()
            this.player.stop("+0.5")
            const index = this.toPressCodes.indexOf(keyCode)
            this._turnOffLetter(keyCode)
            this.toPressCodes[index] = '/'
            if (this.toPressCodes.every(item => item === '/')) {
                this.isWin = true
            }
        }
    }

    _initBackground() {
        const geometry = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);

        const map = this.resources.items[`lightGame${this.difficultyGameLevel}Background`];

        this.materialBg = new MeshBasicMaterial({
            map: map,
            transparent: true,
        });

        this.background = new Mesh(geometry, this.materialBg);
        this.scene.add(this.background)
    }

    _initTirage() {
        switch (this.difficultyGameLevel) {
            case 1:
                this.nWindows = 3;
                break;
            case 2:
                this.nWindows = 5;
                break;
            case 3:
                this.nWindows = 7;
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
        this._initTextGroup();
    }

    _initTextGroup() {
        this.groupText = new Group();

        if (this.difficultyGameLevel === 1) {
            this.toPressCodes.forEach((key, index) => {
                this.textsKey[key] = new Text();
                this.textsKey[key].text = String.fromCharCode(key);
                // myText.position.set(0, 0, 1.2);
                this.textsKey[key].color = 0xf3e9e2;

                switch (index) {
                    case 0:
                        this.textsKey[key].position.set(-0.21, 0.47, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 1:
                        this.textsKey[key].position.set(-0.23, -0.52, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 2:
                        this.textsKey[key].position.set(1.35, -0.19, 1.2);
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

        if (this.difficultyGameLevel === 2) {
            this.toPressCodes.forEach((key, index) => {
                this.textsKey[key] = new Text();
                this.textsKey[key].text = String.fromCharCode(key);
                // myText.position.set(0, 0, 1.2);
                this.textsKey[key].color = 0xf3e9e2;

                switch (index) {
                    case 0:
                        this.textsKey[key].position.set(-0.19, -0.22, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 1:
                        this.textsKey[key].position.set(-1.64, -0.80, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 2:
                        this.textsKey[key].position.set(-1.82, -0.11, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 3:
                        this.textsKey[key].position.set(-1.02, 0.83, 1.2);
                        this.textsKey[key].fontSize = 0.10;
                        break;
                    case 4:
                        this.textsKey[key].position.set(1.93, 0.9, 1.2);
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

        if (this.difficultyGameLevel === 3) {
            this.toPressCodes.forEach((key, index) => {
                this.textsKey[key] = new Text();
                this.textsKey[key].text = String.fromCharCode(key);
                // myText.position.set(0, 0, 1.2);
                this.textsKey[key].color = 0xf3e9e2;

                switch (index) {
                    case 0:
                        this.textsKey[key].position.set(-0.21, 0.47, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 1:
                        this.textsKey[key].position.set(-1.64, -0.80, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 2:
                        this.textsKey[key].position.set(-1.82, -0.42, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 3:
                        this.textsKey[key].position.set(-1.52, 0.98, 1.2);
                        this.textsKey[key].fontSize = 0.10;
                        break;
                    case 4:
                        this.textsKey[key].position.set(-1.52, 0.79, 1.2);
                        this.textsKey[key].fontSize = 0.10;
                        break;
                    case 5:
                        this.textsKey[key].position.set(-2.12, 1, 1.2);
                        this.textsKey[key].fontSize = 0.20;
                        break;
                    case 6:
                        this.textsKey[key].position.set(1.37, -0.21, 1.2);
                        this.textsKey[key].fontSize = 0.15;
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


    _turnOffLetter(index) {
        this.textsKey[index].text = '';
    }

    _initLight() {
        this.group = new Group();

        const geometry1 = new PlaneBufferGeometry(0.13, 0.09);
        const smallLight = new PlaneBufferGeometry(0.05, 0.09);
        const mediumLight = new PlaneBufferGeometry(0.09, 0.12);
        const miniLight = new PlaneBufferGeometry(0.028, 0.06);

        // * light 1 - batiment central, en haut
        this.light1 = new Mesh(geometry1, this.materialLight.clone());
        this.light1.position.set(-0.02, 0.09, -0.1);
        this.group.add(this.light1);

        // * light 2 - batiment central, en bas
        this.light2 = new Mesh(geometry1, this.materialLight.clone());
        this.light2.position.set(-0.02, -0.18, -0.1);
        this.group.add(this.light2);

        // * light 3 - batiment droite, en haut
        this.light3 = new Mesh(smallLight, this.materialLight.clone());
        this.light3.position.set(0.22, -0.08, -0.1);
        this.group.add(this.light3);

        // * light 4 - niv 2 - batiment central, au centre
        this.light4 = new Mesh(geometry1, this.materialLight.clone());
        this.light4.position.set(-0.02, -0.09, -0.1);
        this.group.add(this.light4);

        // * light 5 - niv 2 - 2e fenetre au dessus du store
        this.light5 = new Mesh(smallLight, this.materialLight.clone());
        this.light5.position.set(-0.28, -0.05, -0.1);
        this.group.add(this.light5);

        // * light 6 - niv 2 - store
        this.light6 = new Mesh(mediumLight, this.materialLight.clone());
        this.light6.position.set(-0.26, -0.245, -0.1);
        this.group.add(this.light6);

        // * light 7 - niv 2 - batiement loin gauche
        this.light7 = new Mesh(smallLight, this.materialLight.clone());
        this.light7.position.set(-0.15, 0.19, -0.1);
        this.group.add(this.light7);

        // * light 8 - niv 2 - projecteur droite
        this.light8 = new Mesh(mediumLight, this.materialLight.clone());
        this.light8.position.set(0.31, 0.22, -0.1);
        this.light8.rotation.set(0, 0, (Math.PI / 2) * 0.07);
        this.group.add(this.light8);

        // * light 9 - niv 3 - projecteur gauche
        this.light9 = new Mesh(mediumLight, this.materialLight.clone());
        this.light9.position.set(-0.33, 0.25, -0.1);
        this.light9.rotation.set(0, 0, (Math.PI / 2) * 0.5);
        this.group.add(this.light9);

        // * light 10 - niv 3 - fenetre au dessus du store
        this.light10 = new Mesh(smallLight, this.materialLight.clone());
        this.light10.position.set(-0.274, -0.14, -0.1);
        this.group.add(this.light10);

        // * light 11 - niv 3 - fenetre loin en haut à gauche
        this.light11 = new Mesh(miniLight, this.materialLight.clone());
        this.light11.position.set(-0.234, 0.257, -0.1);
        this.group.add(this.light11);

        // * light 12 - niv 3 - fenetre loin en bas
        this.light12 = new Mesh(miniLight, this.materialLight.clone());
        this.light12.position.set(-0.234, 0.2, -0.1);
        this.group.add(this.light12);

        // * light 13 - niv 3 - fenetre analzon
        this.light13 = new Mesh(smallLight, this.materialLight.clone());
        this.light13.position.set(-0.165, -0.136, -0.1);
        this.group.add(this.light13);

        this.group.scale.set(
            this.camera.widthVisible,
            this.camera.heightVisible,
            1
        );
        this.scene.add(this.group);
    }

    _turnOnLight(keyPressed) {
        if (this.difficultyGameLevel === 1) {
            if (this.toPressCodes.includes(keyPressed)) {
                switch (this.toPressCodes.indexOf(keyPressed)) {
                    case 0:
                        this._openLight(this.light1)
                        break;
                    case 1:
                        this._openLight(this.light2)
                        break;
                    case 2:
                        this._openLight(this.light3)
                        break;

                    default:
                        break;
                }
            }
        }
        if (this.difficultyGameLevel === 2) {
            if (this.toPressCodes.includes(keyPressed)) {
                switch (this.toPressCodes.indexOf(keyPressed)) {
                    case 0:
                        this._openLight(this.light4)
                        break;
                    case 1:
                        this._openLight(this.light6)
                        break;
                    case 2:
                        this._openLight(this.light5)
                        break;
                    case 3:
                        this._openLight(this.light7)
                        break;
                    case 4:
                        this._openLight(this.light8)
                        break;
                    default:
                        break;
                }
            }
        }
        if (this.difficultyGameLevel === 3) {
            if (this.toPressCodes.includes(keyPressed)) {
                switch (this.toPressCodes.indexOf(keyPressed)) {
                    case 0:
                        this._openLight(this.light1)
                        break;
                    case 1:
                        this._openLight(this.light6)
                        break;
                    case 2:
                        this._openLight(this.light10)
                        break;
                    case 3:
                        this._openLight(this.light11)
                        break;
                    case 4:
                        this._openLight(this.light12)
                        break;
                    case 5:
                        this._openLight(this.light9)
                        break;
                    case 6:
                        this._openLight(this.light3)
                        break;
                    default:
                        break;
                }
            }
        }
    }

    _openLight(mesh) {
        mesh.material.opacity = 1
    }

    destroy() {
        document.removeEventListener("keydown", this._onDocumentKeyDown.bind(this), false);
        if (this.groupText) this.scene.remove(this.groupText)
        for (let i = this.group.children.length - 1; i >= 0; i--) {
            const child = this.group.children[i]
            child.material.opacity = 0
        }
    }
}
