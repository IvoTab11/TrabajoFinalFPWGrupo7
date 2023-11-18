// Importa React y el hook useState desde 'react'
import React, { useState } from 'react';
// Importa el componente ProductForm desde './ProductForm'
import ProductForm from './ProductForm';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';


// Función del componente llamada 'Comparador'
const Comparador = () => {
  // Define dos estados usando useState: 'productos' y 'productosMasBaratos'
  const [productos, setProductos] = useState([]);
  const [productosMasBaratos, setProductosMasBaratos] = useState([]);
  
  // Función para guardar un producto en el estado 'productos'
  const guardarProducto = (producto) => {
    setProductos([...productos, producto]);
    console.log('Producto guardado:', producto);
  };
 // Función para manejar el clic en el botón "Productos más baratos"
  const handleClickMasBarato = () => {
    // Crea un objeto para agrupar productos por nombre
    const productosPorNombre = {};

    // Itera sobre los productos y guarda el más barato por nombre
    productos.forEach((producto) => {
      const nombreProducto = producto.producto;
    /* está verificando si existe un producto con el nombre nombreProducto
     en el objeto productosPorNombre o si el precio del producto actual 
     (producto.precio) es menor que el precio del producto ya existente con el mismo nombre en productosPorNombre.*/ 
      if (!productosPorNombre[nombreProducto] || producto.precio < productosPorNombre[nombreProducto].precio) {
        productosPorNombre[nombreProducto] = producto;
      }
    });

    // Actualiza el estado con los productos más baratos
    const productosMasBaratosArray = Object.values(productosPorNombre);
    setProductosMasBaratos(productosMasBaratosArray);
    console.log('Productos más baratos:', productosMasBaratosArray);
  };
  // Función para manejar el clic en el botón "Listar Productos"
  const handleClickListar = () => {
    // Actualiza el estado con la lista de productos
    setProductosMasBaratos([...productos]);
    console.log('Listar Productos:', productos);
  };
  // Renderiza el componente
  return (
    <div>
      
      <ProductForm guardarProducto={guardarProducto} />
      <div className="d-grid gap-2 col-6 mx-auto">
        <button type="button" className="btn btn-success" onClick={handleClickListar}>Listar Productos</button>
        <button type="button" className="btn btn-success" onClick={handleClickMasBarato}>Productos más baratos</button>
      </div>

      {/* Mostrar resultados en la interfaz de usuario */}
      {productosMasBaratos.length > 0 && (
        <Container className="text-center mt-4">
        <h2 className="mb-3">Resultados:</h2>
        <ListGroup className="w-50 mx-auto">
          {productosMasBaratos.map((producto, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <span>{producto.producto}</span>
              <span className="badge bg-primary">${producto.precio}</span>
              <span className="badge bg-secondary">{producto.comercio}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      )}
    </div>
  );
};
// Exporta el componente Comparador
export default Comparador;
