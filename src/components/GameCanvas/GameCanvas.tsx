import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import CanvasService from '../../services/CanvasService';

const scene = new THREE.Scene();

const GameCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const canvasServiceRef = useRef<CanvasService | null>(null)

	const mouseMove = (event: MouseEvent) => {
		if (canvasServiceRef.current) {
			canvasServiceRef.current.mouseMove(event)
		}
	}

	const handleResize = (event: UIEvent) => {
		if (canvasServiceRef.current) {
			canvasServiceRef.current.handleResize(event, window.innerWidth, window.innerHeight)
		}
	}

	useEffect(() => {
		const canvas = canvasRef.current;

		if (canvas) {
			canvasServiceRef.current = new CanvasService(canvas)

			if (canvasRef.current) {
				canvasRef.current.addEventListener('mousemove', mouseMove);
				canvasRef.current.addEventListener('resize', handleResize);
			}
		}
	}, [])

	return (
		<canvas ref={canvasRef} id="game-canvas" className="game-canvas"></canvas>
	);
}

export default GameCanvas;
