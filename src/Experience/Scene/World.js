import Cube from "../Components/Cube";
import FXScene from "./Core/FXScene";

export default class World extends FXScene
{
    constructor()
    {
        super()
        this.cube = new Cube(this.scene)
    }

    update(_rtt)
    {
        super.update(_rtt)
        this.cube.update()
    }
}
