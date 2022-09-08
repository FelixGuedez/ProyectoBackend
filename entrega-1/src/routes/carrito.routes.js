import { Router } from 'express';
import Container  from '../container/contenedor.js'

const routerCarritos = Router();

const DB_CARRITOS = new Container('./src/dbCarritos.json')
const DB_PRODUCTOS = new Container('./src/dbProductos.json')

routerCarritos.get('/', async (req, res)=>{
    res.json((await DB_CARRITOS.getAll()));
});

routerCarritos.get('/:id/productos', async (req, res)=>{
    const carrito = await DB_CARRITOS.getById(req.params.id)
    res.json(carrito.productos);
});

routerCarritos.post('/', async (req, res)=>{
    // const timestamp = Date.now()
    res.json({id: await DB_CARRITOS.save({ productos: [] }) })

});

routerCarritos.delete('/:id', async (req, res)=>{
    res.json(await DB_CARRITOS.deleteById(req.params.id))
});

routerCarritos.post('/:id/productos/', async (req, res) =>{
    const carrito = await DB_CARRITOS.getById(req.params.id)
    const producto = await DB_PRODUCTOS.getById(req.body.id)
    console.log(carrito)
    carrito.productos.push(producto)
    await DB_CARRITOS.update(req.params.id, carrito)
    res.end() 

})

routerCarritos.delete('/:id/productos/:idProd', async (req, res) =>{
    const carrito = await DB_CARRITOS.getById(req.params.id)
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carrito.productos.splice(index, 1)
        await DB_CARRITOS.update(req.params.id, carrito)
    }
    res.end() 

})



export default routerCarritos;

