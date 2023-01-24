import { promises as fs } from 'fs';

export default class ContainerArchivo {
    constructor(ruta) {
        this.ruta = ruta
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const objs = await this.getAll()
            const objFind = objs.find((e) => e.id == id)
            return objFind
        } catch (error) {
            console.log('No se encontro el articulo seleccionado')
        }
    }

    async deleteById(id) {
        try {
            const objs = await this.getAll()
            const indexObj = objs.findIndex((e) => e.id == id)
            if (indexObj == -1) {
                return 'Articulo no encontrado'
            } else {
                objs.splice(indexObj, 1)
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            }
        } catch (error) {
            return 'No se pudo eliminar'
        }
    }

    async save(obj) {
        try {
            const objs = await this.getAll()
            let newId
            if (objs.length == 0) {
                newId = 1
            } else {
                newId = objs[objs.length - 1].id + 1
            }
            const timestamp = Date.now()
            const newObj = { id: newId, timestamp, ...obj }
            objs.push(newObj)
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            // return newId
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            const objs = []
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))

        } catch (error) {
            return 'No se pudieron elminar los articulos'

        }

    }

    async update(id, newObj) {
        const objs = await this.getAll()
        const indexObj = objs.findIndex((e) => e.id == id)
        if (indexObj === undefined) {
            return 'Producto No encontrado' ;
        }
        else {
            objs[indexObj] = {id, ...newObj};
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
        }
        return {id, ...newObj}
    }
    

    async add(id, body) {
        const objs = await this.getAll()
        const carritoFind = objs.find((e) => e.id == id)
        carritoFind.productos.push(body)
            await fs.writeFile(this.ruta, JSON.stringify(carritoFind, null, 2))
        }
    
}

