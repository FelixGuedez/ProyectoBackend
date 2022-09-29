import ContainerArchivo from "../../container/contenedorArchivo.js";

class ProductoDaoArchivo extends ContainerArchivo {

    constructor() {
        super('./src/dbProductos.json')
    }
}

export default ProductoDaoArchivo