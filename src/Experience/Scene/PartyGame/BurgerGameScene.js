import FXScene from "../Core/FXScene";
import {Mesh, MeshBasicMaterial, PlaneBufferGeometry, NearestFilter} from "three";
import {gsap} from "gsap";


export default class BurgerGameScene extends FXScene {
    constructor() {
        super()
        this.resources = this.experience.resources
        this.synth = this.experience.synth
        this.geometryPlane = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);
    }

    load() {
        this.difficultyGameLevel = this.experience.difficultyGameLevel
        this.setWinCondition()
        const colorTexture = this.resources.items[`burgerGame${this.difficultyGameLevel}Background`]
        colorTexture.generateMipmaps = false
        colorTexture.minFilter = NearestFilter
        const material = new MeshBasicMaterial({map: colorTexture});
        const mesh = new Mesh(this.geometryPlane, material)
        this.scene.add(mesh)
        window.addEventListener("keydown", this._listener.bind(this), true);
    }

    setWinCondition() {
        this.isWin = false
        this.counterWinCondition = 0
        switch (this.difficultyGameLevel) {
            case 1:
                this.winCondition = 8
                break;
            case 2:
                this.winCondition = 18
                break;
            case 3:
                this.winCondition = 28
                break;
            default:
                return;
        }
    }

    _listener(event) {
        if (event.defaultPrevented || this.isWin) return;
        switch (event.keyCode) {
            case 32:
                const colorTexture = this.resources.items[`burgerGame${this.difficultyGameLevel}-${this.counterWinCondition}`]
                colorTexture.generateMipmaps = false
                colorTexture.minFilter = NearestFilter
                const material = new MeshBasicMaterial({map: colorTexture, transparent: true});
                const mesh = new Mesh(this.geometryPlane, material)
                mesh.position.y = 3
                this.scene.add(mesh)
                this.counterWinCondition++
                this._playSound(this.counterWinCondition);
                this.isWin = (this.counterWinCondition > this.winCondition)
                if(this.isWin) {
                    gsap.to(mesh.position, {
                        y: 0,
                        duration: 0.25
                    })
                } else {
                    gsap.to(mesh.position, {
                        y: 0,
                        duration: 0.25
                    })
                }
                break;
            default:
                return;
        }
        event.preventDefault();
    }

    _playSound() {

        switch (this.counterWinCondition) {
            case 1:
                this.synth.triggerAttackRelease("C2", "5hz");
                break;

            case 2:
                this.synth.triggerAttackRelease("D2", "5hz");
                break;

            case 3:
                this.synth.triggerAttackRelease("E2", "5hz");
                break;

            case 4:
                this.synth.triggerAttackRelease("F2", "5hz");
                break;

            case 5:
                this.synth.triggerAttackRelease("G2", "5hz");
                break;
            case 6:
                this.synth.triggerAttackRelease("A2", "5hz");
                break;
            case 7:
                this.synth.triggerAttackRelease("B2", "5hz");
                break;
            case 8:
                this.synth.triggerAttackRelease("C3", "5hz");
                break;
            case 9:
                this.synth.triggerAttackRelease("D3", "5hz");
                break;
            case 10:
                this.synth.triggerAttackRelease("E3", "5hz");
                break;
            case 11:
                this.synth.triggerAttackRelease("F3", "5hz");
                break;
            case 12:
                this.synth.triggerAttackRelease("G3", "5hz");
                break;
            case 13:
                this.synth.triggerAttackRelease("A3", "5hz");
                break;
            case 14:
                this.synth.triggerAttackRelease("B3", "5hz");
                break;
            case 15:
                this.synth.triggerAttackRelease("C4", "5hz");
                break;
            case 16:
                this.synth.triggerAttackRelease("D4", "5hz");
                break;
            case 17:
                this.synth.triggerAttackRelease("E4", "5hz");
                break;
            case 18:
                this.synth.triggerAttackRelease("F4", "5hz");
                break;
            case 19:
                this.synth.triggerAttackRelease("G4", "5hz");
                break;
            case 20:
                this.synth.triggerAttackRelease("A4", "5hz");
                break;
            case 21:
                this.synth.triggerAttackRelease("B4", "5hz");
                break;
            case 22:
                this.synth.triggerAttackRelease("C5", "5hz");
                break;
            case 23:
                this.synth.triggerAttackRelease("D5", "5hz");
                break;
            case 24:
                this.synth.triggerAttackRelease("E5", "5hz");
                break;
            case 25:
                this.synth.triggerAttackRelease("F5", "5hz");
                break;
            case 26:
                this.synth.triggerAttackRelease("G5", "5hz");
                break;
            case 27:
                this.synth.triggerAttackRelease("A5", "5hz");
                break;
            case 28:
                this.synth.triggerAttackRelease("B5", "5hz");
                break;
            case 29:
                this.synth.triggerAttackRelease("C6", "5hz");
                break;
            default:
                break;
        }
        // switch (this.counterWinCondition) {
        //     case 1:
        //         let pitch = new Tone.PitchShift(1).toDestination()
        //         let synth = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch);
        //         synth.autostart = true;
        //         break;

        //     case 2:
        //         let pitch2 = new Tone.PitchShift(3).toDestination()
        //         let synth2 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch2);
        //         synth2.autostart = true;
        //         break;

        //     case 3:
        //         let pitch3 = new Tone.PitchShift(5).toDestination()
        //         let synth3 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch3);
        //         synth3.autostart = true;
        //         break;

        //     case 4:
        //         let pitch4 = new Tone.PitchShift(7).toDestination()
        //         let synth4 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch4);
        //         synth4.autostart = true;
        //         break;

        //     case 5:
        //         let pitch5 = new Tone.PitchShift(9).toDestination()
        //         let synth5 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch5);
        //         synth5.autostart = true;
        //         break;
        //     case 6:
        //         let pitch6 = new Tone.PitchShift(11).toDestination()
        //         let synth6 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch6);
        //         synth6.autostart = true;
        //         break;
        //     case 7:
        //         let pitch7 = new Tone.PitchShift(13).toDestination()
        //         let synth7 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch7);
        //         synth7.autostart = true;
        //         break;
        //     case 8:
        //         let pitch8 = new Tone.PitchShift(15).toDestination()
        //         let synth8 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch8);
        //         synth8.autostart = true;
        //         break;
        //     case 9:
        //         let pitch9 = new Tone.PitchShift(17).toDestination()
        //         let synth9 = new Tone.Player("/mp3/swipe.mp3").toDestination().connect(pitch9);
        //         synth9.autostart = true;
        //         break;
        //     default:
        //         break;
        // }
    }


    destroy() {
        super.destroy()
        window.removeEventListener("keydown", this._listener.bind(this), true);
    }
}
