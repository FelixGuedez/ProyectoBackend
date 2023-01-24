import ContainerMongoDb from "../../container/contenedorMongoDb.js"
import { usuarioModel } from "../../models/usuario.model.js"

class UsuariosDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super(usuarioModel)
    }
}

export default UsuariosDaoMongoDb





