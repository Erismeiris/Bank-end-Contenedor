const {Usuario} = require('../models/usuario.model')
const incryptarPassword = require('bcryptjs')

const { response } = require('express')
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find()
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body 

     try {
        const existeEmail = await Usuario.findOne({email});  

        //comprobar si existe ese email en la base de datos
        if( existeEmail){ 
            return res.status(400).json({
                ok: false,
                msg: "El correo ya existe"
            })
        }
        const usuario = new Usuario(req.body)

         //Encryptar la contraseña
         const salt = incryptarPassword.genSaltSync()
         usuario.password = incryptarPassword.hashSync(password, salt)

         
         
         //Guardar el usuario
         await usuario.save();
         
         // generar el JWT

         const token = await generarJWT( usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado...., revisa logs"
        })
    }

}


const actualizarUsuario = async(req, res = response) =>{
    
    const uid = req.params.id

    try {
        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB){
            return res.status(404).json({
                ok:true,
                msg: "No existe un usuario con ese id"
            })
        }
        const campos = req.body;

        if( usuarioDB.email === req.body.email){
            delete campos.email
        }else{
            const existeEmail = await Usuario.findOne({ email: req.body.email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }

        }
        delete campos.rol;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true})


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg: 'Contacte con el administrador'
        })
        
    }
}


const eliminarUsuario = async(req, res = response) =>{

    const uid = req.params.id

    try {

        const usuarioDb = await Usuario.findById(uid)

        if(!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese ID'
            })
        } 

        await Usuario.findByIdAndDelete(uid)
        
        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente',
            
        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Contacte con el administrador"
        })
        
    }


}




module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}