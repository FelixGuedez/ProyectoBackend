import admin from 'firebase-admin'
import { config } from '../utils/config.js';

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

export default class ContainerFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get()
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data()})
            })
            return result
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                console.log('Documento no exixte')
            } else {
                const data = doc.data();
                return { ...data, id}
            }
        } catch (error) {
            console.log('No se encontro el articulo seleccionado')
        }
    }

    async deleteById(id) {
        try {
            const obj = await this.coleccion.doc(id).delete();
            return obj
        } catch (error) {
            return 'No se pudo eliminar'
        }
    }

    async save(elem) {
        try {
            let doc = await this.coleccion.add(elem);
            return { ...elem, id: doc.id }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.doc().delete();
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, elem) {
        try {
            const obj = await this.coleccion.doc(id).set(elem);
            return obj
        } catch (error) {
            console.log(error)
        }
    }



    async update(id, elem) {
        try {
            const obj = await this.coleccion.doc(elem.id).set(elem);
            return obj
        } catch (error) {
            console.log(error)
        }
    }

 
    // async add(id, body) {
    //     const objs = await this.getAll()
    //     const carritoFind = objs.find((e) => e.id == id)
    //     carritoFind.productos.push(body)
    //     await fs.writeFile(this.ruta, JSON.stringify(carritoFind, null, 2))
    // }

}


