import React from 'react';
import { Link } from 'react-router-dom';

const RulesPage = () => {
    return (
      <div style={{ 
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2>Game Rules</h2>
        <div style={{ marginBottom: '20px' }}>
          <p>The objective of Minesweeper is to reveal all the safe squares without triggering a mine.</p>
          <ul>
            <li>Left-click a cell to reveal it.</li>
            <li>Right-click to flag a cell you suspect contains a mine.</li>
            <li>Numbers indicate how many mines are adjacent to that cell.</li>
            <li>The game ends if you click on a mine.</li>
            <li>Reveal all non-mine cells to win!</li>
          </ul>
        </div>
        <Link to="/">
          <button style={{
            padding: '10px 20px',
            fontSize: '16px'
          }}>Back to Home</button>
        </Link>
      </div>
    );
  }
  
  export default RulesPage;