
const {Router} = require('express')
const { check } = require('express-validator') 
const {getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios.controller')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()


router.get('/', validarJWT, getUsuarios)


router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ci', "El número de identidad es obligatorio").not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('rol', "El rol es obligatorio").not().isEmpty(),
    validarCampos,
],
crearUsuario)


router.put('/:id', 
[   validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', "El email es obligatorio").isEmail(),
    validarCampos,

],
 actualizarUsuario)

router.delete('/:id',validarJWT, eliminarUsuario)








module.exports = router
