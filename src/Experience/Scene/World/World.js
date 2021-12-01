import MiniGameOrdi from "./MiniGameOrdi";
import MiniGameCaddie from "./MiniGameCaddie";

export default class World
{
    constructor()
    {
        this.MGOrdi = new MiniGameCaddie()
    }

    update()
    {
        this.MGOrdi.update()
    }
}
