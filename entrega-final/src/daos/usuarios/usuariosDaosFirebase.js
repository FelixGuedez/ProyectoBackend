import ContainerFirebase from "../../container/contenedorFirebase.js";

class UsuariosDaoFirebase extends ContainerFirebase {

    constructor() {
        super('usuarios')
    }
}

export default UsuariosDaoFirebase