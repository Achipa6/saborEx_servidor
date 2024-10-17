const express = require('express');
const restauranteController = require('../controller/restaurantesController');

const router = express.Router();


// Ruta para obtener todos los restaurantes
router.get('/', restauranteController.muestraRestaurntes);

// Ruta para obtener las reseñas filtradas por usuario
router.get('/usuarios/:usuario', restauranteController.traeMisReview); // (/:) es ruta dinamica, es a la que se le pasa una variable 

// Ruta para crear nuevas reseñas
router.post('/', restauranteController.nuevaResena);

// Ruta para coger un restaurante
router.get('/querestaurantever/:id', restauranteController.buscarUnRestaurante);

// Ruta para editar reseñas
router.put('/querestaurantever/:id', restauranteController.editarresena);

//Ruta para borrar reseñas
router.delete('/:id',restauranteController.borrarResena)

//Ruta para filtrar por puntuación
router.get('/filtrar/:puntuacion', restauranteController.filtrarResena)

//Ruta para filtrar por ubicación
router.get('/filtrar/ubicacion/:ubicacion', restauranteController.filtrarResenaUbicacion)


module.exports = router;