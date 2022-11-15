import * as THREE from 'three';
import World from './World';

class Game {
	constructor() {
		const renderer = this.#createRenderer();
		const world = World.getInstance(renderer);

		this.#render(1000, renderer, world.camera, world.scene)
	}

	#createCanvas() {
		const canvas = document.createElement('canvas');
		canvas.id = "game-canvas"
		document.body.appendChild(canvas)

		return canvas
	}

	#createRenderer() {
		const canvas = this.#createCanvas();
		const renderer = new THREE.WebGLRenderer({ canvas });

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.1;
		renderer.outputEncoding = THREE.sRGBEncoding;

		return renderer
	}

	#shouldResizeRender(renderer) {
		const { width, height, clientWidth, clientHeight } = renderer.domElement;
		return width !== clientWidth || height !== clientHeight;
	}

	#resizeRenderer(renderer) {
		const { clientWidth, clientHeight } = renderer.domElement;
		renderer.setSize(clientWidth, clientHeight, false);
	}

	#render(time, renderer, camera, scene) {
		time *= 0.001;  // convert time to seconds

		if (this.#shouldResizeRender(renderer)) {
			this.#resizeRenderer(renderer)

			const { clientWidth, clientHeight } = renderer.domElement
			camera.aspect = clientWidth / clientHeight;
			camera.updateProjectionMatrix();
		}

		renderer.render(scene, camera);
		console.log('rendering')

		// requestAnimationFrame((t) => this.#render(t, renderer, camera, scene));
	}
}

export default Game
