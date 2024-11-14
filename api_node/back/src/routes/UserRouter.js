const { Router } = require('express');
const { registerUser, updateUser } = require('../controllers/UserController');

const router = Router();

router.post('/user', registerUser);
router.put('/user', updateUser);

module.exports = router;
