const Usuario = require('../models/Usuario');
const { compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthController {
    async login(request, response) {
        const { email, password } = request.body;

        try {
            const user = await Usuario.findOne({ email });

            if (!user) {
                return response
                    .status(404)
                    .json({ message: 'Usuário não encontrado' });
            }

            const senhaCerta = compareSync(password, user.password);
            if (!senhaCerta) {
                return response
                    .status(400)
                    .json({ message: 'Senha incorreta' });
            }

            //    gerar token
            const token = sign(
                { id: user._id },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '10d' }
            );

            return response.json({ token, user });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }
}

module.exports = new AuthController();
