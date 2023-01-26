import {logger} from '../utils/logger.config.js';
import MensajesDaoMongoDb from '../daos/mensajes/mensajesDaoMogoDb.js';

const DB_MENSAJES = new MensajesDaoMongoDb

export async function getMensajes(req, res) {
    try {
        const mensajes = await DB_MENSAJES.getAll()
        res.render('mensajes.hbs', { mensajes })
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}