import ContainerMongoDb from "../../container/contenedorMongoDb.js";

class CarritosDaosMongoDb extends ContainerMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async save(carrito = { productos: []}) {
        return super.save(carrito)
    }
}

export default CarritosDaosMongoDb