const { Router } = require('express');
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');
const ProdutoController = require('../app/controllers/ProdutoController');
const { createProductValidator } = require('../app/validators');

const routes = Router();

routes
    .route('/')
    .all(AuthMiddleware.autenticado)
    .post(createProductValidator, ProdutoController.create)
    .get(ProdutoController.index);

routes
    .route('/:id')
    .get(ProdutoController.show)
    .put(
        AuthMiddleware.autenticado,
        createProductValidator,
        ProdutoController.update
    )
    .delete(AuthMiddleware.autenticado, ProdutoController.destroy);

module.exports = routes;
