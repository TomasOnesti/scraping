fetch('datos/productos_coto.json')

.then(res => res.json())
.then(data=>{
    const contenedor = document.getElementById("conteiner_coto");

    const filtrar = data.filter(producto =>
        producto.nombre.includes("Huevo")
    );

    filtrar.forEach(producto => {
        const espacio = document.createElement("div");
        espacio.innerHTML = `
            <img src="${producto.imagen}" width="150">
            <h3>${producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>Gramaje: ${producto.gramaje}</p>
        `;
        espacio.classList.add("card");
        contenedor.appendChild(espacio);
        
    });

});
