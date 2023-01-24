import {Schema, model} from "mongoose";

const usuarioSchema = Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    number: { type: Number, required: true},
    address: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
});

export const usuarioModel = model('usuarios', usuarioSchema);