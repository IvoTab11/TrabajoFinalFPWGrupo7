
import React, { useState } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';


const ProductForm = ({ guardarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [comercio, setComercio] = useState('');

  const mayus = (e) => {
    setNombre(e.target.value.toUpperCase());
  };

  const handleClickGuardar = () => {
    const nuevoProducto = {
      producto: nombre,
      precio: Number(precio),
      comercio,
    };

    guardarProducto(nuevoProducto);
    //console.log(nuevoProducto);
    

    // Limpiar los campos después de guardar
    setNombre('');
    setPrecio('');
    setComercio('');
  };

  return (
<Container className="text-center">
      <h1 className="display-4 text-center mb-4">Comparador de Precios</h1>

      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Nombre del producto">
            <Form.Control type="text" placeholder="Nombre del producto" value={nombre} onChange={mayus}/>
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Precio del producto">
            <Form.Control type="number" placeholder="Precio del producto" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel controlId="floatingSelectGrid" label="Comercio">
        <Form.Select id="floatingSelectGrid" value={comercio} onChange={(e) => setComercio(e.target.value)}>
          <option value="Vea">Vea</option>
          <option value="Comodín">Comodín</option>
          <option value="Carrefour">Carrefour</option>
          <option value="Coto">Coto</option>
          <option value="Norte">Norte</option>
          <option value="Dia">Dia</option>
          <option value="Yaguar">Yaguar</option>
          <option value="Chango Mas">Chango Mas</option>
          <option value="Nico">Nico</option>
        </Form.Select>
      </FloatingLabel>
     
      <Button className="btn btn-primary" onClick={handleClickGuardar}>Guardar Producto</Button>
    </Container>
  
  );
};

export default ProductForm;             
