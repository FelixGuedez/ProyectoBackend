import ProductosDaoMongoDb from './src/daos/productos/productosDaoMongoDb.js'

const DB_PRODUCTOS = new ProductosDaoMongoDb

const productsReceived = await DB_PRODUCTOS.getAll()

console.log(productsReceived)

const htmlProducts = productsReceived.map(item => {
    return `<tr>
    <td>${item.nombre}</td>
    <td>${item.precio}</td>
    <td>
        <img width="30" src="${item.imagen}" alt="">
    </td>
</tr>`
    })

    const headerTabla = ` <tr style="color: green;">
    <th>Producto</th>
    <th>Precio</th>
    <th>Imagen</th>
</tr>`

    document.querySelector("#historial").innerHTML = headerTabla + htmlProducts

