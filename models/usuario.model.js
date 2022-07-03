
const { Schema, model} = require('mongoose');
const mongoose = require('mongoose')



const UsuarioSchema =  Schema({
 
  nombre:{
    type: String,
    required: true
   },
email:{
    type: String,
    unique: true,
    required: true
   },  
  ci:{
    type: Number,
    required:true
   },  
  pasaporte:{ 
    type: String,
  },  
  direccionParticular:{
    type: String
   },  
      
  password:{
    type: String,
    required: true
   },
  rol:{ 
    type: String,
    
  }  
    
})

const Usuario = model('Usuario', UsuarioSchema)

module.exports = { Usuario }