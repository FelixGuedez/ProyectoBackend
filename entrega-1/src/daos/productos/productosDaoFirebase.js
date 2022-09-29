import ContainerFirebase from "../../container/contenedorFirebase.js";

class ProductoDaoFirebase extends ContainerFirebase {

    constructor() {
        super('productos')
    }
}

export default ProductoDaoFirebase