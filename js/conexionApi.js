
export const  verificarconexiondelaapi = async () => {

  try {
    const response = await fetch('https://alura-geek-fake-api-oi9y.onrender.com/');
    if (!response.ok) {
      throw new Error(`Error en la conexión: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Conexión exitosa:", data);
    return true;
  } catch (error) {
    console.error("Error en la conexión:", error);
    alert("Error en la conexión: " + error.message);
    return false;
  }


}





// Función para obtener la lista de productos
async function listaProductos() {
  try {
    const response = await fetch('https://alura-geek-fake-api-oi9y.onrender.com/products');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Error en la conexión: " + error.message);

  }
}

// Función para crear un nuevo producto
async function nuevoProducto(nombre, precio, imagen) {
  try {
    const response = await fetch("https://alura-geek-fake-api-oi9y.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, precio, imagen})
    });

    if (!response.ok) {
      throw new Error(`Error al crear el producto: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Producto creado:", data);
    mostrarPopupExito();
    return data;
  } catch (error) {
    alert("Error al crear el producto problema con la conexion con el servidor: " + error.message);

  }



}
function mostrarPopupExito() {
  const popup = document.getElementById("popup-exito");
  popup.classList.add("mostrar");

  setTimeout(() => {
    popup.classList.remove("mostrar");
  }, 3000); // Oculta luego de 3 segundos
}

// Función para eliminar un producto
async function eliminarTarjeta(id) {
  try {
    const response = await fetch(`https://alura-geek-fake-api-oi9y.onrender.com/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    if (response.status !== 204){
      const data = await response.json();
    PopupDelete(); // Muestra el popup de éxito


    return data;
  } else{
    alert("No se pudo eliminar el producto probablemente no existe");
    return;
  }
}catch (error) {
    alert("Error en la conexión: " + error.message);

  }
}

function PopupDelete() {
  const popup = document.getElementById("popup-delete");
  popup.classList.add("mostrar");

  setTimeout(() => {
    popup.classList.remove("mostrar");
  }, 3000);

}

export const conexionAPI = {
  listaProductos,
  nuevoProducto,
  eliminarTarjeta
};
