import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";
import Experience from "../Experience";

export default class Cube
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this._initGeometry()
        this._initMaterial()
        this._initMesh()
    }

    _initGeometry()
    {
        this.geometry = new BoxGeometry();
    }

    _initMaterial()
    {
        this.material = new MeshBasicMaterial( { color: 0xffffff } );
    }

    _initMesh()
    {
        this.cube = new Mesh( this.geometry, this.material );
        this.scene.add( this.cube );
    }

    update()
    {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }
}
