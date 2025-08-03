import { conexionAPI } from "./conexionApi.js";

const tarjeta = document.querySelector("[data-producto]");
const botonFormulario = document.querySelector("[data-formulario]");
const botonLimpiar = document.querySelector("[data-limpiarformulario]");

// Creando el contenedor productos
function crearTarjeta(nombre, precio, imagen, id) {
  const productos = document.createElement("div");
  productos.className = "card_container";
  productos.innerHTML = `
    <div class="card">
      <img class="producto__imagen" src="${imagen}" alt="Imagen del producto">
      <div class="card-container--info">
        <p>${nombre}</p>
        <div class="card-container--value">
          <p>${precio} $</p>
          <button class="btn__delete" data-id>
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  // Botón eliminar producto
  const botonEliminar = productos.querySelector(".btn__delete");
  botonEliminar.addEventListener("click", async () => {
    try {
      await conexionAPI.eliminarTarjeta(id);
      productos.remove();
    } catch (error) {
      mostrarMensaje("Error al eliminar el producto", "error-message");
      console.error(error);
    }
  });

  tarjeta.appendChild(productos);
  return productos;
}

// Función para mostrar mensajes
function mostrarMensaje(mensaje, clase) {
  tarjeta.innerHTML = `<p class="${clase}">${mensaje}</p>`;
}

// Crea un contenedor para cada producto de la base de datos
async function listaProductos() {
  try {
    const listaAPI = await conexionAPI.listaProductos();
    if (listaAPI.length === 0) {
      mostrarMensaje("Lista de productos no encontrada", "empty-message");
    } else {
      tarjeta.innerHTML = ""; // Limpia el contenedor antes de agregar los productos
      listaAPI.forEach(producto =>
        tarjeta.appendChild(crearTarjeta(producto.nombre, producto.precio, producto.imagen, producto.id))
      );
    }
  } catch (error) {
    mostrarMensaje("Error al cargar la lista de productos", "error-message");
    console.error('Error al cargar la lista de productos:', error);
  }
}

listaProductos();

// Agrega nuevos productos en la base de datos
async function crearNuevaTarjeta(e) {
  e.preventDefault();
  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;
  const id = Math.floor((Math.random() * 100) + 1).toString();

  console.log('Datos del nuevo producto:', { nombre, precio, imagen, id });

  try {
    await conexionAPI.nuevoProducto(nombre, precio, imagen, id);
    console.log('Producto creado exitosamente');
    tarjeta.innerHTML = ""; // Limpia el contenedor antes de actualizar la lista de productos
    listaProductos(); // Actualiza la lista de productos
  } catch (error) {
    mostrarMensaje("Error al crear el producto", "error-message");
    console.error('Error al crear el producto:', error);
  }
}

// Botón agregar nuevo producto
botonFormulario.addEventListener("submit", (e) => crearNuevaTarjeta(e));

// Botón limpiar formulario
botonLimpiar.addEventListener("click", (e) => {
  e.preventDefault();
  botonFormulario.reset();
  console.log("Formulario limpiado");
});
