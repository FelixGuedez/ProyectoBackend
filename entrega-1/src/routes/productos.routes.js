import { Router } from 'express';
import { config } from '../utils/config.js';
import { productosDao as DB_PRODUCTOS } from '../daos/index.js';


const routerProductos = Router();
const esAdmin = config.isAdmin

function soloAdmins(req, res, next){
    if (!esAdmin) {
        res.status(403).json({code: 403, msg: `Ruta ${req.baseurl}${req.url} y Metodo ${req.method} No Autorizados`})
    } else {
        next()
    }
}

routerProductos.get('/', async (req, res)=>{
    const productos = await DB_PRODUCTOS.getAll()
    res.json(productos);
    console.log(productos)
});

routerProductos.get('/:id', soloAdmins, async (req, res)=>{
    res.json(await DB_PRODUCTOS.getById(req.params.id))
    
});

routerProductos.post('/', soloAdmins, async (req, res)=>{
    console.log(req.body)
    res.json(await DB_PRODUCTOS.save(req.body))

});

routerProductos.delete('/:id', async (req, res)=>{
    res.json(await DB_PRODUCTOS.deleteById(req.params.id))
});

routerProductos.put('/:id', soloAdmins, async (req, res)=>{
    res.json( await DB_PRODUCTOS.updateDb(req.params.id, req.body))
    
});

export default routerProductos;
