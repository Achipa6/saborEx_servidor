const BaseDatos = require('../conexion/db');

const restauranteController = {
    // Método para mostrar todos los restaurantes
    muestraRestaurntes(req,res){

        BaseDatos.query('SELECT * FROM restaurantes',(err,resultados)=>{
            if (err) {
                console.log(err);
            }

            res.json(resultados).status(200)
        })

    },
    // Método para obtener reseñas filtradas por usuario
    traeMisReview(req, res){
        const usuario = req.params.usuario; // Obtener el usuario de los parámetros de la URL
        const query = 'SELECT * FROM restaurantes WHERE usu_review = ?'; 
    
        BaseDatos.query(query, [usuario], (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).send('Error al obtener las reseñas del usuario');
            }
            res.json(results); // Devuelve las reseñas encontradas
        })
    },
     // Método para insertar una nueva reseña
    nuevaResena(req, res) {
        let { nombre, review, puntuacion, ubicacion, usu_review } = req.body;
                //  valida que los datos enviados en la solicitud contengan todos los campos
   /* Este fragmento de código está realizando una comprobación de validación para garantizar que todos los campos obligatorios
(`nombre`, `review`, `puntuacion`, `ubicacion`, `usu_review`) estén presentes en el cuerpo de la solicitud.
Si falta alguno de estos campos (se evalúa como falso), devolverá una respuesta con un
código de estado de 400 (solicitud incorrecta) y un objeto JSON que contiene un mensaje de error que indica que
todos los campos son obligatorios. Esto ayuda a garantizar la integridad de los datos y a garantizar que se proporcione la
información necesaria antes de continuar con la inserción de una nueva revisión en la
base de datos. */
        if (!nombre || !review || !puntuacion || !ubicacion || !usu_review) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const query = 'INSERT INTO restaurantes (nombre, review, puntuacion, ubicacion, usu_review) VALUES (?, ?, ?, ?, ?)';
        
    
        BaseDatos.query(query, [nombre, review, puntuacion, ubicacion, usu_review], (err, resultado) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error al insertar datos de reseña');
            }
            res.status(200).json({ insercion: 'BienInsertada' });
        });
    },
    buscarUnRestaurante(req,res){
        let {id} = req.params;
        console.log(id)
        BaseDatos.query('SELECT * FROM restaurantes WHERE id_restaurante =?',[id],(error,resultado)=>{
            if (error) {
                res.json({error: 'Error en la consulta'}).status(500)
            }
            if (resultado.length === 0) {
                return res.status(404).json({ mensaje: 'Restaurante no encontrado' });
            }
            res.json(resultado[0]).status(200);
        });
    },   
    editarresena(req,res){
        let { id_restaurante, nombre, review, puntuacion, ubicacion } = req.body;

        if (!id_restaurante || !nombre || !review || !puntuacion || !ubicacion) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }
    
        BaseDatos.query('UPDATE restaurantes SET nombre = ?, review = ?, puntuacion = ?, ubicacion = ? WHERE id_restaurante = ?', 
        [nombre, review, puntuacion, ubicacion, id_restaurante], (error, resultados) => {
            if (error) {
                return res.status(500).json({ error: 'Error en la consulta' });
            }
            res.status(200).json({ mensaje: 'Reseña actualizada correctamente' });
        });
    },
    borrarResena(req,res){
        let {id} = req.params;
        BaseDatos.query('DELETE FROM restaurantes WHERE id_restaurante = ?',[id],(error,respuesta)=>{
            res.json({borrado: 'Borrado correcto' }).status(200);
        })
    },
    filtrarResena(req,res){
        let puntuacion = parseFloat(req.params.puntuacion);

        if (isNaN(puntuacion)) {
            return res.status(400).json({ error: 'Puntuación inválida' });
        }
        BaseDatos.query('SELECT * FROM restaurantes WHERE puntuacion >= ?',[puntuacion],(error,resultado)=>{
            if (error) {
                return res.status(500).json({ error: 'Error en la consulta' });
            }
            if (resultado.length === 0) {
                return res.status(404).json({ mensaje: 'No se encontraron restaurantes con esa puntuación' });
            }
            res.json(resultado).status(200)
        })
    },
    filtrarResenaUbicacion(req,res){
        let {ubicacion} = req.params;

        BaseDatos.query('SELECT * FROM restaurantes WHERE ubicacion LIKE ?',[ubicacion],(error,resultado)=>{ //LIKE para que la consulta sea más flexible ya que si hago una composicion estatica con = solo me da las coincidencias exactamente iguales
            if (error) {
                return res.status(500).json({ error: 'Error en la consulta' });
            }
            if (resultado.length === 0) {
                return res.status(404).json({ mensaje: 'No se encontraron restaurantes con esa puntuación' });
            }
            res.json(resultado).status(200)
        })
        
    }

}

module.exports = restauranteController;