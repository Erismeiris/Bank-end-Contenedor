const { response } = require('express');
const Bulto = require('../models/bultos.model');


const getBultos = async( req, res = response) => {

    const bulto = await Bulto.find()
                            .populate('usuario', 'nombre')
                            .populate('contenedor', 'nombre')
    res.json({
        ok:true,
        bulto
    })

}

const crearBultos = async( req, res = response) =>{
     const uid = req.uid;
     
     const bultos = new Bulto({usuario:uid, ...req.body})


try {
    const bultoDB = await bultos.save()
    res.json({
        ok: true,
        msg: 'desde crearBultos',
        bultos: bultoDB
    })
    
} catch (error) {
    
}

}

const actualizarBultos = async ( req, res = response) => {

    const uid = req.params.id;

    try {

        const bultoDB = await Bulto.findById(uid);

        if(!bultoDB){
            return res.status(404).json({
                ok: true,
                msg: 'No existe Bulto con ese id'
            })
        }

        const campos = req.body;

        const bultoActualizado = await Bulto.findByIdAndUpdate(uid, campos, {new: true})
        res.json({
            ok: true,
            bultoDB: bultoActualizado
        })
        
    } catch (error) {

        return res.status(400).json({
            ok: true,
            msg: 'Contacte con el administrador'
        })
        
    }

}

const borrarBultos = async(req, res = response) =>{

    const uid = req.params.id;

     try {
        const bultoDB = await Bulto.findById(uid);

        if(!bultoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningún bulto con ese ID'
            })
        }

        await Bulto.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'El bulto se borró con éxito'
        })
        
    } catch (error) {

        return res.status(400).json({
            ok:false,
            msg: 'Contacte con el administrador'
        })
        
    }
}




module.exports = {
    getBultos, crearBultos, actualizarBultos, borrarBultos
}