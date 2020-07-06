const { Router } = require('express');
const FornecedorController = require('../app/controllers/FornecedorController');
const { createFornecedorValidator } = require('../app/validators');

const routes = Router();

routes
    .route('/')
    .post(createFornecedorValidator, FornecedorController.create)
    .get(FornecedorController.index);

routes
    .route('/:id')
    .get(FornecedorController.show)
    .put(createFornecedorValidator, FornecedorController.update)
    .delete(FornecedorController.destroy);

module.exports = routes;
