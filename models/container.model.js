
const { Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const ContenedorSchema = new Schema({
    containerType: {
        type: Number,
        required: true
    },

    nombre: {
        type: String,
        required: true
    },
    
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
        }
}, {collection: 'contenedores'});
const Contenedor = model('Contenedor', ContenedorSchema)
module.exports = { Contenedor };