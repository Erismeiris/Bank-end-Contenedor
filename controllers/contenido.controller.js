const { response } = require('express');
const Contenido = require('../models/contenido.model');


const getContenido = async( req, res = response) => {
    const contenido = await Contenido.find()
                                    .populate('usuario','nombre')
                                    .populate('bulto', 'nombre')
                                    
    res.json({
        ok:true,
        contenido
    })

}

const crearContenido = async( req, res = response) =>{
     const uid = req.uid;
     
     const contenido = new Contenido({usuario:uid, ...req.body})

try {
    const contenidoDB = await contenido.save()
    res.json({
        ok: true,
        contenido: contenidoDB
    })
    
} catch (error) {
    return res.status(400).json({
        ok: false,
        msg: 'Contacte con el administrador'
    })
    
}

}

const actualizarContenido = async ( req, res = response) => {
 const uid = req.params.id;

 try {
    const contenidoDB = await Contenido.findById(uid);
    if(!contenidoDB){
        return res.status(404).json({
            ok:false,
            msg: 'No se encontró nungún contenido con ese ID'
        })
    }
    const campos = req.body;
    const contenidoActualizado = await Contenido.findByIdAndUpdate(uid, campos, { new: true})
    res.json({
        ok: true,
        contenidoDB: contenidoActualizado
    })


 } catch (error) {
    return res.status(400).json({
        ok: false,
        msg: 'Contacte con el administrador'
    })
    
 }

   
}

const borrarContenido = async (req, res = response) =>{
    const uid = req.params.id;
    
    try {
        const contenido =  await Contenido.findById(uid);
        if(!contenido){
            return res.status(404).json({
                ok: true,
                msg: 'No se encontró ningún contenido con ese ID'
            })
        }
        await Contenido.findByIdAndDelete(uid)
        
        res.json({
            ok:true,
            msg: 'Borrado con éxito'
        })
        
    } catch (error) {

        return res.status(400).json({
            of: false,
            msg: 'Contacte con el administrador'
        })
        
    }
}




module.exports = {
    getContenido, crearContenido, actualizarContenido, borrarContenido
}