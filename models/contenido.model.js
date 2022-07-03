

const { Schema, model, SchemaTypes, SchemaType } = require('mongoose')

const ContenidoSchema = Schema({
    
    nombre:{
        type: String,
        required: true
    },
    volumen:{
        type: Number,
    },
    puntos:{
        type: Number
    },
    precio:{
        type: Number
    },
    masa:{
        type: Number
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    bulto:{
        type: Schema.Types.ObjectId,
        ref:'Bulto',
        required: true
    }
}, {collection: 'contenidos'})

module.exports = model('Contenido', ContenidoSchema)