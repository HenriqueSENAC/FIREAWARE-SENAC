// Módulo de configuração da webapi, módulo de aplicação

// Importar pacotes necessários
const express = require('express');
const cors = require('cors');
const path = require('path');
const fileupload = require('express-fileupload'); // Ajuda a fazer upload de arquivos a partir do express
const dotenv = require('dotenv').config(); // Variáveis de ambiente

// Importar as rotas para serem executadas na aplicação
const CatalogRouter = require('./routes/CatalogRouter');
const loginRouter = require('./routes/loginRouter');
const UserRouter = require('./routes/UserRouter');

// Instanciar o express na variável app
const app = express();

// Configurações da aplicação
app.set('port', process.env.PORT || 3005); // Porta do servidor
app.use(express.json()); // Middleware para parsear JSON
app.use(cors()); // Habilitar CORS
app.use(fileupload()); // Habilitar upload de arquivos

// Configuração para servir arquivos estáticos na pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Habilitar as rotas na aplicação
app.use('/api/auth', loginRouter);
app.use('/api', CatalogRouter);
app.use('/api/store', UserRouter);  // Prefixo da rota para os usuários

module.exports = app;
