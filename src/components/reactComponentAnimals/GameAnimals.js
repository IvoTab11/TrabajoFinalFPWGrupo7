import React, { useState, useEffect } from 'react';
import animales7 from './animals.json'; // Importa datos sobre animales desde el archivo animals.json
import Button from 'react-bootstrap/Button'; // Importa el componente de botón de React Bootstrap
import './GameAnimals.css';
// Define el componente funcional GameAnimals que recibe varias propiedades
function GameAnimals({ currentPlayer, setCurrentPlayer, currentRound, setCurrentRound, score, setScore, playerName, totalRounds, byTheEnd }) {
    // Estados del componente utilizando el hook useState
    const [roundArrangement, setRoundArrangement] = useState(1); // Numero de ronda actual
    const [animalTarget, setAnimalTarget] = useState(''); // Animal objetivo para adivinar
    const [options, setOptions] = useState([]); // Opciones para elegir como respuesta
    const [itsCorrect, setItsCorrect] = useState(null); // Estado que indica si la respuesta es correcta
    const [canClick, setCanClick] = useState(true); // Estado que controla si se puede hacer clic en las opciones
    const [player1UseWildcard, setPlayer1UseWildcard] = useState(true); // Estado que controla el uso de un comodin para el jugador 1
    const [player2UseWildcard, setPlayer2UseWildcard] = useState(true); // Estado que controla el uso de un comodin para el jugador 2

    // Funcion que verifica la respuesta seleccionada por el jugador
    const checkAnswer = (selectedAnimal) => {
        if (selectedAnimal === animalTarget) {
            setItsCorrect(true);
            setScore(score + 1);
        } else { 
            setItsCorrect(false);
        }
        setCanClick(false);
    };

    // Funcion que permite el uso de un comodín y actualiza las opciones
    const useWildcard = () => {
        if (currentPlayer === 1 && player1UseWildcard) {
            setPlayer1UseWildcard(false);
        } else if (currentPlayer === 2 && player2UseWildcard) {
            setPlayer2UseWildcard(false);
        }
        const wrongButtonIndex = options.findIndex(animal => animal !== animalTarget);
        const newOptions = [...options];
        newOptions.splice(wrongButtonIndex, 1);
        setOptions(newOptions);
    };

    // Funcion que obtiene opciones aleatorias para el juego
    const getRandomOptions = () => {
        const correctAnimal = getRandomAnimals();
        let randomOptions = [correctAnimal];

        while (randomOptions.length < 3) {
            const option = getRandomAnimals();
            if (!randomOptions.includes(option)) {
                randomOptions.push(option);
            }
        }

        randomOptions = randomOptions.sort(() => Math.random() - 0.5);
        setOptions(randomOptions);
        setAnimalTarget(correctAnimal);
    };

    // Funcion que obtiene un animal aleatorio de la lista
    const getRandomAnimals = () => {
        const animals = animales7.animalsJson;
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    };

    // Funcion que actualiza la ronda actual si el jugador es el primero
    const useOfIf = () => {
        if (currentPlayer === 1) {
            setCurrentRound(currentRound + 1);
        }
    };

    // Funcion que avanza a la siguiente ronda o finaliza el juego
    const nextRound = () => {
        if (currentRound <= totalRounds) {
            if (currentPlayer === 2) {
                setRoundArrangement(roundArrangement + 1);
            }
            setItsCorrect(null);
            setCanClick(true);
            getRandomOptions();
            useOfIf();
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        } else {
            byTheEnd(score);
        }
    };

    // Estado que deshabilita las opciones cuando se ha respondido
    const disableOptions = itsCorrect !== null;

    // Efecto secundario que se ejecuta al montar el componente para obtener opciones aleatorias
    useEffect(() => {
        getRandomOptions();
    }, []);

    // Renderizado del componente
   
    return (
        <div className="game-container">
            <div>
                <h1>{playerName}, What animal is this? {"( ͡ಠ ʖ̯ ͡ಠ)"}</h1>
                <p>Round Number: {roundArrangement}</p>
                <div className="image-container">
                    <img src={`/img/GameAnimals/${animalTarget}.jpg`} alt={animalTarget} />
                </div>
                <div className="options-container">
                    {options.map((animal) => (
                        <Button
                            variant="warning"
                            key={animal}
                            onClick={() => checkAnswer(animal)}
                            disabled={!canClick || disableOptions}
                        >
                            {animal}
                        </Button>
                    ))}
                </div>
                <div className="message">
                    {itsCorrect === true && <p>That's right, well done!{"( ͡° ͜ʖ ͡°)"}</p>}
                    {itsCorrect === false && <p>Your answer is wrong! ಠ益ಠ </p>}
                </div>
                <Button variant="info" onClick={nextRound} disabled={canClick || !disableOptions}>Next Round? {"(⚆_⚆) ->"}</Button>
                <br />
                {(currentPlayer === 1 || currentPlayer === 2) && (player1UseWildcard || player2UseWildcard) &&
                    <Button
                        className="wildcard-button"
                        variant="success"
                        onClick={useWildcard}
                    >
                        Comodin ಠ.ಠ {"(single use)"}
                    </Button>
                }
            </div>
        </div>
    );

}

export default GameAnimals;