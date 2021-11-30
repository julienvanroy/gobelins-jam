import Cube from "../Components/Cube";

export default class World
{
    constructor()
    {
        this.cube = new Cube()
    }

    update()
    {
        this.cube.update()
    }
}
