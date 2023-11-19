import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProcesadorNotas from './ProcesadorNotas';
import NotasResueltas from './NotasResueltas';
import Notas from './Notas';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#BB8FCE ',
  color: 'white',
};

const inputStyle = {
  fontSize: '24px',
  padding: '10px',
  width: '80%',
  margin: '10px',
  textAlign: 'center',
};

function Anotador() {
  // Declaración del objeto nota.
  const notaInicial = {
    id: 1,
    titulo: "",
    descripcion: "",
    estado: true
  };
  const [nota, setNota] = useState(notaInicial);
  const [notas, setNotas] = useState([]);
  const [notasEnProceso, setNotasEnProceso] = useState([]);
  const [notasResueltas, setNotasResueltas] = useState([]);

  //Función que guarda las notas.
  const guardarNotas = () => {
    if (nota.titulo.trim() !== "" && nota.descripcion.trim() !== "") {
      console.log("ID:", nota.id);
      console.log("Titulo:", nota.titulo);
      console.log("Descripción:", nota.descripcion);
      console.log("Estado:", nota.estado);

      setNotas([...notas, nota]);
      setNota({
        id: nota.id + 1,
        titulo: "",
        descripcion: "",
        estado: true
      });

      document.getElementById("tituloNota").focus();
      document.getElementById("valorNota");

    }
  }

  //Función que elimina las notas del array "notas".
  const eliminarNota = (index) => {
    const nuevasNotas = [...notas];
    nuevasNotas.splice(index, 1);
    setNotas(nuevasNotas);
  }

  //Función que elimina las notas del array "notasEnProceso".
  const eliminarNotaProceso = (index) => {
    const eliminarProceso = [...notasEnProceso];
    eliminarProceso.splice(index, 1);
    setNotasEnProceso(eliminarProceso);
  }

  //Función que elimina las notas del array "notasResueltas".
  const eliminarNotaResuelta = (index) => {
    const eliminarResuelta = [...notasResueltas];
    eliminarResuelta.splice(index, 1);
    setNotasResueltas(eliminarResuelta);
  }

  //Función que guarda las notas del array "notas" en el array "notasEnProceso" y las elimina de "notas".
  const procesarNota = (index) => {
    const otraNota = notas[index];
    setNotasEnProceso([...notasEnProceso, otraNota]);

    const sacarNota = [...notas];
    sacarNota.splice(index, 1);
    setNotas(sacarNota);
  }

  /*Función que guarda las notas del array "notasEnProceso" en el array "notasResueltas" y 
  las elimina de "notasEnProceso".*/
  const resolverNota = (index) => {
    const otherNota = notasEnProceso[index];
    setNotasResueltas([...notasResueltas, otherNota]);

    const resueltaNota = [...notasEnProceso];
    resueltaNota.splice(index, 1);
    setNotasEnProceso(resueltaNota);

  }

  return (
    <div style={containerStyle}>
      <h1>Notas</h1>
      {/* Permite ingresar el título de la nota */}
      <input
        placeholder='Escriba el título de su nota'
        type="text"
        id="tituloNota"
        value={nota.titulo}
        onChange={(e) => setNota({ ...nota, titulo: e.target.value })}
        style={inputStyle}
      />
      {/* Permite ingresar la descripción de la nota */}
      <input
        placeholder='Escriba la descripción de su nota'
        type="text"
        id="valorNota"
        value={nota.descripcion}
        onChange={(e) => setNota({ ...nota, descripcion: e.target.value })}
        style={inputStyle}
      />
      <Button onClick={guardarNotas} variant="primary">Anotar</Button>

      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Row>
          {/* Contenedor de las notas guardadas */}
          <Col style={{ backgroundColor: '#58D68D', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ color: 'black' }}>Notas cargadas</h2>
            <Notas
              notas={notas}
              eliminarNota={eliminarNota}
              procesarNota={procesarNota}
            />
          </Col>
          {/* Contenedor de las notas que estan en proceso */}
          <Col style={{ backgroundColor: '#F0B27A', textAlign: 'center' }}>
            <h2 style={{ color: 'black' }}>Notas en proceso</h2>
            <ProcesadorNotas
              notasEnProceso={notasEnProceso}
              eliminarNotaProceso={eliminarNotaProceso}
              resolverNota={resolverNota}
            />
          </Col>
          {/* Contenedor de las notas resueltas */}
          <Col style={{ backgroundColor: '#5DADE2', textAlign: 'center' }}>
            <h2 style={{ color: 'black' }}>Notas resueltas</h2>
            <NotasResueltas
              notasResueltas={notasResueltas}
              eliminarNotaResuelta={eliminarNotaResuelta}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Anotador;