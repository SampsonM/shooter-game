import * as THREE from 'three';

function shouldResizeRender(renderer) {
	const { width, height, clientWidth, clientHeight } = renderer.domElement;
	return width !== clientWidth || height !== clientHeight;
}

function resizeRenderer(renderer) {
	const { clientWidth, clientHeight } = renderer.domElement;
	renderer.setSize(clientWidth, clientHeight, false);
}

function createCamera() {
	const fov = 85;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 5;
	return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

function createBoxGeometry() {
	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;

	return new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
}

function createCubeInstance(geometry, color, x, scene) {
	const material = new THREE.MeshPhongMaterial({ color });
	const cube = new THREE.Mesh(geometry, material);
	cube.position.x = x;

	scene.add(cube);

	return cube;
}

function createLight(scene, x, y, z) {
	const color = 0xFFFF00;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(x, y, z);

	scene.add(light);

	return light
}

function renderCubes(time, renderer, camera, cubes, scene) {
	time *= 0.001;  // convert time to seconds

	if (shouldResizeRender(renderer)) {
		resizeRenderer(renderer)

		const { clientWidth, clientHeight } = renderer.domElement
		camera.aspect = clientWidth / clientHeight;
		camera.updateProjectionMatrix();
	}

	cubes.forEach((cube, ndx) => {
		const speed = 1 + ndx * .1;
		const rot = time * speed;
		cube.rotation.x = rot;
		cube.rotation.y = rot;
	});

	renderer.render(scene, camera);

	requestAnimationFrame((t) => renderCubes(t, renderer, camera, cubes, scene));
}

function createCanvas() {
	const canvas = document.createElement('canvas');
	canvas.id = "game-canvas"
	document.body.appendChild(canvas)

	return canvas
}

class Game {
	constructor() {
		const canvas = createCanvas();
		const renderer = new THREE.WebGLRenderer({ canvas });
		const scene = new THREE.Scene();
	
		const camera = createCamera();
		camera.position.z = 2;
	
		createLight(scene, -1, 2, 4)
	
		const boxGeometry = createBoxGeometry();
	
		const cubes = [
			createCubeInstance(boxGeometry, 0x44aa88, 0, scene),
			createCubeInstance(boxGeometry, 0x8844aa, -2, scene),
			createCubeInstance(boxGeometry, 0xaa8844, 2, scene),
		];
	
		renderCubes(1000, renderer, camera, cubes, scene)
	}
}

export default Game
