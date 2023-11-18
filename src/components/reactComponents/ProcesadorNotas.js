import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProcesadorNotas({notasEnProceso,eliminarNotaProceso,resolverNota}){
    return (
        <ul style={{justifyContent: 'center', alignItems: 'center'}}>
                {notasEnProceso.map((nota, index) => (
                    <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{nota.titulo}</Card.Title>
                      <Card.Text>
                            {nota.descripcion}<br></br>
                      </Card.Text>
                      <Button onClick={() => eliminarNotaProceso(index)} variant="warning">Eliminar Nota</Button>
                      <Button onClick={()=> resolverNota(index)}>Resuelto</Button>
                    </Card.Body>
                  </Card>
                ))}
            </ul>
    );
}

export default ProcesadorNotas;