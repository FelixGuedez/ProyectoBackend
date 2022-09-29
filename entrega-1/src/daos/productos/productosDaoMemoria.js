import ContainerMemoria from "../../container/contenedorMemoria.js";

let productosMemo = []

class ProductoDaoMemoria extends ContainerMemoria {

    constructor() {
        super(productosMemo)
    }
}

export default ProductoDaoMemoria