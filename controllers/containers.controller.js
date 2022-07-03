const { response } = require('express');
const {Contenedor} = require('../models/container.model');


const getContainers = async( req, res = response) => {
        
const contenedores = await Contenedor.find();
          
                                   
    res.json({
        ok:true,
        contenedores
    })

}

const crearContainer = async( req, res = response) =>{

    const uid = req.uid;
    const contenedor = new Contenedor({creadoPor:uid, ...req.body});
   
    try {
        const contenedorDB = await contenedor.save();
       
      
        res.json({
            ok: true,
           contenedor: contenedorDB           
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
        
    }

}

const actualizarContainer = async ( req, res = response) => {

    const uid = req.params.id;

    try {

        const contenedor = await Contenedor.findById(uid);

        if(!contenedor){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un contenedor con ese Id'
            })
        }

        const campos = req.body;
        const contenedorActualizado = await Contenedor.findByIdAndUpdate(uid, campos, {new:true})
        res.json({
            ok: true,
            contenedor: contenedorActualizado
        })
        
    } catch (error) {

        return res.status(400).json({
            ok:false,
            msg: 'Contacte al administrador'
        })
        
    }
}

const borrarContainer = async (req, res = response) =>{

    const uid = req.params.id;
    
    try {

        const contenedorDB = await Contenedor.findById(uid);
        if(!contenedorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe contenedor con ese ID'
            })
        }

        await Contenedor.findByIdAndDelete(uid)

        res.json({
            ok:true,
            msg: 'Contenedor eliminado correctamente'
        })
        
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: "Contacte al administrador"
        })
        
    }

}




module.exports = {
    getContainers,
    crearContainer, 
    actualizarContainer, 
    borrarContainer
}