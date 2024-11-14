const generateGrid = (size, mines) => {
  // Create empty grid
  const grid = Array(size).fill().map(() => 
    Array(size).fill().map(() => ({
      isMine: false,
      adjacentMines: 0,
      revealed: false,
      flagged: false
    }))
  );

  // Place mines
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    if (!grid[row][col].isMine) {
      grid[row][col].isMine = true;
      minesPlaced++;

      // Update adjacent mine counts
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < size &&
            newCol >= 0 &&
            newCol < size &&
            !grid[newRow][newCol].isMine
          ) {
            grid[newRow][newCol].adjacentMines++;
          }
        }
      }
    }
  }

  return grid;
};

export default generateGrid;