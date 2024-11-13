const express = require('express');
const cors = require('cors');
require('dotenv').config()
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3005" }],
    },
    apis: [`${__dirname}/routes/*.js`], //caminho para rotas
};

const app = express()
const port = process.env.PORT || 1903
const CatalogRouter = require('./routes/CatalogRouter');
const LoginRouter = require('./routes/loginRouter');
const UserRouter = require('./routes/UserRouter');
const SwaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocs))
app.use(express.json())
app.use(cors())
app.use('/api', CatalogRouter, LoginRouter, UserRouter)


// const app = require('./app');
// const port = app.get('port');

app.listen(port, () => console.log(`ta rodando no port ${port}!`));

