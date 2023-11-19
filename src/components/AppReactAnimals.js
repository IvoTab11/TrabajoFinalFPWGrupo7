// Importa React y el hook useState desde la biblioteca de React.
import React, { useState } from 'react';
// Importa los componentes GameAnimals, Congratulations y Button.
import GameAnimals from './reactComponentAnimals/GameAnimals'
import Congratulations from './reactComponentAnimals/Congratulations'
import Button from 'react-bootstrap/Button';

// Definición del componente principal AppReactAnimals.
function AppReactAnimals() {
    // Estados del componente utilizando el hook useState.
    const [playerName1, setPlayerName1] = useState(''); // Nombre del jugador 1
    const [playerName2, setPlayerName2] = useState(''); // Nombre del jugador 2
    const [showCongratulations, setShowCongratulations] = useState(false); // Estado para mostrar el componente Congratulations
    const [playerScore1, setPlayerScore1] = useState(0); // Puntaje del jugador 1
    const [playerScore2, setPlayerScore2] = useState(0); // Puntaje del jugador 2
    const [totalRounds, setTotalRounds] = useState(Math.floor(Math.random() * 6) + 5); // Numero total de rondas
    const [currentPlayer, setCurrentPlayer] = useState(1); // Jugador actual
    const [showGame, setShowGame] = useState(false); // Estado para mostrar el juego
    const [currentRound, setCurrentRound] = useState(1); // Ronda actual

    // Funcion que se ejecuta al hacer clic en el botón "Play".
    const clickPlay = () => {
        setShowGame(true);
    };

    // Funcion que se ejecuta al finalizar el juego.
    const byTheEnd = (puntaje) => {
        if (currentPlayer === 1) {
            setPlayerScore1(puntaje);
        } else {
            setPlayerScore2(puntaje);
        }
        setShowCongratulations(true);
    };

    // Renderizado del componente.
    return (
        <div>
            {/* Condicional para mostrar el componente GameAnimals o el formulario de nombres y boton "Play". */}
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
                <div style={{ textAlign: 'center', backgroundColor: '#87CEEB', padding: '180px' }}>
                    <h1 style={{ fontSize: '60px', color: 'white' }}>Can you guess the animal?</h1>
                    {/* Formulario para que los jugadores ingresen sus nombres. */}
                    <p style={{ fontSize: '42px', color: 'white' }}>Player 1, enter your name please</p>
                    <input
                        type="text"
                        style={{ fontSize: '40px' }}
                        placeholder="Put your name here!! :D"
                        onChange={(e) => setPlayerName1(e.target.value)}
                    />
                    <p style={{ fontSize: '42px', color: 'white' }}>Player 2, enter your name to start</p>
                    <input
                        type="text"
                        style={{ fontSize: '40px' }}
                        placeholder="Put your name here too!! "
                        onChange={(e) => setPlayerName2(e.target.value)}
                    />
                    {/* Boton para iniciar el juego. */}
                    <Button variant="primary" onClick={clickPlay}>
                        Play
                    </Button>
                </div>
            )}

            {/* Condicional para mostrar el componente Congratulations y el mensaje final del juego. */}
            {showCongratulations && (
                <div>
                    <div>
                        {/* Muestra el componente Congratulations para ambos jugadores. */}
                        <Congratulations playerName={playerName1} score={playerScore1} />
                        <Congratulations playerName={playerName2} score={playerScore2} />
                    </div>
                    <div style={{ fontSize: '70PX', color: 'black', backgroundColor: '#87CEEB', padding: '20px', textAlign: 'center' }}>
                        {playerScore1 === playerScore2 ? <p>We have a tie!! </p> : playerScore1 > playerScore2 ? <p>Our winner is {playerName1}</p> : <p>Our winner is {playerName2}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

// Exporta el componente principal AppReactAnimals.
export default AppReactAnimals;