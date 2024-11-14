import React from 'react';
import './Cell.css';

const Cell = ({ isMine, adjacentMines, revealed, flagged, onClick, onRightClick }) => {
  const handleClick = () => {
    if (!flagged && !revealed) {
      onClick();
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!revealed) {
      onRightClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleRightClick}
      className={`cell ${revealed ? 'revealed' : ''}`}
    >
      {revealed 
        ? (isMine ? '💣' : adjacentMines > 0 ? adjacentMines : '')
        : flagged 
        ? '🚩' 
        : ''}
    </div>
  );
};

export default Cell;