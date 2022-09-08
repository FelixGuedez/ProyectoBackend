import { Router } from 'express';
import Container  from '../container/contenedor.js'
import { config } from '../utils/config.js';

const routerProductos = Router();
const DB_PRODUCTOS = new Container('./src/dbProductos.json')
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
    res.json(await DB_PRODUCTOS.save(req.body))

});

routerProductos.delete('/:id', async (req, res)=>{
    res.json(await DB_PRODUCTOS.deleteById(req.params.id))
});

routerProductos.put('/:id', soloAdmins, async (req, res)=>{
    res.json( await DB_PRODUCTOS.update(req.params.id, req.body))
    
});

export default routerProductos;
