const { Router } = require('express');
const PedidoController = require('../app/controllers/PedidoController');
const { createPedidoValidator } = require('../app/validators');

const routes = Router();

routes
    .route('/')
    .post(createPedidoValidator, PedidoController.create)
    .get(PedidoController.index);

routes.route('/:id').get(PedidoController.show);

module.exports = routes;
