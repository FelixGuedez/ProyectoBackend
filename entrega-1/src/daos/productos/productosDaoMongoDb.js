import ContainerMongoDb from "../../container/contenedorMongoDb.js";

class ProductosDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super('productos', {
            nombre: { type: String, required: true},
            precio: { type: Number, required: true},
            imagen: { type: String, required: true},
        })
    }
}

export default ProductosDaoMongoDb