import Game from './services/Game.js';
import './style.css';

function startGame() {
	console.log('Game initializing...');
	new Game()
	console.log('Game set-up complete!')
}

startGame()
