import React from 'react';
import './Game.css';
import { GameCanvas } from './components/GameCanvas';

const game = () => {
  return (
    <div className="game">
      <GameCanvas />
    </div>
  );
}

export default game;
