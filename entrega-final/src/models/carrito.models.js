import {Schema, model} from "mongoose";

const carritoSchema = Schema({
    productos: { type: [], required: true }
});

export const carritoModel = model('carritos', carritoSchema);