import * as THREE from 'three';
import World from './World';

class Game {
	constructor() {
		this.renderer = this.#createRenderer();
		this.world = World.getInstance(this.renderer);

		this.#render()
	}

	#createCanvas() {
		const canvas = document.createElement('canvas');
		canvas.id = "game-canvas"
		document.body.appendChild(canvas)

		return canvas
	}

	#createRenderer() {
		const canvas = this.#createCanvas();
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.1;
		renderer.outputEncoding = THREE.sRGBEncoding;

		return renderer
	}

	#shouldResizeRender() {
		const { width, height, clientWidth, clientHeight } = this.renderer.domElement;
		return width !== clientWidth || height !== clientHeight;
	}

	#resizeRenderer() {
		const { clientWidth, clientHeight } = this.renderer.domElement;
		this.renderer.setSize(clientWidth, clientHeight, false);
	}

	#render() {
		if (this.#shouldResizeRender()) {
			this.#resizeRenderer()

			const { clientWidth, clientHeight } = this.renderer.domElement
			this.world.camera.aspect = clientWidth / clientHeight;
			this.world.camera.updateProjectionMatrix();
		}

		this.renderer.render(this.world.scene, this.world.camera);
		console.log('rendering')

		requestAnimationFrame(() => this.#render());
	}
}

export default Game
