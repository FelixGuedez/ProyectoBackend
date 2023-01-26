import { Router } from "express";
import passport  from "passport";
import { getHome, getLogin, getRegistro, postRegistro, getLoginError, getLogout} from '../controllers/operacion.usuarios.controllers.js';
import { getProductos, productoById, updateProducto, deleteProducto, postProductos } from "../controllers/operacion.productos.controller.js";
import { getCarritos, getByIdCarritos, createCarrito, addProductCarritos } from "../controllers/operacion.carritos.controllers.js";
import { getMensajes } from "../controllers/operacion.mensajes.controller.js";

import { soloAdmins } from "../services/operaciones.services.js";


const routerApp = Router()

routerApp.get ('/', getHome)
routerApp.get('/login', getLogin)
routerApp.get('/registro', getRegistro)
routerApp.get('/productos', getProductos)
routerApp.get('/productos/:id', productoById)
routerApp.put('/productos/:id', soloAdmins, updateProducto)
routerApp.delete('/productos/:id', soloAdmins, deleteProducto)
routerApp.post('/productos', soloAdmins, postProductos)
routerApp.post('/registro', postRegistro)
routerApp.get('/login-error', getLoginError)
routerApp.get('/logout', getLogout)
routerApp.post('/login', passport.authenticate('local', { successRedirect: '/productos', failureRedirect: '/login-error' }))
routerApp.get('/carritos', getCarritos)
routerApp.post('/carritos', createCarrito)
routerApp.post('/carritos/:id/productos', addProductCarritos)
routerApp.get('/chat', getMensajes)


export default routerApp