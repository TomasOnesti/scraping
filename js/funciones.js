//Limpia el precio de expresiones y permite hacer cuentas
function limpiarprecio(precio) {
    if (typeof precio === "number"){
        return precio
    }
    return parseFloat(
        precio
            .replace("$", "")
            .replace(/\./g, "")   
            .replace(",", ".")    
    );
}

function barato(){
    fetch('datos/productos.json')//Tomo el json para utilizarlo 

        .then(res => res.json())
        .then(data=>{
            
            const contenedor = document.getElementById("conteiner_coto");//Establesco donde se van a poner los datos
            contenedor.innerHTML="";
            //Filtro para que solo salgan huevos de pascua y no conejos de chocolate u otras cosas
            const filtrar = data.filter(producto =>
            producto.nombre.includes("Huevo")
        );
            //Filtra del mas barato al mas caro
            filtrar.sort((a, b) => {
                return limpiarprecio(a.precio) - limpiarprecio(b.precio);
            });
            const limite = filtrar.slice(0, 16);//Pone un limite de muestra de 16 productos
            //Establece los productos del array para ser mostrados en la pagina
            limite.forEach(producto => {
            const espacio = document.createElement("div");
            espacio.innerHTML = `
                <img src="${producto.imagen}" width="150">
                <h3>${producto.nombre}</h3>
                <p>Promo: ${producto.aclaracion}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Gramaje: ${producto.gramaje}</p>
            `;
            //Si el precio es menor a 10000 se pone como barato, si es mayor como caro
            const precio = limpiarprecio(producto.precio);
            if(precio < 10000){
                espacio.classList.add("card_barato");
            }else{
                espacio.classList.add("card_caro");
            }
            contenedor.appendChild(espacio);//Muestra los productos en la pagina
        });
    });

//En los otros dos es lo mismo cambiando los datos por los de sus json y los div donde se van a mostrar
    fetch('datos/productos_open25.json')
    .then(res => res.json())
    .then(data =>{
         const contenedor = document.getElementById("conteiner_open25");
            contenedor.innerHTML="";
            const filtrar = data.filter(producto =>
            producto.nombre.includes("Huevo")
        );
            filtrar.sort((a, b) => {
                return limpiarprecio(a.precio) - limpiarprecio(b.precio);
            });

            filtrar.forEach(producto => {
            const espacio = document.createElement("div");
            espacio.innerHTML = `
                <img src="${producto.imagen}" width="150">
                <h3>${producto.nombre}</h3>
                <p>Promo: ${producto.aclaracion}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Gramaje: ${producto.gramaje}</p>
            `;
            const precio = limpiarprecio(producto.precio);
            if(precio < 10000){
                espacio.classList.add("card_barato");
            }else{
                espacio.classList.add("card_caro");
            }
            contenedor.appendChild(espacio);
        });
    });

    fetch('datos/productos_dia.json')
    .then(res=>res.json())
    .then(data =>{
         const contenedor = document.getElementById("conteiner_dia");
            contenedor.innerHTML="";
            const filtrar = data.filter(producto =>
            producto.nombre.includes("Huevo")
        );
            filtrar.sort((a, b) => {
                return limpiarprecio(a.precio) - limpiarprecio(b.precio);
            });
            const limite = filtrar.slice(0, 16);
            limite.forEach(producto => {
            const espacio = document.createElement("div");
            espacio.innerHTML = `
                <img src="${producto.imagen}" width="150">
                <h3>${producto.nombre}</h3>
                <p>Promo: ${producto.aclaracion}</p>
                <p>Precio: ${producto.precio}</p>
                <p>Gramaje: ${producto.gramaje}</p>
            `;
            const precio = limpiarprecio(producto.precio);
            if(precio < 10000){
                espacio.classList.add("card_barato");
            }else{
                espacio.classList.add("card_caro");
            }
            contenedor.appendChild(espacio);
        });
    });

}
//Ejecuta la funcion
document.addEventListener("DOMContentLoaded", () => {
    barato();
});