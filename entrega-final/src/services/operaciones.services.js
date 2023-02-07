import bcrypt from 'bcrypt';
import { config } from '../utils/config.js';
import dotenv from 'dotenv';

dotenv.config();

let esAdmin = process.env.IS_ADMIN


export async function verifyPass(username, password) {
    const match = await bcrypt.compare(password, username.password);
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


// export function soloAdmins(req, res, next){
//     const authHeader = req.headers["Authorization"] || req.headers["authorization"];
//     console.log(authHeader)

//     if (!authHeader) {
//         return res.status(401).json(
//             {
//                 code: 401,
//                 msg: 'not authenticated token'
//             }
//         )
//     }

//     const token = authHeader.split(' ')[0];

//     jwt.verify(token, PRIVATE_KEY, (err, datos ) =>{
//         if(err) return res.status(403).json({
//             code: 403,
//             msg: 'not authorized'
//         })

//         req.user = datos;
//         next();
//     })
// }



export function soloAdmins(req, res, next){
    console.log('EsAdmin en autorizacion', esAdmin)
    if (!esAdmin) {
        res.status(403).json({code: 403, msg: `Ruta ${req.baseurl}${req.url} y Metodo ${req.method} No Autorizados`})
    } else {
        next()
    }
}