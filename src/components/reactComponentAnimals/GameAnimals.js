import React, { useState, useEffect } from 'react';
import animales7 from './animals.json'
import Button from 'react-bootstrap/Button';


function GameAnimals({ currentPlayer, setCurrentPlayer, currentRound, setCurrentRound, score, setScore, playerName, totalRounds, byTheEnd }) {
    const [roundArrangement, setRoundArrangement] = useState(1); 
    const [animalTarget, setAnimalTarget] = useState(''); 
    const [options, setOptions] = useState([]); 
    const [itsCorrect, setItsCorrect] = useState(null); 
    const [canClick, setCanClick] = useState(true); 
    const [player1UseWildcard, setPlayer1UseWildcard] = useState(true); 
    const [player2UseWildcard, setPlayer2UseWildcard] = useState(true); 


    const checkAnswer = (selectedAnimal) => {
        if (selectedAnimal === animalTarget) {
            setItsCorrect(true);
            setScore(score + 1);
        } else {
            setItsCorrect(false);
        }
        setCanClick(false);
    };

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

    }
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

    const getRandomAnimals = () => {
        const animals = animales7.animalsJson;
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    };



    const useOfIf = () => {
        if (currentPlayer === 1) {
            setCurrentRound(currentRound + 1);
        }
    }

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
    }

    const disableOptions = itsCorrect !== null;

    useEffect(() => {
        getRandomOptions();
    }, []);

    return (
        <div >
            <div >
                <h1 >{playerName}, What animal is this? {"( ͡ಠ ʖ̯ ͡ಠ)"}</h1>
                <p >Round Number: {roundArrangement}</p>
                <img src={`/img/GameAnimals/${animalTarget}.jpg`} alt={animalTarget} />
                <div>
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
                {itsCorrect === true && <p>That's right, well done!{"( ͡° ͜ʖ ͡°)"}</p>}
                {itsCorrect === false && <p>Your answer is wrong! ಠ益ಠ </p>}
                <Button variant="info" onClick={nextRound} disabled={canClick || !disableOptions}>Next Round? {"(⚆_⚆) ->"}</Button>
                <br></br>
                {currentPlayer === 1 && player1UseWildcard ? <Button variant="success" onClick={useWildcard} >Comodin ಠ.ಠ {"(single use)"}</Button> : null}
                {currentPlayer === 2 && player2UseWildcard ? <Button variant="success" onClick={useWildcard} >Comodin ಠ.ಠ {"(single use)"}</Button> : null}
            </div>
        </div>
    );
}

export default GameAnimals;
