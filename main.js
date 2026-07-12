// Carga el carrito desde LocalStorage o lo inicializa vacío si no hay datos guardados
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Ejecuta las funciones iniciales una vez que el HTML está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorDOM(); 
    renderizarCarritoDOM(); 

    // Verifica si los elementos existen en la página actual para evitar errores en otras pantallas
    if (document.getElementById('contenedor-productos')) {
        traerProductosAPI();
    }
    
    if (document.getElementById('form-contacto')) {
        configurarFormulario();
    }

    // Controla la apertura y el cierre del panel lateral del carrito
    const btnAbrir = document.getElementById('ver-carrito');
    const btnCerrar = document.getElementById('cerrar-carrito');
    const sidebar = document.getElementById('carrito-sidebar');

    if (btnAbrir && sidebar) {
        btnAbrir.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte al inicio al hacer clic
            sidebar.classList.add('open');
        });
    }

    if (btnCerrar && sidebar) {
        btnCerrar.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // Gestiona la simulación de la compra y restablece el carrito al finalizar
    const btnFinalizar = document.getElementById('btn-finalizar-compra');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            if (carrito.length === 0) {
                alert("El carrito está vacío. Añadí productos antes de finalizar la compra.");
                return;
            }
            
            alert("¡Compra simulada con éxito! Muchas gracias por elegir Tecno Productos.");
            
            // Vacía el carrito y actualiza la interfaz
            carrito = [];
            guardarYActualizar();
            
            if (sidebar) sidebar.classList.remove('open');
        });
    }
});

// Obtiene los productos de tecnología desde la API de forma asincrónica (Clase 15)
async function traerProductosAPI() {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products/category/electronics');
        
        // Si el servidor responde con un error (códigos 400 o 500), interrumpe el flujo
        if (!respuesta.ok) {
            throw new Error(`Error de servidor: ${respuesta.status}`);
        }
        
        const productos = await respuesta.json();
        const contenedor = document.getElementById('contenedor-productos');
        if (!contenedor) return;
        contenedor.innerHTML = ''; 

        // Recorre los productos y crea las tarjetas dinámicamente
        productos.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'card-producto';
            
            // Limpia las comillas del título para evitar errores de sintaxis en el botón HTML
            const tituloLimpio = prod.title.replace(/'/g, '&apos;').replace(/"/g, '&quot;');

            div.innerHTML = `
                <div class="imagen-box">
                    <img src="${prod.image}" alt="${prod.title}">
                </div>
                <div class="info-box">
                    <h3>${prod.title.slice(0, 20)}...</h3>
                    <p>${prod.description.slice(0, 50)}...</p>
                    <span class="precio">$${prod.price}</span>
                    <button class="btn-comprar" onclick="agregarAlCarrito(${prod.id}, '${tituloLimpio}', ${prod.price})">
                        <i class='bx bx-cart-add'></i> Agregar
                    </button>
                </div>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        // Muestra un mensaje en consola y alerta al usuario si falla la conexión con la API
        console.error('Error al cargar la API:', error);
        alert("Hubo un problema al cargar los productos. Por favor, intentá más tarde.");
    }
}

// Agrega un nuevo producto al carrito o incrementa su cantidad si ya fue seleccionado
function agregarAlCarrito(id, titulo, precio) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        // Guarda el producto con un formato unificado
        carrito.push({ id, titulo, price: parseFloat(precio), cantidad: 1 });
    }
    
    guardarYActualizar();
    alert(`"${titulo}" agregado al carrito.`);
}

// Dibuja los productos en el panel del carrito y calcula el total de la compra
function renderizarCarritoDOM() {
    const contenedorItems = document.getElementById('carrito-items');
    const contenedorTotal = document.getElementById('carrito-total');
    
    if (!contenedorItems) return; 

    contenedorItems.innerHTML = ''; 
    let totalAcumulado = 0;

    carrito.forEach(prod => {
        const subtotal = prod.price * prod.cantidad;
        totalAcumulado += subtotal;

        const div = document.createElement('div');
        div.className = 'item-carrito';
        div.innerHTML = `
            <h4>${prod.titulo}</h4>
            <div class="controles-cantidad">
                <button onclick="cambiarCantidad(${prod.id}, -1)">-</button>
                <span>${prod.cantidad}</span>
                <button onclick="cambiarCantidad(${prod.id}, 1)">+</button>
            </div>
            <span>$${subtotal.toFixed(2)}</span>
            <button class="btn-eliminar-item" onclick="eliminarProducto(${prod.id})">
                <i class='bx bx-trash'></i>
            </button>
        `;
        contenedorItems.appendChild(div);
    });

    if (contenedorTotal) {
        contenedorTotal.textContent = `$${totalAcumulado.toFixed(2)}`;
    }
}

// Modifica la cantidad de un producto y lo elimina si llega a cero
function cambiarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad <= 0) {
            eliminarProducto(id);
            return;
        }
    }
    guardarYActualizar();
}

// Eliminar un producto completo del carrito usando su ID
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizar();
}

// Guarda los cambios en LocalStorage y actualiza el diseño de la página
function guardarYActualizar() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorDOM();
    renderizarCarritoDOM();
}

// Calcula el total de unidades en el carrito y actualiza el número en el header
function actualizarContadorDOM() {
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        const totalProductos = carrito.reduce((acum, prod) => acum + prod.cantidad, 0);
        contador.textContent = totalProductos;
    }
}

// Valida los datos del formulario de contacto antes de permitir el envío
function configurarFormulario() {
    const formulario = document.getElementById('form-contacto');
    if (!formulario) return;
    
    formulario.addEventListener('submit', (event) => {
        const emailInput = document.getElementById('email').value.trim();
        const nombreInput = document.getElementById('nombre').value.trim();
        
        // Expresión regular para validar que el formato del correo sea correcto
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombreInput === "") {
            event.preventDefault(); // Detiene el envío si el nombre está vacío
            alert("Por favor, ingresá tu nombre.");
            return;
        }

        if (!expresionEmail.test(emailInput)) {
            event.preventDefault(); // Detiene el envío si el email no es válido
            alert("Por favor, ingresá un correo electrónico válido.");
            return;
        }
        
        alert("¡Muchas gracias! Tu consulta fue enviada con éxito.");
        formulario.reset(); // Limpia los campos del formulario
    });
}