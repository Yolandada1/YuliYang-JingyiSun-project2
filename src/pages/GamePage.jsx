import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cell from '../components/Cell';
import generateGrid from '../utils/generateGrid';

const DIFFICULTY_CONFIG = {
  easy: { size: 8, mines: 10 },
  medium: { size: 16, mines: 40 },
  hard: { size: 30, mines: 99 }
};

const GamePage = () => {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagsUsed, setFlagsUsed] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const { size, mines } = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.easy;

  
  const initializeGame = () => {
    const newGrid = generateGrid(size, mines);
    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setFlagsUsed(0);
    setTime(0);
    setTimerActive(true);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  const checkWin = (newGrid) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = newGrid[i][j];
        if (!cell.isMine && !cell.revealed) {
          return false;
        }
      }
    }
    return true;
  };

  const revealCell = (row, col, newGrid) => {
    const stack = [[row, col]];
    const visited = new Set();
  
    while (stack.length > 0) {
      const [r, c] = stack.pop();
      const key = `${r}-${c}`;
      if (visited.has(key) || newGrid[r][c].revealed || newGrid[r][c].flagged) continue;
  
      newGrid[r][c].revealed = true;
      visited.add(key);
  
      if (newGrid[r][c].adjacentMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (
              newRow >= 0 &&
              newRow < size &&
              newCol >= 0 &&
              newCol < size
            ) {
              stack.push([newRow, newCol]);
            }
          }
        }
      }
    }
  };

  const handleClick = (row, col) => {
    if (gameOver || gameWon || grid[row][col].flagged) return;

    const newGrid = grid.map(row => [...row]);
    
    if (newGrid[row][col].isMine) {
      newGrid[row][col].revealed = true;
      setGameOver(true);
      setTimerActive(false);
    
      newGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell.isMine) {
            cell.revealed = true;
          }
        });
      });
    } else {
      revealCell(row, col, newGrid);
      if (checkWin(newGrid)) {
        setGameWon(true);
        setTimerActive(false);
      }
    }

    setGrid(newGrid);
  };

  const handleRightClick = (row, col) => {
    if (gameOver || gameWon) return;

    const newGrid = grid.map(row => [...row]);
    const cell = newGrid[row][col];

    if (cell.revealed) return;

    if (cell.flagged) {
      cell.flagged = false;
      setFlagsUsed(flagsUsed - 1);
    } else if (flagsUsed < mines) {
      cell.flagged = true;
      setFlagsUsed(flagsUsed + 1);
    }

    setGrid(newGrid);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      
      <div style={{ 
        width: '100%',
        textAlign: 'center',
        marginBottom: '20px',
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        padding: '10px 0',
        zIndex: 1
      }}>
        
        {(gameOver || gameWon) && (
          <h2 style={{ margin: '10px 0' }}>
            {gameOver ? "Game over! You lost!" : "Game over! You Won!"}
          </h2>
        )}
        
        <h2 style={{ margin: '10px 0' }}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
        </h2>
        
        
        <div style={{ marginBottom: '10px' }}>
          <span>Mines: {mines - flagsUsed} / {mines}</span>
          <span style={{ marginLeft: '20px' }}>Time: {time}s</span>
        </div>
        
        <div>
          <button 
            onClick={initializeGame}
            style={{ marginRight: '10px' }}
          >
            Reset
          </button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>

      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 30px)`,
        gap: '1px',
        backgroundColor: '#ccc',
        border: '1px solid #999'
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isMine={cell.isMine}
              adjacentMines={cell.adjacentMines}
              revealed={cell.revealed}
              flagged={cell.flagged}
              onClick={() => handleClick(rowIndex, colIndex)}
              onRightClick={() => handleRightClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GamePage;