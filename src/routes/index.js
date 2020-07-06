const { Router } = require('express');
const usuariosRoutes = require('./usuario.routes');
const produtosRoutes = require('./produto.routes');
const authRoutes = require('./auth.routes');
const fornecedorRoutes = require('./fornecedor.routes');
const pedidoRoutes = require('./pedido.routes');

const routes = Router();

routes.use('/usuarios', usuariosRoutes);
routes.use('/produtos', produtosRoutes);
routes.use('/fornecedores', fornecedorRoutes);
routes.use('/pedidos', pedidoRoutes);
routes.use('/login', authRoutes);

module.exports = routes;
