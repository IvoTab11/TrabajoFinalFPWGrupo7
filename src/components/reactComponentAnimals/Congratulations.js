// Define el componente funcional Congratulations que acepta propiedades playerName y score
function Congratulations({ playerName, score }) {

    // Renderiza el contenido del componente con los estilos aplicados
    return (
        <div style={{backgroundColor: '#87CEEB', textAlign: 'center',padding: '20px' }}>
            {/* Título que felicita al jugador con estilos específicos */}
            <h1 style={{color: 'white', fontSize: '40px' }}>Congratulations, {playerName}! Good job!!</h1>
            {/* Párrafo que muestra el puntaje total del jugador con estilos específicos */}
            <p style={{color: 'yellow',fontSize: '40px'}}>Your total score: {score}</p>
        </div>
    );
}

// Exporta el componente para que pueda ser utilizado en otros archivos
export default Congratulations;