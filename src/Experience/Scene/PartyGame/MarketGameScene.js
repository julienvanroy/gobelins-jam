import FXScene from "../Core/FXScene";
import {CircleGeometry, Mesh, MeshBasicMaterial, PlaneGeometry} from "three";
import gsap from "gsap";

export default class MarketGameScene extends FXScene {
    constructor() {
        super()
        this.posMesh = this.experience.posMesh;

        this.CADDIE_WIDTH = 1;
        this.CADDIE_HEIGHT = 0.2;

        this.ARTICLE_RADIUS = 0.5;

        this._initGeometry();
        this._initMaterial();
        this._initMesh();
        this._initGenerator();
    }

    _initGeometry() {
        console.log("initGeometry");
        this.geometry = new PlaneGeometry(this.CADDIE_WIDTH, this.CADDIE_HEIGHT);
        this.geometryC = new CircleGeometry(this.ARTICLE_RADIUS, 32);
    }

    _initMaterial() {
        console.log("initMaterial");
        this.material = new MeshBasicMaterial({ color: 0x99a39c });
        this.materialC = new MeshBasicMaterial({ color: 0xf57242 });
    }

    _initMesh() {
        console.log("initMesh");

        // caddie
        this.caddie = new Mesh(this.geometry, this.material);
        this.caddie.position.y = this.caddie.position.y - 2;
        this.scene.add(this.caddie);
    }

    _initGenerator() {
        // setInterval(() => {
        this.article = new Mesh(this.geometryC, this.materialC);
        this.article.position.y = 2;
        this.article.position.x = Math.random() * (3 - -3) + -3;
        this.scene.add(this.article);
        console.log("scale", this.article.scale.x);

        // tombe
        gsap.to(this.article.position, { duration: 1, delay: 1, y: -2 });
        // fade out
        gsap.to(this.article.scale, {
            duration: 2,
            delay: 3,
            y: 0,
            x: 0,
            onComplete: () => {
                this.article.geometry.dispose();
                this.article.material.dispose();
            },
        });
        // }, 1000);
    }

    articleCollisionX() {
        var halfCaddieWidth = this.CADDIE_WIDTH / 2,
            caddieX = this.caddie.position.x,
            articleX = this.article.position.x;

        return (
            articleX + this.ARTICLE_RADIUS > caddieX - halfCaddieWidth &&
            articleX - this.ARTICLE_RADIUS < caddieX + halfCaddieWidth
        );
    }

    articleCollisionY() {
        var halfCaddieHeight = this.CADDIE_HEIGHT / 2,
            caddieY = this.caddie.position.y,
            articleY = this.article.position.y;

        return articleY - this.ARTICLE_RADIUS <= caddieY + halfCaddieHeight;
    }

    processArticleMovement() {
        if (this.articleCollisionY() && this.articleCollisionX()) {
            console.log(String.fromCodePoint(0x1f525));
        }
    }

    update(_rtt) {
        super.update(_rtt)
        this.caddie.position.x = this.experience.posMesh.x;
        this.processArticleMovement();
    }
}
