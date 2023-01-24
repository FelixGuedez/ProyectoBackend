import admin from 'firebase-admin'
import { config } from '../utils/config.js';
import { doc, getDoc } from 'firebase/firestore'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

export default class ContainerFirebase {
    constructor(nombreColeccion) {
        console.log(nombreColeccion)
        this.coleccion = db.collection(nombreColeccion)
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get()
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            console.log(id)
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                console.log('Documento no existe')
            } else {
                const data = doc.data();
                return { ...data, id }
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

    async getByUserName(elem) {
        try {
            console.log('elemento en base de datos', elem)
            // const obj = await this.coleccion.get()
            const obj = await this.coleccion.where('username', '==', elem).get()
            console.log('objeto base de datos', obj)
            
            const response = obj.docs.username
            console.log('en base de datos', response)
            return response
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


