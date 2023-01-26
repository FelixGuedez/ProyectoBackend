import {logger} from '../utils/logger.config.js';
import ProductosDaoMongoDb from '../daos/productos/productosDaoMongoDb.js';

const DB_PRODUCTOS = new ProductosDaoMongoDb

export async function getProductos(req, res) {
    try {
        const products = await DB_PRODUCTOS.getAll()
        res.json(products);
        // res.render('productos.hbs', { products })
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

export async function postProductos(req, res) {
    res.json(await DB_PRODUCTOS.save(req.body))
}

export async function productoById(req, res) {
    res.json(await DB_PRODUCTOS.getById(req.params.id))
}

export async function deleteProducto(req, res) {
    res.json(await DB_PRODUCTOS.deleteById(req.params.id))
}

export async function updateProducto(req, res) {
    res.json( await DB_PRODUCTOS.update(req.params.id, req.body))
}