//PRODUCTOS
const productos = [
    {
        id: "Rext",
        titulo: "Render exterior",
        imagen: "../img/caj1.png",
        precio: "$1000",
        texto: "Render desde el exterior o fachada de una obra. Se entrega imagen en alta resolucion.(Sin maqueta incluida)"

    },
    {
        id: "Rint",
        titulo: "Render interior",
        imagen: "../img/pcrender4.png",
        precio: "$7000",
        texto: "Imagen interior de la obra, desde el punto de vista indicado; alta resolución.(sin maqueta incluida)"
    },
    {
        id: "Rplant",
        titulo: "Render planta de venta",
        imagen: "../img/pcrender8.png",
        precio: "$7000",
        texto: "Plantas en alta resolución, tipo 3D para ventas. Estilo a elegir."
    },
    {
        id: "Maq3d",
        titulo: "Maquetado 3d",
        imagen: "../img/prod4.png",
        precio: "$10000",
        texto: "Maquetado 3d de edificio o producto en Sketchup. Se entrega archivo skp."
    },
    {
        id: "Inf",
        titulo: "Inforgrafia",
        imagen: "../img/prod5.png",
        precio: "$3000",
        texto: "Diagrama visual individual, que resume o explica figurativamente informaciones o textos. Estilos variados."
    },
    {
        id: "Infc",
        titulo: "Infografia compleja",
        imagen: "../img/prod6.png",
        precio: "$7000",
        texto: "Diagrama visual complejo, que resume o explica figurativamente informaciones o textos. Estilos variados."
    },
    {
        id: "Axo",
        titulo: "Axonometria",
        imagen: "../img/graficocontacto1.png",
        precio: "$12000",
        texto: "Axonometría de obra u objeto, despieces infográficos.Se entrega png a convenir. Estilo a elegir"
    },
    {
        id: "Legarq",
        titulo: "Legajo arquitectonico",
        imagen: "../img/prod8.jpg",
        precio: "$12000",
        texto: "Plantas, cortes, vistas, legajos completos. Diferentes estilos. Precio sobre 100 m2. Consultar por mas m2."
    },
    {
        id: "Desurb",
        titulo: "Desarrollo Urbanistico",
        imagen: "../img/prod9.png",
        precio: "$15000",
        texto: "Plano o esquema infográfico sobre un área urbanistica. Planta 3d informativa. Estilos varios."
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelector("boton-item");

//creamos un div primero, le agregamos la clase item, y despues le colocamos todo lo que tenian los productos adentro 
function cargarProductos() {
    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
        <span class="titulo-item">${producto.titulo}</span>
        <img src="${producto.imagen}" alt="Render fachada exterior de edificio" class="img-item">
        <p class="texto-item">${producto.texto}</p>
        <span class="precio-item">${producto.precio}</span>
        <button class="boton-item" id= ${producto.id}>Agregar al Carrito</button>
        </div>
        `;

        contenedorProductos.append(div);

    })
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}

cargarProductos();



function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".boton-item")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarritoClicked)
    })
}

//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    //Agregremos funcionalidad a los botones eliminar del carrito
    let botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        let button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }
    //Agrego funcionalidad al boton sumar cantidad
    let botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        let button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }
    //Agrego funcionalidad al boton restar cantidad
    let botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        let button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }
    //Agregamos funcionalidad al boton Agregar al carrito
    let botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        let button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }
    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)

    // Muestra en el carrito los items almacenados en el LOCAL STORAGE
    let elementosCarritoAlmacenados = JSON.parse(localStorage.getItem('elementosCarrito')) || [];
    for (let i = 0; i < elementosCarritoAlmacenados.length; i++) {
        let { titulo, precio, imagenSrc } = elementosCarritoAlmacenados[i];
        agregarItemAlCarrito(titulo, precio, imagenSrc);
    }

}

//Pagamos, eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
    //Elimino todos los elmentos del carrito
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}



//Funcion que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}




//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    let item = document.createElement('div');
    item.classList.add = ('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }

        let detallesItem = {
            titulo: titulo,
            precio: precio,
            imagenSrc: imagenSrc,
            cantidad: 1
        };

        // Almacena los elementos del carrito en localStorage
        let elementosCarrito = JSON.parse(localStorage.getItem('elementosCarrito')) || [];
        elementosCarrito.push(detallesItem);
        localStorage.setItem('elementosCarrito', JSON.stringify(elementosCarrito));

        hacerVisibleCarrito();
        actualizarTotalCarrito();

    }

    let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    let botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    let botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    // Elimina items del LOCAL STORAGE si eliminamos del carrito
    let elementosCarrito = JSON.parse(localStorage.getItem('elementosCarrito')) || [];
    elementosCarrito = elementosCarrito.filter(item => item.titulo !== titulo);
    localStorage.setItem('elementosCarrito', JSON.stringify(elementosCarrito));


    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}

//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito() {
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    let carritoContenedor = document.getElementsByClassName('carrito')[0];
    let carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for (let i = 0; i < carritoItems.length; i++) {
        let item = carritoItems[i];
        let precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        let precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        let cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

}