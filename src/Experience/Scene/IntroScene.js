import VideoPlane from "../Components/VideoPlane";
import FXScene from "./Core/FXScene";

export default class IntroScene extends FXScene
{
    constructor()
    {
        super()
        this.videoPlane = new VideoPlane('intro.mp4', this.scene)
    }
}
