import * as THREE from 'three';
import { Sky } from '../helpers/Sky';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

class World {
	constructor(renderer) {
		this.scene = new THREE.Scene();
		this.renderer = renderer;
		this.lights = {};
		
		this.#buildWorld();
	}

	static getInstance(renderer) {
		if (!this.instance) {
			console.log('Creating world...');
			this.instance = new World(renderer);
		}
		
		console.log('World creation complete!');
		return this.instance
	}

	#buildWorld() {
		this.#addLight();
		this.#setUpCamera();
		this.#setUpBoard();
		this.#setUpLandMass();
	}

	#addLight() {
		const sky = new Sky();

		sky.scale.setScalar(450000);
		sky.material.uniforms['turbidity'].value = 10;
		sky.material.uniforms['rayleigh'].value = 3;
		sky.material.uniforms['mieCoefficient'].value = 0.0005;
		sky.material.uniforms['mieDirectionalG'].value = 0.7;
		
		this.scene.add(sky);

		const phi = THREE.MathUtils.degToRad(88);
		const theta = THREE.MathUtils.degToRad(180);
		const sun = new THREE.Vector3();

		sun.setFromSphericalCoords(1, phi, theta);

		sky.material.uniforms['sunPosition'].value.copy(sun);
	}

	#setUpCamera() {
		const fov = 80;
		const aspect = 2;
		const near = 0.1;
		const far = 9000;
		
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.z = 350;
		this.camera.position.y = 50;

		const controls = new OrbitControls(this.camera, this.renderer.domElement);

		controls.minPolarAngle = THREE.MathUtils.degToRad(45);
		controls.maxPolarAngle = THREE.MathUtils.degToRad(80);

		controls.enableZoom = false;
		controls.enablePan = false;
	}

	#setUpBoard() {
		const texture = new THREE.TextureLoader().load('./assets/textures/floor.jpeg')
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(8, 8);

		const planeMaterial = new THREE.MeshBasicMaterial({ color: '0xffff00', map: texture });
		const planeGeometry = new THREE.BoxGeometry(300, 300, 20, 20, 20, 1);
		const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

		planeMesh.rotateX(THREE.MathUtils.degToRad(90))
		planeMesh.material.side = THREE.FrontSide;

		this.scene.add(planeMesh);
	}

	#setUpLandMass() {
		const worldWidth = 256
		const worldDepth = 206
		
		const data = this.#generateHeight(worldWidth, worldDepth);
		
		const geometry = new THREE.PlaneGeometry(7500, 7500, worldWidth - 1, worldDepth - 1);
		geometry.rotateX(-Math.PI / 2);

		const vertices = geometry.attributes.position.array;

		for (let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3) {
			vertices[j + 1] = data[i] * 10;
		}

		let texture = new THREE.CanvasTexture(this.#generateTexture(data, worldWidth, worldDepth));
		texture.wrapS = THREE.ClampToEdgeWrapping;
		texture.wrapT = THREE.ClampToEdgeWrapping;

		let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));

		mesh.translateY(-800)
		this.scene.add(mesh);
	}

	#generateHeight(width, height) {
		const size = width * height
		const data = new Uint8Array(size)
		const perlin = new ImprovedNoise()
		const z = Math.random() * 100;

		let quality = 1;

		for (let j = 0; j < 4; j ++) {
			for (let i = 0; i < size; i ++) {
				const x = i % width, y = ~~(i / width);
				data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);
			}

			quality *= 5;
		}

		return data;
	}

	#generateTexture(data, width, height) {
		let context, image, imageData, shade;

		const vector3 = new THREE.Vector3(0, 0, 0);

		const sunPosition = new THREE.Vector3(1, 1, 1);
		sunPosition.normalize();

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		context = canvas.getContext('2d');
		context.fillRect(0, 0, width, height);

		image = context.getImageData(0, 0, canvas.width, canvas.height);
		imageData = image.data;

		for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++) {
			vector3.x = data[j - 2] - data[j + 2];
			vector3.y = 2;
			vector3.z = data[j - width * 2] - data[j + width * 2];
			vector3.normalize();

			shade = vector3.dot(sunPosition);

			imageData[i] = (96 + shade * 128) * (0.5 + data[ j ] * 0.007);
			imageData[i + 1] = (32 + shade * 96) * (0.5 + data[ j ] * 0.007);
			imageData[i + 2] = (shade * 96) * (0.5 + data[ j ] * 0.007);
		}

		context.putImageData(image, 0, 0);

		// Scaled 4x

		const canvasScaled = document.createElement('canvas');
		canvasScaled.width = width * 4;
		canvasScaled.height = height * 4;

		context = canvasScaled.getContext('2d');
		context.scale(4, 4);
		context.drawImage(canvas, 0, 0);

		image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
		imageData = image.data;

		for (let i = 0, l = imageData.length; i < l; i += 4) {
			const v = ~~(Math.random() * 5);

			imageData[i] += v;
			imageData[i + 1] += v;
			imageData[i + 2] += v;
		}

		context.putImageData(image, 0, 0);

		return canvasScaled;
	}
}

export default World;