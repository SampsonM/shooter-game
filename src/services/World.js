import * as THREE from 'three';
import { Sky } from '../helpers/Sky';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class World {
	constructor(renderer) {
		this.scene = new THREE.Scene();
		this.renderer = renderer;
		this.lights = {};
		
		this.#buildWorld();
	}

	static getInstance(renderer) {
		if (!this.instance) {
			console.log('Setting up world...');
			this.instance = new World(renderer);
		}
		
		console.log('World set-up complete!');
		return this.instance
	}

	#buildWorld() {
		this.#addLight();
		this.#setUpCamera();
		this.#setUpBoard();
	}

	#addLight() {
		const sky = new Sky();
		sky.scale.setScalar(450000);
		sky.material.uniforms['turbidity'].value = 10;
		sky.material.uniforms['rayleigh'].value = 3;
		sky.material.uniforms['mieCoefficient'].value = 0.0005;
		sky.material.uniforms['mieDirectionalG'].value = 0.7;
		this.scene.add(sky);

		const sun = new THREE.Vector3();

		const phi = THREE.MathUtils.degToRad( 88 );
		const theta = THREE.MathUtils.degToRad( 180 );

		sun.setFromSphericalCoords( 1, phi, theta );
	}

	#setUpCamera() {
		const fov = 80;
		const aspect = 2;
		const near = 0.1;
		const far = 800;
		
		this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
		this.camera.position.z = 150;
		this.camera.position.y = 50;

		const controls = new OrbitControls(this.camera, this.renderer.domElement);

		controls.addEventListener('change', () => this.renderer.render(this.scene, this.camera));
		controls.enableZoom = false;
		controls.enablePan = false;
	}

	#setUpBoard() {
		const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
		const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.position.x = 40
		sphere.castShadow = true;
		sphere.receiveShadow = true;

		this.scene.add(sphere);

		const planeGeometry = new THREE.PlaneGeometry(80, 80, 1, 1);
		const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
		const plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;
		
		// this.scene.add(plane);
	}
}

export default World;