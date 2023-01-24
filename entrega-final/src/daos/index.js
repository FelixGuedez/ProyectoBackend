import * as dotenv from 'dotenv'
dotenv.config()

let productosDao
let carritoDao
let usuariosDao

console.log(process.env.PERS)
switch (process.env.PERS) {

    case 'firebase':
        const { default: ProductoDaoFirebase } = await import('./productos/productosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carritos/carritosDaoFirebase.js')
        const { default: UsuariosDaoFirebase } = await import('./usuarios/usuariosDaosFirebase.js')

        productosDao = new ProductoDaoFirebase()
        carritoDao = new CarritosDaoFirebase()
        usuariosDao = new UsuariosDaoFirebase()
        break;

    case 'mongodb':
        const { default: productosDaoMongoDb } = await import('./productos/productosDaoMongoDb.js')
        const { default: CarritosDaosMongoDb } = await import('./carritos/carritosDaoMongoDb.js')
        const { default: UsuariosDaoMongoDb } = await import ('./usuarios/usuariosDaosMongoDb.js')

        productosDao = new productosDaoMongoDb()
        carritoDao = new CarritosDaosMongoDb()
        usuariosDao = new UsuariosDaoMongoDb()

        break;

    case 'archivo':
        const { default: ProductosDaoArchivo } = await import('./productos/productosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carritos/carritosDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritoDao = new CarritosDaoArchivo()

        break;

    case 'memoria':
        const { default: ProductoDaoMemoria } = await import('./productos/productosDaoMemoria.js')
        const { default: CarritosDaoMemoria } = await import('./carritos/carritosDaosMemoria.js')

        productosDao = new ProductoDaoMemoria()
        carritoDao = new CarritosDaoMemoria()

        break;


    default:
        break;
}

export { productosDao, carritoDao, usuariosDao }