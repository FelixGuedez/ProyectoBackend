import mongoose from 'mongoose';
import  { config }  from '../utils/config.js';
import { logger } from '../utils/logger.config.js';

const strConn = config.mongodb.cnxStr
const options = config.mongodb.options

export default class ContainerMongoDb {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            await mongoose.connect(strConn, options);
            const docs = await this.model.find()
            return docs
        } catch (error) {
            return error
        } finally {
            await mongoose.disconnect()
        }
    }

    async getById(id) {
        try {
            await mongoose.connect(strConn, options);
            const docs = await this.model.find({ _id: id })
            if (docs.length == 0) {
                logger.info('No se encontro el articulo seleccionado')
            }
            else {
                return docs
            }
        } catch (error) {
            logger.info('No se encontro el articulo seleccionado,', error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async getByUserName(elem) {
        try {
            console.log('username que recibe el container', elem)
            await mongoose.connect(strConn, options);
            const objFind = await this.model.findOne({username: elem });
            if (objFind.length == 0) {
                console.log('No se encontro el usuario seleccionado')
            }
            else {
                return objFind
            }
        } catch (error) {
            logger.info('No se encontro el usuario seleccionado por error', error)
        } finally {
            //  await mongoose.disconnect()
        }
    }

    async deleteById(id) {
        try {
            await mongoose.connect(strConn, options);
            const obj = await this.model.deleteOne({ '_id': id })
            if (obj == 0) {
                return 'Articulo no encontrado'
            }
        } catch (error) {
            return 'No se pudo eliminar', error
        } finally {
            await mongoose.disconnect()
        }
    }

    async save(elem) {
        try {
            await mongoose.connect(strConn, options);
            let doc = await this.model.create(elem)
            return doc
        } catch (error) {
            logger.info(error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async deleteAll() {
        try {
            await mongoose.connect(strConn, options);
            await this.model.deleteMany({})
        } catch (error) {
            logger.info(error)
        } finally {
            await mongoose.disconnect()
        }
    }

    async update(id, elem) {
        try {
            await mongoose.connect(strConn, options);
            console.log('en el contenedor', id , elem)
            const obj = await this.model.updateOne({ '_id': {$eq:id} }, elem)
            console.log('desde el contenedor',obj)
            if (obj === undefined) {
                return 'Producto No encontrado';
            }
            else {
                return JSON.stringify(obj)
            }
        } catch (error) {
            console.log(error)
        } finally {
            await mongoose.disconnect()
        }
    }

}

    // async update(id, body) {
    //     try {
    //         await mongoose.connect(strConn, options);
    //         console.log('update', id, body)
    //         const obj = await this.model.updateOne({ '_id': {$eq:id}}, body)
    //         if (obj === undefined) {
    //             return 'Producto No encontrado';
    //         }
    //         else {
    //             return JSON.stringify(obj)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         await mongoose.disconnect()
    //     }
    // }



