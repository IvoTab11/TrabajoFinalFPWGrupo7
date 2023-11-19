import React from 'react';

function ErrorPage() {
    const errorPageStyle = {
        backgroundColor: 'black',
        color: 'red',
        fontSize: '60px', // Tamaño de letra grande
        textAlign: 'center', // Alinear al centro del componente
        padding: '500px' // Espaciado interno
    };

    return (
        <div style={errorPageStyle}>
            <p>Error en la página</p>
        </div>
    );
}

export default ErrorPage;