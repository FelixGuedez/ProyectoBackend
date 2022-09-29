import ContainerArchivo from "../../container/contenedorArchivo.js";

class CarritosDaoArchivo extends ContainerArchivo {

    constructor() {
        super('./src/dbCarritos.json')
    }

    async save(carrito = { productos: []}) {
        return super.save(carrito)
    }
}

export default CarritosDaoArchivo