const { Router } = require('express');

const router = Router();

const { registerUser } = require('../controllers/UserController'); // Certifique-se de que o caminho esteja correto

router.post('/user', registerUser); // Associe a rota '/user' com a função registerUser

module.exports = router;
