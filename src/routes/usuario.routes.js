const { Router } = require('express');
const usuarioController = require('../app/controllers/UsuarioController');
const { createUserValidator } = require('../app/validators');

const routes = Router();

routes
    .route('/')
    .post(createUserValidator, usuarioController.create)
    .get(usuarioController.index);

routes
    .route('/:id')
    .delete(usuarioController.destroy)
    .get(usuarioController.show);

module.exports = routes;
