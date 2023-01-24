import ContainerMongoDb from "../../container/contenedorMongoDb.js";
import { productoModel } from "../../models/productos.models.js";

class ProductosDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super(productoModel)
    }
}

export default ProductosDaoMongoDb