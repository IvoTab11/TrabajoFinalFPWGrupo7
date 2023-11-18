import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function NotasResueltas({notasResueltas,eliminarNotaResuelta}){
    return (
        <ul style={{justifyContent: 'center', alignItems: 'center'}}>
                {notasResueltas.map((nota, index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{nota.titulo}</Card.Title>
                      <Card.Text>
                            {nota.descripcion}<br></br>
                      </Card.Text>
                      <Button onClick={() => eliminarNotaResuelta(index)} variant="warning">Eliminar Nota</Button>
                    </Card.Body>
                  </Card>
                ))}
            </ul>
    );
}
export default NotasResueltas;