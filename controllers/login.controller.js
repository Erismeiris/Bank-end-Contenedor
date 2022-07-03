const { response } = require('express');
const { Usuario } = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró usuario con ese email'
            })
        }

        //Verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        //Generar un token
        const token = await generarJWT(usuarioDB.id);
        const id = usuarioDB.id

        res.json({
            ok: true,
            token,
            id

        })


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })

    }

}

const renewToken = async(req, res = response)=>{

    const uid = req.uid

     // Generar un TOKEN - JWT
     const token = await generarJWT(uid);

     //Obtner el usuario por UID

     const usuarioDB = await Usuario.findById(uid);


    res.json({
        ok: true,
        token,
        usuarioDB
    })

 }

module.exports = {
    login,
    renewToken
}