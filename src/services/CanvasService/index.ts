import * as THREE from 'three';

export default class CanvasService {
	private scene: THREE.Scene;
	private renderer: THREE.Renderer;

	constructor(canvasRef: HTMLCanvasElement) {
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasRef,
			antialias: false,
		});
	}

	mouseMove(event: MouseEvent) { }

	handleResize(event: UIEvent, height: number, width: number) { }
}