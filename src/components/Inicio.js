import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import AppPhaser from "./AppPhaser";
import AppReact from "./AppReact";
import AppReactComp from "./AppReactComp";

import integrantes from "../data/integrantes.json";
import proyectos from "../data/proyectos.json";
function Inicio(){
return(

    <div style={{padding : 20,}}>
        <h2> Home View </h2>
        <p> Hola este es el inicio de Nuestra pagina</p>
    
    {/* <Router> */}
    {/* <CardGroup> */}
    <Row>
    {proyectos.map((proyecto,index)=>(
      <Card key={proyecto.id} style={{ width: '30rem' }}>
      <Card.Img variant="top" src={proyecto.img} width={'1000px'} height={'500px'}/>
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
          <Route path="ProyectoPhaser" element = {< AppPhaser/>} />
          <Route path="ProyectoNotas" element = {< AppReact/>} />
          <Route path="ComparadorPrecios" element = {< AppReactComp/>} />
        </Routes>
      
       <footer style={{backgroundColor: '#73C6B6'}}>
        <h2>About Us</h2>
        <Row>
        {integrantes.map((integrante,index) => (
          
          <Col key={index}>
          <Card>
            <Card.Img variant="top" src={integrante.img} width={'500px'} height={'400px'} />
            <Card.Body>
              <Card.Title>
                {integrante.apellido} {integrante.nombre}
                </Card.Title>
              <Card.Text>
               LU: {integrante.lu}<br />
               DNI: {integrante.dni}<br />
               Pasatiempos: {integrante.pasatiempo}<br />
               Link a <a href={integrante.gitHub}>GitHub</a>
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