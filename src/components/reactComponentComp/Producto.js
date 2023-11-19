// Define una función llamada `Producto` que recibe las propiedades `producto`, `precio`, y `comercio`
const Producto = ({ producto, precio, comercio }) => {
  return (
    // JSX aquí para representar la estructura visual del componente
    <div>
      {/* Renderizar el nombre del producto */}
      <p>Producto: {producto}</p>
      {/* Renderizar el precio del producto */}
      <p>Precio: {precio}</p>
      {/* Renderizar el nombre del comercio */}
      <p>Comercio: {comercio}</p>
    </div>
  );
};

// Exportar el componente `Producto` para que pueda ser utilizado en otros archivos de código
export default Producto;
