const { Router } = require('express');
const { addMarker, listMarkers, deleteMarker } = require('../controllers/MarkerController');

const router = Router();

router.post('/markers', addMarker); // Adicionar marcador
router.get('/markers', listMarkers); // Listar marcadores
router.delete('/markers/:id', deleteMarker); // Remover marcador por ID

module.exports = router;
