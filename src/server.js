require('dotenv/config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const server = express();

/**
 *
 * Middlewares e rotas
 *
 */
server.use(express.json());
server.use(cors());
server.use(routes);
server.use(errors());

/**
 *
 * Database
 *
 */

mongoose.connect(
    `mongodb+srv://admin:root@cluster0-8ak9k.mongodb.net/web?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
