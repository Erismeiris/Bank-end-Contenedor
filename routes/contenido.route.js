
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos} = require('../middlewares/validar-campos')
const { getContenido, crearContenido, actualizarContenido, borrarContenido} = require('../controllers/contenido.controller');




const router = Router();


router.get('/', getContenido);

router.post('/',
[
    validarJWT,
    check('bulto', 'El ID del bulto debe ser in MongoDB ID').isMongoId(),
    validarCampos

], crearContenido);


router.put('/:id', actualizarContenido);


router.delete('/:id', borrarContenido)


module.exports =  router
