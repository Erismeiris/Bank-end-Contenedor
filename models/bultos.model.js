

const { Schema, model, SchemaTypes, SchemaType } = require('mongoose')

const BultoSchema = Schema({
    
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
    contenedor:{
        type: Schema.Types.ObjectId,
        ref:'Contenedor',
        required: true
    }
}, {collection: 'bultos'})

module.exports = model('Bulto', BultoSchema)