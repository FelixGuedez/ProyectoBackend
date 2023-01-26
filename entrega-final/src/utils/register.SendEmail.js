import { createTransport } from "nodemailer";
import dotenv from 'dotenv';
import { logger } from "./logger.config.js";

dotenv.config({path:'../../.env'});

/* Configuracion de mail y proceso de envio */
export async function registerEmailConfirmation(user){

    const emails = [process.env.COUNT, user.username]

    /* Configuracion de quien envia */
    const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.COUNT,
        pass: process.env.PASSWORD
    }
});
console.log( process.env.COUNT, process.env.PASSWORD)
    
    const regConfirm_MailOptions = {
        from: 'CoderHouse - App Felix Guedez <noreply@myapp.com>',
        to: `${emails[0]}, ${emails[1]}`,
        subject: 'Nuevo registro en la base de datos',
        text: 'Contenido del mensaje',
        html: `<p style="font-size: 20px"> <strong> El usuario ${user.name} ${user.lastname} se ha registrado con exito </strong> </p> <p> Datos del usuario: </p> </br> <p> Telefono: ${user.number} </p> </br> <p> Email:  ${user.username}</p> </br> <p> Direccion:  ${user.address}</p>`
    }
    
    try {
        const info = await transporter.sendMail(regConfirm_MailOptions)
    } catch (error) {
        logger.warn(error)
    }
}
