const connection = require('../config/db');

// Adicionar um marcador
async function addMarker(req, res) {
    const { latitude, longitude, estabelecimento, descricao } = req.body;

    const query = `
        INSERT INTO markers (latitude, longitude, estabelecimento, descricao) 
        VALUES (?, ?, ?, ?)
    `;
    const params = [latitude, longitude, estabelecimento, descricao];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Erro ao adicionar marcador', error: err });
        }
        res.status(201).json({ success: true, message: 'Marcador adicionado com sucesso!', data: results });
    });
}

// Listar todos os marcadores
async function listMarkers(req, res) {
    const query = 'SELECT * FROM markers ORDER BY created_at DESC';

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Erro ao buscar marcadores', error: err });
        }
        res.status(200).json({ success: true, data: results });
    });
}

// Remover um marcador
async function deleteMarker(req, res) {
    const { id } = req.params;

    const query = 'DELETE FROM markers WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Erro ao remover marcador', error: err });
        }
        res.status(200).json({ success: true, message: 'Marcador removido com sucesso!' });
    });
}

module.exports = { addMarker, listMarkers, deleteMarker };
