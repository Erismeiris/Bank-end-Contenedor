const { response } = require('express');
const { Usuario } = require('../models/usuario.model');
const { Contenedor } = require('../models/container.model');
const Bulto  = require('../models/bultos.model');




const getTodos = async( req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    //Para buscar de forma sincrona en todas las colecciones usando una Promise

    const [usuarios, contenedor, bulto] = await Promise.all([
        Usuario.find({nombre:regex}),
        Contenedor.find({nombre:regex}),
        Bulto.find({nombre:regex})

    ])


  
    res.json({
        ok:true,
        usuarios,
        contenedor,
        bulto
    })

}




module.exports = {
    getTodos
}