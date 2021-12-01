import VideoPlane from "../Components/VideoPlane";
import FXScene from "./Core/FXScene";

export default class OutroScene extends FXScene
{
    constructor()
    {
        super()
        this.videoPlane = new VideoPlane('outro.mp4', this.scene)
    }
}
