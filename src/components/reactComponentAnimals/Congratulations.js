import React from 'react';

function Congratulations({ playerName, score }) {
    return (
        <div>
            <h1>Congratulations, {playerName}! Good job!!</h1>
            <p>Your total score: {score}</p>
        </div>
    );
}

export default Congratulations;
