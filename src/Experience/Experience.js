import Debug from "./Utils/Debug.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./Scene/World/World.js";
import { Mesh, Scene, Vector3 } from "three";
import Mouse from "./Utils/Mouse";

let instance = null;

export default class Experience {
  constructor(_canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = _canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.mouse = new Mouse();
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.posMesh = new Vector3(0, 0, 0); 

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });

    // Mouse move event
    this.mouse.on("mouseMove", () => {
      this.mouseMove();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.debug.begin();
    this.camera.update();
    this.world.update();
    this.renderer.update();
    this.debug.end();
  }

  mouseMove() {
    var vector = new Vector3(this.mouse.position.x, this.mouse.position.y, 0.5);
    vector.unproject(this.camera.instance);
    var dir = vector.sub(this.camera.instance.position).normalize();
    var distance = -this.camera.instance.position.z / dir.z;
    var pos = this.camera.instance.position.clone().add(dir.multiplyScalar(distance));

    this.posMesh = pos;

    // console.log('CADDIE POS', this.posMesh.x)

  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");
    this.mouse.off("mouseMove");

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
