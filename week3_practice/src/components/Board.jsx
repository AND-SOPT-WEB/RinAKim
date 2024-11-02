// src/components/Board.jsx

import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import './Board.css';

const Board = ({ nextNumber, onCorrectClick, onGameComplete }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const initialNumbers = Array.from({ length: 9 }, (_, i) => i + 1); // 1 to 9
    shuffleArray(initialNumbers);
    setNumbers(initialNumbers);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleTileClick = (number) => {
    if (number === nextNumber) {
      if (number === 9) { // 9가 마지막 숫자
        onGameComplete();
      } else {
        onCorrectClick();
      }
    }
  };

  return (
    <div className="board">
      {numbers.map((number) => (
        <Tile
          key={number}
          number={number}
          onClick={() => handleTileClick(number)}
        />
      ))}
    </div>
  );
};

export default Board;
