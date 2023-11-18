import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Inicio from "./components/Inicio";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppPhaser from "./components/AppPhaser";
import AppReact from "./components/AppReact";



function App(){

return(
    <Router>
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Grupo 777</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ProyectoPhaser">Dude</Nav.Link>
            <Nav.Link href="/ProyectoNotas">Anotador</Nav.Link>
            <Nav.Link href="#home">Naves</Nav.Link>
            <Nav.Link href="#link">What Animal is?</Nav.Link>
            <Nav.Link href="#home">Comparador De Precios</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Routes>
          <Route path="/" element = {< Inicio/>} />
         
          <Route path="ProyectoPhaser" element = {< AppPhaser/>} />
          <Route path="ProyectoNotas" element = {< AppReact/>} />
          
        </Routes>
    </Router>




);



}

export default App;