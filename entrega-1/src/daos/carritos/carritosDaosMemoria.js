import ContainerMemoria from "../../container/contenedorMemoria.js";

let carritosMemo = []

class CarritosDaoMemoria extends ContainerMemoria {

    constructor() {
        super(carritosMemo)
    }

    async save(carrito = { productos: []}) {
        return super.save(carrito)
    }
}

export default CarritosDaoMemoria