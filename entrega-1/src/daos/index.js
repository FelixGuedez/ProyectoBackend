import * as dotenv from 'dotenv'
dotenv.config()

let productosDao
let carritoDao
console.log(process.env.PERS)
switch (process.env.PERS) {

    case 'firebase':
        const { default: ProductoDaoFirebase } = await import('./productos/productosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carritos/carritosDaoFirebase.js')

        productosDao = new ProductoDaoFirebase()
        carritoDao = new CarritosDaoFirebase()
        break;

    case 'mongodb':
        const { default: productosDaoMongoDb } = await import('./productos/productosDaoMongoDb.js')
        const { default: CarritosDaosMongoDb } = await import('./carritos/carritosDaoMongoDb.js')

        productosDao = new productosDaoMongoDb()
        carritoDao = new CarritosDaosMongoDb()

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

export { productosDao, carritoDao }