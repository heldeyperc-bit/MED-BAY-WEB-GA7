
// ==========================================
// MED-BAY - Módulo interactivo de farmacia
// ==========================================

// 1. Seleccionar elementos del HTML

const buscador = document.querySelector("#buscarMedicamento");
const filtroCategoria = document.querySelector("#filtroCategoria");
const filtroPresentacion = document.querySelector("#filtroPresentacion");

const productos = document.querySelectorAll(".producto-farmacia");

const contadorCarrito = document.querySelector("#contadorCarrito");
const listaCarrito = document.querySelector("#listaCarrito");
const totalCarrito = document.querySelector("#totalCarrito");

const mensajeFarmacia = document.querySelector("#mensajeFarmacia");
const botonVaciar = document.querySelector("#vaciarCarrito");

// 2. Crear el arreglo del carrito

let carrito = [];

// 3. Formatear valores en pesos colombianos

function formatoCOP(valor) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(valor);
}

// 4. Filtrar productos

function filtrarProductos() {

    const consulta = buscador.value.toLowerCase().trim();
    const categoria = filtroCategoria.value;
    const presentacion = filtroPresentacion.value;

    productos.forEach(function(producto) {

        const nombre = producto.dataset.nombre.toLowerCase();
        const categoriaProducto = producto.dataset.categoria;
        const presentacionProducto = producto.dataset.presentacion;

        const coincideNombre = nombre.includes(consulta);

        const coincideCategoria =
            categoria === "" || categoria === categoriaProducto;

        const coincidePresentacion =
            presentacion === "" || presentacion === presentacionProducto;

        const mostrar =
            coincideNombre && coincideCategoria && coincidePresentacion;

        producto.classList.toggle("producto-oculto", !mostrar);

    });
}

// 5. Agregar productos al carrito

function agregarAlCarrito(producto) {

    const nombre = producto.dataset.nombre;
    const precio = Number(producto.dataset.precio);

    carrito.push({
        nombre: nombre,
        precio: precio
    });

    actualizarCarrito();

    mensajeFarmacia.textContent =
        nombre + " agregado al carrito.";
}

// 6. Actualizar el carrito y calcular el total

function actualizarCarrito() {

    listaCarrito.textContent = "";

    let total = 0;

    if (carrito.length === 0) {

        const mensaje = document.createElement("li");
        mensaje.textContent = "El carrito está vacío.";

        listaCarrito.appendChild(mensaje);

    } else {

        carrito.forEach(function(producto) {

            const elemento = document.createElement("li");

            elemento.textContent =
                producto.nombre + " - " + formatoCOP(producto.precio);

            listaCarrito.appendChild(elemento);

            total += producto.precio;

        });

    }

    contadorCarrito.textContent = carrito.length;

    totalCarrito.textContent = formatoCOP(total);
}

// 7. Activar los botones de agregar

productos.forEach(function(producto) {

    const boton = producto.querySelector(".btn-agregar");

    boton.addEventListener("click", function() {

        agregarAlCarrito(producto);

    });

});

// 8. Activar los filtros

buscador.addEventListener("input", filtrarProductos);

filtroCategoria.addEventListener("change", filtrarProductos);

filtroPresentacion.addEventListener("change", filtrarProductos);

// 9. Vaciar el carrito

botonVaciar.addEventListener("click", function() {

    carrito = [];

    actualizarCarrito();

    mensajeFarmacia.textContent = "El carrito ha sido vaciado.";

});

// 10. Mostrar el estado inicial

actualizarCarrito();
