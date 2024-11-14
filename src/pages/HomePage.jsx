import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1>Minesweeper Game</h1>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '20px'
        }}>
          <Link to="/rules">
            <button style={{
              padding: '10px 20px',
              fontSize: '16px',
              width: '200px'
            }}>View Rules</button>
          </Link>
          <Link to="/game/easy">
            <button style={{
              padding: '10px 20px',
              fontSize: '16px',
              width: '200px',
              backgroundColor: '#90EE90'
            }}>Play Easy</button>
          </Link>
          <Link to="/game/medium">
            <button style={{
              padding: '10px 20px',
              fontSize: '16px',
              width: '200px',
              backgroundColor: '#FFD700'
            }}>Play Medium</button>
          </Link>
          <Link to="/game/hard">
            <button style={{
              padding: '10px 20px',
              fontSize: '16px',
              width: '200px',
              backgroundColor: '#FFA07A'
            }}>Play Hard</button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default HomePage;