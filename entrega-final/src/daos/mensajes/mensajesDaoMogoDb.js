import ContainerMongoDb from "../../container/contenedorMongoDb.js";
import { mensajeModel } from "../../models/mensajes.models.js";

class MensajesDaoMongoDb extends ContainerMongoDb {

    constructor() {
        super(mensajeModel)
    }
}

export default MensajesDaoMongoDb