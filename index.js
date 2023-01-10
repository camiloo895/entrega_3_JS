document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Redmi Note 9 XIAOMI 4GB/128GB',
            precio: 699000,
            imagen: 'https://i0.wp.com/conectamos.shop/wp-content/uploads/2020/12/xiaomi_redmi_note_9_02_black_onyx_ad_l.jpg?resize=510%2C510&ssl=1'
        },
        {
            id: 2,
            nombre: 'Celular XIAOMI Redmi Note 11S 6GB+128GB Gris',
            precio: 1599000,
            imagen: 'https://www.alkosto.com/medias/6934177769320-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wxMjY1MjF8aW1hZ2UvanBlZ3xpbWFnZXMvaDcyL2g0Yi8xMjQxNjAwOTkyODczNC5qcGd8YjJlZGExZmQ0M2ViMDkzNDk3MDNiMThlN2FhZDVhODY2MzA3ODFmYTNlMzVlNzBmZGFkZDU0MzI3NmM5YzJhNw'
        },
        {
            id: 3,
            nombre: 'Auriculares inalámbricos Xiaomi Mi True Basic 2',
            precio: 51900,
            imagen: 'https://m.media-amazon.com/images/I/51Upw655zvL._AC_SL1000_.jpg'
        },
        {
            id: 4,
            nombre: 'Auriculares inalámbricos Xiaomi Mi True Basic 2',
            precio: 51900,
            imagen: 'https://m.media-amazon.com/images/I/51Upw655zvL._AC_SL1000_.jpg'
        },
        {
            id: 5,
            nombre: 'Auriculares inalámbricos Xiaomi Mi True Basic 2',
            precio: 51900,
            imagen: 'https://m.media-amazon.com/images/I/51Upw655zvL._AC_SL1000_.jpg'
        },
        {
            id: 6,
            nombre: 'Auriculares inalámbricos Xiaomi Mi True Basic 2',
            precio: 51900,
            imagen: 'https://m.media-amazon.com/images/I/51Upw655zvL._AC_SL1000_.jpg'
        },
        {
            id: 7,
            nombre: 'Auriculares inalámbricos Xiaomi Mi True Basic 2',
            precio: 51900,
            imagen: 'https://m.media-amazon.com/images/I/51Upw655zvL._AC_SL1000_.jpg'
        },
        {
            id: 8,
            nombre: 'Auriculares inalámbricos Xiaomi Mi True Basic 2',
            precio: 51900,
            imagen: 'https://m.media-amazon.com/images/I/51Upw655zvL._AC_SL1000_.jpg'
        },
        {
            id: 9,
            nombre: 'Cargador Xiaomi Carga Rápida Original + Cable Type C 18w',
            precio: 59600,
            imagen: 'https://http2.mlstatic.com/D_NQ_NP_777015-MCO45143340760_032021-O.jpg'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Declaro la etiqueta principal desde el div
            const etiqueta = document.createElement('div');
            etiqueta.classList.add('card', 'col-sm-4');
            // Body
            const etiquetaCardBody = document.createElement('div');
            etiquetaCardBody.classList.add('card-body');
            // Titulo
            const etiquetaTitle = document.createElement('h5');
            etiquetaTitle.classList.add('card-title');
            etiquetaTitle.textContent = info.nombre;
            // Imagen
            const etiquetaImagen = document.createElement('img');
            etiquetaImagen.classList.add('img-fluid');
            etiquetaImagen.setAttribute('src', info.imagen);
            // Precio
            const etiquetaPrecio = document.createElement('p');
            etiquetaPrecio.classList.add('card-text');
            etiquetaPrecio.textContent = `${divisa}${info.precio}`;
            // Boton 
            const etiquetaBoton = document.createElement('button');
            etiquetaBoton.classList.add('btn', 'btn-primary');
            etiquetaBoton.textContent = '+';
            etiquetaBoton.setAttribute('marcador', info.id);
            etiquetaBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            etiquetaCardBody.appendChild(etiquetaImagen);
            etiquetaCardBody.appendChild(etiquetaTitle);
            etiquetaCardBody.appendChild(etiquetaPrecio);
            etiquetaCardBody.appendChild(etiquetaBoton);
            etiqueta.appendChild(etiquetaCardBody);
            DOMitems.appendChild(etiqueta);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const etiqueta = document.createElement('li');
            etiqueta.classList.add('list-group-item', 'text-right', 'mx-2');
            etiqueta.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            etiqueta.appendChild(miBoton);
            DOMcarrito.appendChild(etiqueta);
        });
        //agregara conteo de items en el carrito
        if(carritoSinDuplicados.length > 0){
           document.getElementById("contador").innerHTML = "("+carritoSinDuplicados.length+")" ;
        }else{
          document.getElementById("contador").innerHTML = null
        }
       // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderizarProductos();
    renderizarCarrito();
  });