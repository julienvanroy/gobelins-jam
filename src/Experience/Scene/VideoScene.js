import VideoPlane from "../Components/VideoPlane";
import FXScene from "./Core/FXScene";
import Experience from "../Experience";

export default class VideoScene extends FXScene
{
    constructor()
    {
        super()
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.videoPlane = new VideoPlane(this.camera.widthVisible, this.camera.heightVisible, this.scene)
    }
}
