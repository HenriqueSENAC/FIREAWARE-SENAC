const { Router } = require('express');

const router = Router();

const { registerUser } = require('../controllers/UserController'); // Certifique-se de que o caminho esteja correto

router.post('/user', registerUser); // Associe a rota '/user' com a função registerUser

/**
 * @swagger
 * /task/:id:
 *   put:
 *     summary: Atualiza uma tarefa pelo id
 *     responses:
 *       200:
 *         description: Uma lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

module.exports = router;
