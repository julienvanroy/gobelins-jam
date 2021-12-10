import FXScene from "../Core/FXScene";
import {
    Mesh,
    MeshBasicMaterial,
    PlaneBufferGeometry,
    PlaneGeometry,
    Vector3,
} from "three";

export default class MarketGameScene extends FXScene {
    constructor() {
        super()
        this.mouse = this.experience.mouse
        this.positionMouseMesh = new Vector3(0, 0, 0);
        this.limitScreen = new Vector3(1.7, 1.8, 0);

        this.time = this.experience.time

        this.resources = this.experience.resources

        this.minProduct = Math.ceil(1);
        this.maxProduct = Math.floor(12);

        this._initBackground()

        this._initCart();

        this._initProducts()
    }

    difficultyLevel() {
        this.difficultyGameLevel = this.experience.difficultyGameLevel

        switch (this.difficultyGameLevel) {
            case 1:
                this.speed = 0.01
                this.timeInterval = 0.500
                break;
            case 2:
                this.speed = 0.0175
                this.timeInterval = 0.400
                break;
            case 3:
                this.speed = 0.025
                this.timeInterval = 0.300
                break;
            default:
                return;
        }
    }

    load() {
        this.isLost = false
        this.difficultyLevel()
        this.startGame()
    }

    _initBackground() {
        const geometry = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);

        const mapBgTexture = this.resources.items.marketGameBackground

        const materialBg = new MeshBasicMaterial({map: mapBgTexture, transparent: true});
        const meshBg = new Mesh(geometry, materialBg)
        this.scene.add(meshBg)

        const mapScreenTexture = this.resources.items.marketGameScreen

        const materialScreen = new MeshBasicMaterial({map: mapScreenTexture});
        const meshScreen = new Mesh(geometry, materialScreen)
        meshScreen.position.z = -0.02
        this.scene.add(meshScreen)
    }

    _initCart() {
        const geometry = new PlaneBufferGeometry(0.5, 0.5);
        const mapTexture = this.resources.items.marketGameCart
        const material = new MeshBasicMaterial({map: mapTexture, transparent: true});

        this.cart = new Mesh(geometry, material);
        this.cart.position.y = -0.27;
        this.scene.add(this.cart);
    }

    _initProducts() {
        this.products = []
        this.productsGame = []

        this.geometryProduct = new PlaneGeometry(0.4, 0.4);

        for( let i = this.minProduct; i <= this.maxProduct; i++ ){
            const map = this.resources.items[`marketGameProduct${i}`]
            const material = new MeshBasicMaterial({map: map, transparent: true})
            this.products.push( new Mesh( this.geometryProduct, material ) );
        }
    }

    addProduct() {
        if(this.isAddProduct) return;
        this.isAddProduct = true
        const random = Math.floor(Math.random() * (this.maxProduct - this.minProduct)) + this.minProduct;
        const product = this.products[random].clone()
        product.position.x = Math.random() * (this.limitScreen.x - (-this.limitScreen.x)) - this.limitScreen.x;
        product.position.y = this.limitScreen.y
        product.position.z = -0.01

        this.productsGame.push(product)
        this.scene.add(product);
        this.isAddProduct = false
    }

    startGame() {
        this.isStartGame = true
    }

    _detectCollisionObject(object) {
        const halfCaddieWidth = this.cart.geometry.parameters.width / 2,
            halfCaddieHeight = this.cart.geometry.parameters.height / 2,
            caddiePos = this.cart.position,
            objectPos = object.position,
            objectBorder = 0.385,
            objectWidth = this.geometryProduct.parameters.width - objectBorder,
            objectHeight = this.geometryProduct.parameters.height - objectBorder

        const isCollisionX = !!(objectPos.x + objectWidth >= caddiePos.x - halfCaddieWidth && objectPos.x - objectWidth <= caddiePos.x + halfCaddieWidth);
        const isCollisionY = !!(objectPos.y + objectHeight >= caddiePos.y - halfCaddieHeight && objectPos.y - objectHeight <= caddiePos.y + halfCaddieHeight);

        if (isCollisionX && isCollisionY) {
            this.destroyMeshProduct(object)
            this.productsGame = this.productsGame.filter(product => product !== object)
        }
    }

    mouseMove() {
        const vector = new Vector3(this.mouse.position.x, this.mouse.position.y, 0.5);
        vector.unproject(this.camera.instance);
        const dir = vector.sub(this.camera.instance.position).normalize();
        const distance = -this.camera.instance.position.z / dir.z;
        this.positionMouseMesh = this.camera.instance.position.clone().add(dir.multiplyScalar(distance));
    }

    update(_rtt) {
        super.update(_rtt)
        if(this.isStartGame) {
            const time = this.time.clock.getElapsedTime()

            if ( time > this.timeInterval ) {

                this.addProduct()
                this.time.clock.start();
            }
        }
        if (this?.cart) {
            if (this.positionMouseMesh.x >= this.limitScreen.x) {
                this.cart.position.x = this.limitScreen.x
            } else if (this.positionMouseMesh.x <= -this.limitScreen.x) {
                this.cart.position.x = -this.limitScreen.x;
            } else this.cart.position.x = this.positionMouseMesh.x;
            this.productsGame.map((product) => {
                this._detectCollisionObject(product)
                product.position.y -= this.speed
                if(product.position.y <= -1) {
                    this.isLost = true
                }
            })
        }
    }

    destroyMeshProduct(mesh) {
        if (mesh instanceof Mesh) {
            mesh.geometry.dispose()
            // Loop through the material properties
            for (const key in mesh.material) {
                const value = mesh.material[key]
                // Test if there is a dispose function
                if (value && typeof value.dispose === 'function') {
                    value.dispose()
                }
            }

            this.scene.remove(mesh)
        }
    }

    stopGame() {
        this.isStartGame = false
    }

    destroy() {
        this.stopGame()
        for (let i = this.productsGame.length - 1; i >= 0; i--) {
            this.destroyMeshProduct(this.productsGame[i])
        }
        this.productsGame = []
    }
}
