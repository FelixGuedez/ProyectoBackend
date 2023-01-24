import { logger } from "../utils/logger.config.js"
import {generateHashPassword, verifyPass, nameUsername} from '../services/operaciones.services.js';
import passport from 'passport';
import { Strategy } from 'passport-local'
import UsuariosDaoMongoDb from "../daos/usuarios/usuariosDaosMongoDb.js";
import { registerEmailConfirmation } from '../utils/register.SendEmail.js';

const USUARIOS = new UsuariosDaoMongoDb
const LocalStrategy = Strategy
let nameUser

passport.use(new LocalStrategy(
    async function (username, password, done) {
        console.log(`${username} ${password}`)
        //Logica para validar si un usuario existe
        const existeUsuario = await USUARIOS.getByUserName(username)
        if (!existeUsuario) {
            return done(null, false);
        } else {
            const match = await verifyPass(existeUsuario, password);
            if (!match) {
                return done(null, false);
            }
            nameUser = await nameUsername(existeUsuario)
            console.log('name user', nameUser)
            return done(null, existeUsuario);
        }
    }
));

export async function getHome(req, res) {
    try {
        res.redirect('/login')
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

export async function getLogin(req, res) {
    try {
        res.render('login.hbs')
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}


export async function getRegistro(req, res) {
    try {
        res.render('registro.hbs')
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}



export async function getLoginError(req, res) {
    try {
        res.render('loginError.hbs')
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

export async function getLogout(req, res) {
    try {
        const nombre = nameUser
        req.session.destroy(err => {
            if (err) {
                res.json({ err });
            } else {
                res.render('logout.hbs', { nombre })
            }
        });
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}


export async function postRegistro(req, res) {
    try {
        const { name, lastname, number, address, username, password } = req.body;
        console.log('Desde Formulario', req.body)
        // const newUsuario = await USUARIOS.findOne({ username: username })
        const newUsuario = await USUARIOS.getByUserName(username)

        if (newUsuario) {
            res.render('registro-error')
        } else {
            const newUser = { name, lastname, number, address, username, password: await generateHashPassword(password) };
            await USUARIOS.save(newUser)
            registerEmailConfirmation(newUser)
            res.redirect('/login')
        }
    } catch (error) {
        logger.warn('Ruta no implementada', error)
    }
}

