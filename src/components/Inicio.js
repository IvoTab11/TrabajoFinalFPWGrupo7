import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import AppPhaser from "./AppPhaser";
import AppReact from "./AppReact";
import AppReactComp from "./AppReactComp";

import imagenDude from "../img/imagenDude.png";
import imagenAnotador from "../img/imagenAnotador.png";
import imagenComparador from "../img/imagenComparador.png";
function Inicio(){
return(

    <div style={{padding : 20,}}>
        <h2> Home View </h2>
        <p> Hola este es el inicio de Nuestra pagina</p>
    
    {/* <Router> */}
    <CardGroup>
      <Card>
        <Card.Img variant="top" src={imagenDude} height={'500px'} />
        <Card.Body>
          <Card.Title>Juego Dude</Card.Title>
          <Card.Text>
            Proyecto del videojuego "Dude". Recoge todas las estrellas para 
            pasar de nivel y evita las bombas.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Link to="/ProyectoPhaser">
                <Button variant="primary">Ir</Button>
            </Link>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={imagenAnotador} height={'500px'}/>
        <Card.Body>
          <Card.Title>Proyecto Lista de Tareas</Card.Title>
          <Card.Text>
            Anota tus tareas y ordenalas según necesites en "En Proceso" y "Resueltas".
          </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Link to="/ProyectoNotas">
                <Button variant="primary">Ir</Button>
            </Link>
            
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={imagenComparador} height={'500px'}/>
        <Card.Body>
          <Card.Title>Proyecto Comparador de Precios</Card.Title>
          <Card.Text>
            Compara los precios de los productos que necesites comprar en los
            supermercados más conocidos.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Link to="/ComparadorPrecios">
            <   Button variant="primary">Ir</Button>
            </Link>
            
        </Card.Footer>
      </Card>
    </CardGroup>

        <Routes>
          {/* <Route path="/" element = {< Inicio/>} /> */}
         
          <Route path="ProyectoPhaser" element = {< AppPhaser/>} />
          <Route path="ProyectoNotas" element = {< AppReact/>} />
          <Route path="ComparadorPrecios" element = {< AppReactComp/>} />
        </Routes>
    {/* </Router> */}
       
    </div>




);



}


export default Inicio;