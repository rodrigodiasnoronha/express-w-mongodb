const { Router } = require('express');
const { loginValidator } = require('../app/validators');
const AuthController = require('../app/controllers/AuthController');

const routes = Router();

routes.route('/').post(loginValidator, AuthController.login);

module.exports = routes;
