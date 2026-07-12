# Tecno Productos - Proyecto Final de E-commerce

Este proyecto consiste en la creación de un sitio web de e-commerce dinámico e interactivo enfocado en la venta de componentes de hardware y tecnología. La página consume datos en tiempo real desde una API REST para renderizar los productos y cuenta con un sistema completo de carrito de compras con persistencia de datos.

## 🚀 Tecnologías Utilizadas
* **HTML5:** Estructura totalmente semántica (`header`, `nav`, `main`, `section`, `footer`).
* **CSS3:** Diseño responsivo y estético aplicando **Flexbox** para la grilla de productos, **CSS Grid** para la sección de reseñas de usuarios, y Media Queries para asegurar la adaptabilidad en dispositivos móviles.
* **Bootstrap:** Implementación de componentes dinámicos como el carrusel de banners principal.
* **JavaScript (Vanilla):** Lógica del negocio, manipulación interactiva del DOM, consumo asincrónico de la Fetch API y manejo del almacenamiento local.
* **LocalStorage:** Persistencia del estado del carrito ante recargas de página.
* **Formspree:** Procesamiento y envío funcional del formulario de contacto.

## ⚙️ Funcionalidades Principales
1. **Renderizado Dinámico:** Consumo de la categoría "electronics" de FakeStore API.
2. **Carrito Flotante (Sidebar):** Interfaz lateral para visualizar productos añadidos, modificar cantidades en tiempo real (+ / -) y eliminar elementos.
3. **Cálculo de Totales:** Contador dinámico de ítems en el header y cálculo del precio final automatizado.
4. **Simulación de Compra:** Validación de stock y vaciado lógico del carrito con alertas nativas al finalizar la operación.
5. **Validación de Formularios:** Control por expresiones regulares (Regex) para el ingreso correcto de nombres y correos electrónicos.

## 💻 Instrucciones de Instalación / Ejecución Local
1. Clona este repositorio o descarga los archivos del proyecto.
2. Asegúrate de mantener la estructura de carpetas (`css/styles.css`, `js/script.js`, `pages/`).
3. Abre el archivo `index.html` en tu navegador web (se recomienda utilizar la extensión *Live Server* en Visual Studio Code para garantizar el correcto flujo de las rutas relativas).