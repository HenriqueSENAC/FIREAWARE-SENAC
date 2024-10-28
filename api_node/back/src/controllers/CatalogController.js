const connection = require('../config/db')
const dotenv = require('dotenv').config();

const fs = require('fs');
const { connect } = require('http2');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');

if(!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

async function storeCatalog(request, response) {

    if(!request.files) {
        return response.status(400).json({
            success: false,
            message: "Arquivo de foto não enviado"
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if(erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo."
            })
        }

        const params = Array(
            request.body.item_name,
            request.body.item_description,
            request.body.item_link,
            imagemNome
        )
    
        const query = "INSERT INTO catalog(item_name, item_description, item_link, item_img) VALUES(?, ?, ?, ?)";

        connection.query(query, params, (err, results) => {
            if(results) {
                response.status(200).json({
                    success: true,
                    message: "Success!",
                    data: results
                })
            } else {
                response.status(400).json({
                    success: false,
                    message: "Error",
                    sql: err
                })
            }
        })

    });

}

async function getCatalog(request, response) {
    const query = "SELECT * FROM catalog order by id";

    connection.query(query, (err, results ) => {
        if(results) {
            response.status(200).json({
                success: true,
                message: "Success!",
                data: results
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Erro!",
                sql: err
            })
        }
    })
    
}


module.exports = {
    storeCatalog,
    getCatalog
};