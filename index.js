const botones_comprar = document.querySelectorAll(".button");
const tbody = document.querySelector(".tbody")
let carrito = [];

botones_comprar.forEach(btn => {
    btn.addEventListener("click", AgregarProducto);
})
function Gls() {
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

window.onload = function () {
    let storage = JSON.parse(localStorage.getItem("carrito"))
    if (storage) {
        carrito = storage;
        MostrarCarrito();
    }
}

function MostrarCarrito() {
    tbody.innerHTML = "";
    carrito.map(producto => {
        const tr = document.createElement("tr");
        tr.classList.add("productoCarrito");
        const Contenido =
            `
            <td class="table__productos">
                <img src=${producto.img} alt="">
                <h6 class="title">${producto.title}</h6>
            </td>
            <td class="table__precio">
                <p>${producto.precio}</p>
            </td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${producto.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">X</button>
            </td>`

        tr.innerHTML = Contenido;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener("click", EliminarProducto);
        tr.querySelector(".input__elemento").addEventListener("change", SumarCant);
    })

    TotalCarrito()

}
function AgregarProducto(e) {
    const boton = e.target;
    const padreBoton = boton.parentNode.parentNode.parentNode;
    const producto_nombre = padreBoton.querySelector(".card-title").textContent;
    const producto_precio = padreBoton.querySelector(".precio").textContent;
    const producto_imagen = padreBoton.querySelector(".card-img-top").src;

    const nuevo_producto = {
        title: producto_nombre,
        precio: producto_precio,
        img: producto_imagen,
        cantidad: 1
    }

    A_agregar()
    agregarAlCarrito(nuevo_producto);
}

function agregarAlCarrito(nuevo_producto) {

    const InputElemento = tbody.getElementsByClassName("input__elemento")
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === nuevo_producto.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++
            TotalCarrito()
            return null
        }
    }

    carrito.push(nuevo_producto);
    MostrarCarrito();
}
function TotalCarrito() {
    let total = 0;
    const carritoTotal = document.querySelector(".carritoTotal");
    carrito.forEach((producto) => {
        const precio = Number(producto.precio.replace("$", ""))
        total = total + precio * producto.cantidad
    })
    carritoTotal.innerHTML = `Total $${total}`

    Gls()
}

function EliminarProducto(e) {
    const boton_eliminar = e.target;
    const tr = boton_eliminar.parentNode.parentNode;
    const title = tr.querySelector(".title").textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove();
    TotalCarrito();
    A_Elimiar()
}

function SumarCant(e) {
    const suma_input = e.target;
    const tr = suma_input.parentNode.parentNode;
    const title = tr.querySelector(".title").textContent;
    carrito.forEach(producto => {
        if (producto.title.trim() === title.trim()) {
            suma_input.value < 1 ? (suma_input.value = 1) : suma_input.value;
            producto.cantidad = suma_input.value;
        }
        TotalCarrito();
    })
}

let boton_compra = document.getElementById("boton-comprar")
boton_compra.addEventListener("click", A_comprar)
boton_compra.addEventListener("click", BorrarCarrito)

function BorrarCarrito() {
    tbody.innerHTML = "";
    carrito = [];
    TotalCarrito()
}

function A_agregar() {
    Swal.fire({
        title: "Producto añadido.",
        width: "50%",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        color: "info",
    })
}
function A_comprar() {
    Swal.fire({
        icon: "success",
        title: "Muchas gracias por su compra!Con esto ayuda al club!",
        width: "50%",
        timer: 2000,
        timerProgressBar: true,
        color: "info",
    })
}

function A_Elimiar() {
    Swal.fire({
        icon: "error",
        title: "Producto eliminado.",
        width: "50%",
        color: "info",
        confirmButtonColor: "info"
    })
}
//API DE GOOGLE MAPS//

function iniciarMap(){
    var coord = {lat:-34.6679267 ,lng: -58.3700112};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 18,
      center: coord,
    });
    var Marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}