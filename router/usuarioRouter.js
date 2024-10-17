const express =  require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');



router.post('/', usuarioController.comprobarUsuario);

module.exports = router;
