import {Schema, model} from "mongoose";

const mensajeSchema = Schema({
    author: { type: String, required: true},
    text: { type: String, required: true},
    date: { type: String, required: true},
    reply: { type: String, required: true}
});

export const mensajeModel = model('mensajes', mensajeSchema)