import EventEmitter from './EventEmitter.js'
import {Vector3} from "three";
import Experience from "../Experience";
import Sizes from "./Sizes";

export default class Mouse extends EventEmitter {
    constructor() {
        super();
        const sizes = new Sizes()

        this.position = new Vector3()


        const listener = (e) => {
            if (e.changedTouches && e.changedTouches.length) {
                e.x = e.changedTouches[0].pageX;
                e.y = e.changedTouches[0].pageY;
            }
            if (e.x === undefined) {
                e.x = e.pageX;
                e.y = e.pageY;
            }

            // Get mouse value in -1 to 1 range, with y flipped
            this.position.set((e.x / sizes.width) * 2 - 1, (e.y / sizes.height) * -2 + 1, 0);
            this.trigger('mouseMove')
        }

        if ("ontouchstart" in window) {
            window.addEventListener("touchstart", listener, false);
            window.addEventListener("touchmove", listener, false);
        } else {
            window.addEventListener("mousemove", listener, false);
        }
    }
}
