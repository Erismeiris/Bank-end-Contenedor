
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos')
const { getContainers, crearContainer, actualizarContainer, borrarContainer} = require('../controllers/containers.controller');




const router = Router();


router.get('/',validarJWT,getContainers);

router.post('/',
[
    validarJWT,
    check('containerType', 'El tipo de contenedor es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

] , crearContainer);


router.put('/:id', actualizarContainer);


router.delete('/:id', borrarContainer)












module.exports =  router
