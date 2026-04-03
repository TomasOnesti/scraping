
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
    fetch('datos/productos.json')

        .then(res => res.json())
        .then(data=>{
        
            const contenedor = document.getElementById("conteiner_coto");
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
                <p>Precio: ${producto.precio}</p>
                <p>Gramaje: ${producto.gramaje}</p>
            `;
            const precio = limpiarprecio(producto.precio);
            if(precio < 8000){
                espacio.classList.add("card_barato");
            }else{
                espacio.classList.add("card_caro");
            }
            contenedor.appendChild(espacio);
        });
    });


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

            filtrar.forEach(producto => {
            const espacio = document.createElement("div");
            espacio.innerHTML = `
                <img src="${producto.imagen}" width="150">
                <h3>${producto.nombre}</h3>
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

document.addEventListener("DOMContentLoaded", () => {
    barato();
});