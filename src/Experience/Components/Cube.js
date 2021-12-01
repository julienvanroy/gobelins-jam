import {BoxGeometry, Mesh, MeshBasicMaterial} from "three";

export default class Cube
{
    constructor(_scene)
    {
        this.scene = _scene
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
        this.mesh = new Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    update()
    {
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }
}
