const { verify } = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class AuthMiddleware {
    async autenticado(request, response, next) {
        const { authorization } = request.headers;

        if (!authorization) {
            return response.status(401).json({ message: 'Não autorizado' });
        }

        const [, token] = authorization.split(' ');

        if (!token) {
            return response
                .status(401)
                .json({ message: 'Token não encontrado' });
        }

        try {
            const payload = verify(token, process.env.JWT_SECRET || 'secret');

            const user = await Usuario.findById(payload.id);

            if (!user) {
                return response
                    .status(404)
                    .json({ message: 'Usuário logado não encontrado' });
            }
            request.id = user._id;

            return next();
        } catch (err) {
            return response.status(401).json({ message: 'token inválido' });
        }
    }
}

module.exports = new AuthMiddleware();
