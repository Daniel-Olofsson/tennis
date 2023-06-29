import React, { useState, useEffect } from 'react';
import "./App.css";
const App = () => {
  // State variables
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [setScore, setSetScore] = useState([0, 0]);

  const tennisPoints = ['Love', 'Fifteen', 'Thirty', 'Forty', 'Game'];
  // Handle adding score for players
  const handleScore = (player) => {
    if (gameOver) return;

    if (player === 'player1') {
      setPlayer1Score(player1Score + 1);
    } else if (player === 'player2') {
      setPlayer2Score(player2Score + 1);
    }
  };
  // Check if there is a winner and update set score
  const checkWinner = () => {
    if (
      (player1Score >= 4 && player1Score >= player2Score + 2) ||
      (player2Score >= 4 && player2Score >= player1Score + 2)
    ) {
      setGameOver(true);
      setWinner(player1Score > player2Score ? 'Player 1' : 'Player 2');
      updateSetScore();
    }
  };
// Update set score based on the current game result
  const updateSetScore = () => {
    const newSetScore = [...setScore];
    if (player1Score > player2Score) {
      newSetScore[0]++;
    } else {
      newSetScore[1]++;
    }
    setSetScore(newSetScore);
  };
// Start a new set by resetting scores and game over state
  const startNewSet = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
    setWinner(null);
  };

  useEffect(() => {
    checkWinner();
  }, [player1Score, player2Score]);
// Get the current point score based on the game rules
  const getCurrentPointScore = () => {
    if (player1Score >= 3 && player2Score >= 3) {
      if (player1Score === player2Score) {
        return 'Deuce';
      } else if (player1Score === player2Score + 1) {
        return 'Advantage Player 1';
      } else if (player1Score + 1 === player2Score) {
        return 'Advantage Player 2';
      }
    } else {
      return `${tennisPoints[player1Score]} - ${tennisPoints[player2Score]}`;
    }
  };

  return (
    <div>
      <h3>Tennis Simulator</h3>
      <div className='tennis-court'>
        
        <div className="net"></div>
        <div className='player player-one'>
          <h2 className='player-one'>Player 1</h2>
          <p>{getCurrentPointScore()}</p>
          
        </div>
        <div className='player player-two'>
          <h2 className='player-two'>Player 2</h2>
          <p>{getCurrentPointScore()}</p>
          
        </div>
      </div>
      <div className='player-buttons'>
      {!gameOver && (
        <>
          <button onClick={() => handleScore('player1')}>Add Point (Player 1)</button>
          <button onClick={() => handleScore('player2')}>Add Point (Player 2)</button>
        </>
      )}
    </div>
      {gameOver && <h3 className='centertext'>Set Over! {winner} wins!</h3>}
      <div>
      <h2 className='centertext'>Set Score</h2>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player One</td>
            <td>{setScore[0]}</td>
          </tr>
          <tr>
            <td>Player Two</td>
            <td>{setScore[1]}</td>
          </tr>
        </tbody>
      </table>
      <button className='center-button' onClick={startNewSet}>Start New Set</button>
    </div>

    </div>
  );
};

export default App;
