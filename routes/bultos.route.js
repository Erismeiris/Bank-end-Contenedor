
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos} = require('../middlewares/validar-campos')
const { getBultos, crearBultos, actualizarBultos, borrarBultos} = require('../controllers/bultos.controller');




const router = Router();


router.get('/', getBultos);

router.post('/',
[
    validarJWT,
    check('contenedor', 'El ID del contenedor debe ser in MongoDB ID').isMongoId(),
    validarCampos

], crearBultos);


router.put('/:id', actualizarBultos);


router.delete('/:id', borrarBultos)












module.exports =  router
