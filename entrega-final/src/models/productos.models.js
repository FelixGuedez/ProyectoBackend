import {Schema, model} from "mongoose";

const productoSchema = Schema({
    "name": { type: String, required: true},
    "price": { type: Number, required: true},
    "image": { type: String, required: true},
});

export const productoModel = model('productos', productoSchema);