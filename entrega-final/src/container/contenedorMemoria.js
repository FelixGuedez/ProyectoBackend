
export default class ContainerArchivo {
    constructor(producto) {
        this.producto = producto
    }

    async getAll() {
        try {
            const objs = await this.producto
            return JSON.parse(JSON.stringify(objs))
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const objs = await this.producto
            const objFind = objs.find((e) => e.id == id)
            return objFind
        } catch (error) {
            console.log('No se encontro el articulo seleccionado')
        }
    }

    async deleteById(id) {
        try {
            const objs = await this.producto
            const indexObj = objs.findIndex((e) => e.id == id)
            if (indexObj == -1) {
                return 'Articulo no encontrado'
            } else {
                return objs.splice(indexObj, 1)
            }
        } catch (error) {
            return 'No se pudo eliminar'
        }
    }

    async save(obj) {
        try {
            console.log(this.producto)
            const objs = await this.producto
            let newId
            if (objs.length == 0) {
                newId = 1
            } else {
                newId = objs[objs.length - 1].id + 1
            }
            const timestamp = Date.now()
            const newObj = { id: newId, timestamp, ...obj }
            return objs.push(newObj)
            
            // return newId
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            const objs = []
            return objs

        } catch (error) {
            return 'No se pudieron elminar los articulos'

        }

    }

    async update(id, newObj) {
        const objs = await this.producto
        const indexObj = objs.findIndex((e) => e.id == id)
        if (indexObj === undefined) {
            return 'Producto No encontrado' ;
        }
        else {
            objs[indexObj] = {id, ...newObj};
        }
        return {id, ...newObj}
    }
    
    async add(id, body) {
        const objs = await this.producto
        const carritoFind = objs.find((e) => e.id == id)
        carritoFind.productos.push(body)
            return carritoFind
        }
    
}

