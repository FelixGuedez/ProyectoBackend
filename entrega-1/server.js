/* ---------------------- Modulos ----------------------*/
import express from 'express';


//Instancia de Server
const app = express();
import routerProductos from './src/routes/productos.routes.js';
import routerCarritos from './src/routes/carrito.routes.js'
/*-----------------

/* ---------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());

/* ---------------------- Rutas ----------------------*/
app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);


/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
