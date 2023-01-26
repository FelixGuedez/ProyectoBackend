import CarritosDaosMongoDb from '../daos/carritos/carritosDaoMongoDb.js'
import ProductosDaoMongoDb from '../daos/productos/productosDaoMongoDb.js';
import {logger} from '../utils/logger.config.js';


const DB_CARRITOS = new CarritosDaosMongoDb
const DB_PRODUCTOS = new ProductosDaoMongoDb

export async function getCarritos(req, res) {
    try {
        const carritos = await DB_CARRITOS.getAll()
        res.json(carritos)
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

export async function createCarrito(req, res) {
    try {
        res.json({id: await DB_CARRITOS.save({ productos: [] }) })
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

export async function addProductCarritos(req, res) {
    try {
        const carrito = await DB_CARRITOS.getById(req.params.id)
        const producto = JSON.stringify( await DB_PRODUCTOS.getById(req.body.id))
        carrito[0].productos.push(producto)
        console.log('el update del carrito', producto)
        await DB_CARRITOS.update(req.params.id, carrito)
        console.log('carrito actualizado',DB_CARRITOS)
        res.end() 
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

export async function getByIdCarritos(req, res) {
    try {
        const carrito = await DB_CARRITOS.getById(req.params.id)
        res.json(carrito.productos);
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}