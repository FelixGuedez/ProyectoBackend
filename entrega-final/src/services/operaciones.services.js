import bcrypt from 'bcrypt';
import { config } from '../utils/config.js';

const esAdmin = config.isAdmin

export async function verifyPass(username, password) {
    const match = await bcrypt.compare(password, username.password);
    // console.log(`pass login: ${password} || pass hash: ${username.password}`)
    return match;
}

export async function nameUsername(username) {
    const usuario = username.username
    return usuario
}

export async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

export function soloAdmins(req, res, next){
    if (!esAdmin) {
        res.status(403).json({code: 403, msg: `Ruta ${req.baseurl}${req.url} y Metodo ${req.method} No Autorizados`})
    } else {
        next()
    }
}