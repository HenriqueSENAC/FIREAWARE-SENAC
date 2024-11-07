// Módulo de configuração da webapi, módulo de aplicação

// Importar o pacote express (servidor) | gerencaidor de api's  
// Responsável por lidar com requisições externas
// Controla os caminhos das informações enviadas
// Gerencia os arquivos do computador 
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


const fileupload = require('express-fileupload');

// Ajuda a fazer upload de arquivos a partir do express

// Importar as rotas para serem executadas na aplicação
const CatalogRouter = require('./routes/CatalogRouter');
const loginRouter = require('./routes/loginRouter');
const UserRouter = require('./routes/UserRouter');
// Importar o pacote dotenv, gerenciador de variáveis de ambiente
const dotenv = require('dotenv').config();
// Instanciar o express na variável app
const app = express();

// Setar a porta do servidor, a parir do arquivo .env
// Habilitar o recebimento de requests em formato JSON
// Habilitar o recebimento de requests em formato JSON
app.set('port', process.env.PORT || 3005);
app.use(express.json());
app.use(cors());
app.use(fileupload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Habilitar as rotas na aplicação
app.use('/api/auth', loginRouter);
app.use('/api', CatalogRouter);
app.use('/api/store', UserRouter);  

module.exports = app;
