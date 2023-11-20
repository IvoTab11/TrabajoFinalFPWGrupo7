import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Inicio from "./components/Inicio";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppPhaser from "./components/AppPhaser";
import AppReact from "./components/AppReact";
import AppReactComp from "./components/AppReactComp";
import AppReactAnimals from "./components/AppReactAnimals";
import ErrorPage from "./components/ErrorPage";



function App() {

  return (
    <Router>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Inicio</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/ProyectoPhaser">Dude</Nav.Link>
              <Nav.Link href="/ProyectoNotas">Anotador</Nav.Link>
              <Nav.Link href="#home">Naves</Nav.Link>
              <Nav.Link href="/WhatAnimalIs">What Animal is?</Nav.Link>
              <Nav.Link href="/ComparadorPrecios">Comparador De Precios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={< Inicio />} />
        <Route path="WhatAnimalIs" element={< AppReactAnimals />} />
        <Route path="ProyectoPhaser" element={< AppPhaser />} />
        <Route path="ProyectoNotas" element={< AppReact />} />
        <Route path="ComparadorPrecios" element={< AppReactComp />} />
        <Route path="*" element={< ErrorPage />} />


      </Routes>
    </Router>




  );



}

export default App;