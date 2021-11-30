import MiniGameOrdi from "./MiniGameOrdi";

export default class World
{
    constructor()
    {
        this.MGOrdi = new MiniGameOrdi()
    }

    update()
    {
        this.MGOrdi.update()
    }
}
