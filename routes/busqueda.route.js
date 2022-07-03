
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos} = require('../middlewares/validar-campos')
const { getTodos} = require('../controllers/busqueda.controller');




const router = Router();


router.get('/:busqueda',validarJWT, getTodos);













module.exports =  router
