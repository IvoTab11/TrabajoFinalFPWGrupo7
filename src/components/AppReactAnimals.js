import React, { useState } from 'react';
import GameAnimals from './reactComponentAnimals/GameAnimals'
import Congratulations from './reactComponentAnimals/Congratulations'
import Button from 'react-bootstrap/Button';

function AppReactAnimals() {
    const [playerName1, setPlayerName1] = useState('');
    const [playerName2, setPlayerName2] = useState('');
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [playerScore1, setPlayerScore1] = useState(0);
    const [playerScore2, setPlayerScore2] = useState(0);
    const [totalRounds, setTotalRounds] = useState(Math.floor(Math.random() * 6) + 5);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [showGame, setShowGame] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);
   
    const clickPlay = () => {
        setShowGame(true);
    };
    

    const byTheEnd = (puntaje) => {
        if (currentPlayer === 1) {
            setPlayerScore1(puntaje);
        } else {
            setPlayerScore2(puntaje);
        }
        setShowCongratulations(true);
    };

    return (
        

        <div>
            {showGame ? (
                <GameAnimals
                    currentPlayer={currentPlayer}
                    setCurrentPlayer={setCurrentPlayer}
                    currentRound={currentRound}
                    setCurrentRound={setCurrentRound}
                    score={currentPlayer === 1 ? playerScore1 : playerScore2}
                    setScore={currentPlayer === 1 ? setPlayerScore1 : setPlayerScore2}
                    playerName={currentPlayer === 1 ? playerName1 : playerName2}
                    totalRounds={totalRounds}
                    byTheEnd={byTheEnd}
              
                />
            ) : (
                <div >
                    
                    <h1>Player 1, enter your name please</h1>
                    <input
                        type="text"
                        placeholder="Put your name here!! :D"
                        onChange={(e) => setPlayerName1(e.target.value)}
                    />
                    <h1>Player 2, enter your name to start</h1>
                    <input
                        type="text"
                        placeholder="Put your name here too!! "
                        onChange={(e) => setPlayerName2(e.target.value)}
                    />
                    <Button variant="primary" onClick={clickPlay}>
                        Play
                    </Button>
                </div>
            )}
            {showCongratulations && (
                <div >
                    <div >
                    <Congratulations playerName={playerName1} score={playerScore1}  />
                    <Congratulations playerName={playerName2} score={playerScore2}  />
                    </div>
                    <div >
                    {playerScore1 === playerScore2 ? <p>We have a tie!! </p>: playerScore1 > playerScore2 ? <p>Our winner is {playerName1}</p> : <p>Our winner is {playerName2}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AppReactAnimals;
