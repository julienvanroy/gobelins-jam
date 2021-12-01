import FXScene from "../Core/FXScene";

export default class BurgerScene extends FXScene {
    constructor() {
        super()
        console.log('yes')
        window.addEventListener("keydown", this._listener.bind(this), true);
    }

    _listener(event) {
        if (event.defaultPrevented) return;
        switch (event.keyCode) {
            case 32:
                console.log("Espace")
                break;
            default:
                console.log('oui')
                return;
        }
        event.preventDefault();
    }

    destroy() {
        window.removeEventListener("keydown", this._listener.bind(this), true);
    }
}
