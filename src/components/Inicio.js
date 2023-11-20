import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppPhaser from "./AppPhaser";
import AppReact from "./AppReact";
import AppReactComp from "./AppReactComp";

import integrantes from "../data/integrantes.json";
import proyectos from "../data/proyectos.json";
function Inicio() {
  return (

    <div style={{ padding: 20, }}>
      <center>
        <h2 className="display-4 text-center mb-4"> TRABAJO FINAL  </h2>
        <p> PROYECTOS</p>
      </center>
      <Row className="justify-content-center">
        {proyectos.map((proyecto, index) => (
          <Card key={proyecto.id} style={{ width: '30rem' }} className="text-center">
            <Card.Img variant="top" src={proyecto.img} width={'900px'} height={'450px'} />
            <Card.Body>
              <Card.Title>{proyecto.titulo}</Card.Title>
              <Card.Text>
                {proyecto.descripcion}
              </Card.Text>
              <Link to={proyecto.link}>
                <Button variant="primary">Ir</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Row>

      <Routes>
        <Route path="ProyectoPhaser" element={< AppPhaser />} />
        <Route path="ProyectoNotas" element={< AppReact />} />
        <Route path="ComparadorPrecios" element={< AppReactComp />} />
      </Routes>

      <footer>
        <center><h2 className="display-4 text-center mb-4">About Us</h2></center>
        <Row className="justify-content-center">
          {integrantes.map((integrante, index) => (
            <Col key={index} className="text-center">
              <Card>
                <Card.Img variant="top" src={integrante.img} width={'300px'} height={'320px'} className="rounded-circle" />
                <Card.Body>
                  <Card.Title>
                    {integrante.apellido} {integrante.nombre}
                  </Card.Title>
                  <Card.Text>
                    LU: {integrante.lu}<br />
                    DNI: {integrante.dni}<br />
                    Pasatiempos: {integrante.pasatiempo}<br />
                    Link a <a href={integrante.gitHub} target="_blank">GitHub</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </footer>
    </div>
  );
}
export default Inicio;