// controllers/UserController.js
const db = require('../config/db');
const { connect } = require('../routes/UserRouter');

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


const updateUser = (req, res) => {
    const { email, senha } = req.body;

    // Certifique-se de ter uma condição WHERE que identifique o usuário único
    const query = 'UPDATE cadastro SET email = ?, senha = ? WHERE id = ?';
    
    // Aqui, você precisará passar o ID do usuário como parâmetro
    const userId = req.userId; // Suponha que o ID do usuário esteja em req.userId

    db.query(query, [email, senha, userId], (error, result) => {
        if (error) {
            console.error('Erro ao atualizar perfil:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao atualizar o perfil',
                data: error
            });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                data: { email, senha }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado ou sem alterações',
                data: null
            });
        }
    });
};

module.exports = { registerUser, updateUser };