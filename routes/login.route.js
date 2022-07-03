
/* 
path: "/api/login"
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { login, renewToken }= require('../controllers/login.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')



router.post('/',
            [
             check('email', 'El email es obligatorio').isEmail(),
             check('password', 'El password es obligatorio').not().isEmpty(),
             validarCampos  
            ],
login
)

router.get('/renew', validarJWT, renewToken);





module.exports = router;