// Importar las dependencias necesarias de React y React Bootstrap
import React, { useState } from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';

// Definir el componente de formulario de productos que recibe la función `guardarProducto` como prop
const ProductForm = ({ guardarProducto }) => {
  // Función que convierte a mayúsculas el texto del input del nombre del producto
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [comercio, setComercio] = useState('');

  // Función que convierte a mayúsculas el texto del input del nombre del producto
  const mayus = (e) => {
    setNombre(e.target.value.toUpperCase());
  };

  // Función que se ejecuta al hacer clic en el botón de guardar
  const handleClickGuardar = () => {
    // Crear un nuevo objeto de producto con la información ingresada
    const nuevoProducto = {
      producto: nombre,
      precio: Number(precio),
      comercio,
    };

    // Llamar a la función guardarProducto pasando el nuevo producto como argumento
    guardarProducto(nuevoProducto);
    //console.log(nuevoProducto);
    

    // Limpiar los campos después de guardar
    setNombre('');
    setPrecio('');
    setComercio('');
  };

  // Renderizar el formulario con etiquetas y componentes de React Bootstrap
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
          <option selected>Abrir menú</option>
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


// Exportar el componente para su uso en otras partes de la aplicación
export default ProductForm;             
