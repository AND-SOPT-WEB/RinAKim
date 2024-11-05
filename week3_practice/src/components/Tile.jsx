import React from 'react';
import './Tile.css';

const Tile = ({ number, onClick }) => {
  return (
    <div className="tile" onClick={onClick}>
      {number}
    </div>
  );
};

export default Tile;
