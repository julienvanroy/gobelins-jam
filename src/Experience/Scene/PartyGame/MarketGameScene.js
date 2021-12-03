import FXScene from "../Core/FXScene";
import {
    Mesh,
    MeshBasicMaterial,
    NearestFilter,
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

        this.resources = this.experience.resources

        this.idInterval = null

        this.geometryProduct = new PlaneGeometry(0.4, 0.4);

        this.products = []

        this._initBackground()

        this._initCart();

    }

    load() {
        this.startGame()
    }

    _initBackground() {
        const geometry = new PlaneBufferGeometry(this.camera.widthVisible, this.camera.heightVisible);

        const colorTexture = this.resources.items.marketGameBackground
        colorTexture.generateMipmaps = false
        colorTexture.minFilter = NearestFilter

        const materialBg = new MeshBasicMaterial({map: colorTexture, transparent: true});
        const background = new Mesh(geometry, materialBg)
        this.scene.add(background)

        const screenTexture = this.resources.items.marketGameScreen
        screenTexture.generateMipmaps = false
        screenTexture.minFilter = NearestFilter

        const materialScreen = new MeshBasicMaterial({map: screenTexture, transparent: true});
        const screen = new Mesh(geometry, materialScreen)
        screen.position.z = -0.02
        this.scene.add(screen)
    }

    _initCart() {
        const geometry = new PlaneBufferGeometry(0.5, 0.5);
        const colorTexture = this.resources.items.marketGameCart
        colorTexture.generateMipmaps = false
        colorTexture.minFilter = NearestFilter
        const material = new MeshBasicMaterial({map: colorTexture, transparent: true});

        this.cart = new Mesh(geometry, material);
        this.cart.position.y = -0.27;
        this.scene.add(this.cart);
    }

    _createProduct() {
        const min = Math.ceil(1);
        const max = Math.floor(12);
        const random = Math.floor(Math.random() * (max - min)) + min;
        const texture = this.resources.items[`marketGameProduct${random}`]
        texture.generateMipmaps = false
        texture.minFilter = NearestFilter
        const material = new MeshBasicMaterial({map: texture, transparent: true});
        const product = new Mesh(this.geometryProduct, material);
        product.position.x = Math.random() * (this.limitScreen.x - (-this.limitScreen.x)) - this.limitScreen.x;
        product.position.y = this.limitScreen.y
        product.position.z = -0.01

        this.products.push(product)
        this.scene.add(product);
    }

    startGame() {
        this.idInterval = setInterval(() => this._createProduct(), 500)
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
            this.destroyMesh(object)
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
        if (this?.cart) {
            if (this.positionMouseMesh.x >= this.limitScreen.x) {
                this.cart.position.x = this.limitScreen.x
            } else if (this.positionMouseMesh.x <= -this.limitScreen.x) {
                this.cart.position.x = -this.limitScreen.x;
            } else this.cart.position.x = this.positionMouseMesh.x;
            this.products.map(product => {
                this._detectCollisionObject(product)
                product.position.y -= 0.01
            })
        }
    }

    destroyMesh(mesh) {
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
        clearInterval(this.idInterval)
        this.idInterval = null
    }

    destroy() {
        for (let i = this.products.length - 1; i >= 0; i--) {
            this.destroyMesh(this.products[i])
        }
    }
}
