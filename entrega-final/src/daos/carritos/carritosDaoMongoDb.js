import ContainerMongoDb from "../../container/contenedorMongoDb.js";
import { carritoModel } from "../../models/carrito.models.js";


class CarritosDaosMongoDb extends ContainerMongoDb {

    constructor() {
        super(carritoModel)
    }

    async save(carrito = { productos: []}) {
        return super.save(carrito)
    }
}

export default CarritosDaosMongoDb