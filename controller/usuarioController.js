const baseDatos = require('../conexion/db');

const usuarioController = {
    comprobarUsuario(req,res){

        let {usuario} = req.body;
        let contra = req.body.contrasena;
         // Verificar si los campos están vacíos
         if (!usuario || !contra) {
            return res.status(400).json({ mensajeError: 'Usuario o contraseña no pueden estar vacíos' });
        }

        // Consulta a la base de datos
        baseDatos.query('SELECT * FROM usuarios WHERE nombre = ? AND contrasena = ? ',[usuario, contra], (error,resultados)=>{
            if (error) {
                console.log(error);
                return res.status(500).json({ mensajeError: 'Error del servidor' });
            }       
            if (resultados.length ===  0) {
                res.json({mensajeError : 'Usuario no encontrado'}).status(401);             
            }else{
                res.json(resultados[0]).status(200)
            }

        })
    }
}
module.exports = usuarioController;