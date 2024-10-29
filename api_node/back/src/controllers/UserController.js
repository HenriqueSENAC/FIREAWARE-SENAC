// controllers/UserController.js
const connection = require('../config/db')

const registerUser = (req, res) => {
    const { email, senha, cel } = req.body;

    if (!email || !senha || !cel) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    // Query para inserir o usuário na tabela 'cadastro'
    const query = 'INSERT INTO cadastro (email, senha, cel) VALUES (?, ?, ?)';
    db.query(query, [email, senha, cel], (err, result) => {
        if (err) {
            console.error("Erro ao inserir o usuário no banco:", err);
            return res.status(500).send('Erro ao cadastrar');
        }
        res.status(201).send('Usuário cadastrado com sucesso!');
    });
};

module.exports = { registerUser };
