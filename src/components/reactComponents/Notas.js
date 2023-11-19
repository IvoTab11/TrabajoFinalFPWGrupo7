import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Muestra las notas guardadas en el array "notas".
function Notas({ notas, eliminarNota, procesarNota }) {

  return (
    <ul style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* Recorre el array "notas" y muestra cada elemento en un Card. */}
      {notas.map((nota, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{nota.titulo}</Card.Title>
            <Card.Text>
              {nota.descripcion}<br></br>
            </Card.Text>
            <Button onClick={() => eliminarNota(index)} variant="warning">Eliminar Nota</Button>
            <Button onClick={() => procesarNota(index)}>En Proceso</Button>
          </Card.Body>
        </Card>
      ))}
    </ul>
  );
}
export default Notas;