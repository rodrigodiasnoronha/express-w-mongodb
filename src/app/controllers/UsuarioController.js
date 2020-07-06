const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class UsuarioController {
    async create(request, response) {
        const { email, password } = request.body;

        try {
            let user = await Usuario.findOne({ email });

            if (user) {
                return response
                    .status(400)
                    .json({ message: 'Email já cadastrado' });
            }

            // encriptar senha
            const passwordHash = bcryptjs.hashSync(password, 8);
            user = await Usuario.create({ email, password: passwordHash });

            // gerar token
            const token = sign(
                { id: user._id },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '10d' }
            );

            return response.status(201).json({ user, token });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async index(request, response) {
        try {
            const page = Number(request.query.page || 1);
            const limit = Number(request.query.limit || 25);
            const offset = page * limit - limit;

            const users = await Usuario.find({}).skip(offset).limit(limit);

            return response.json({ data: users, page, limit, offset });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            const user = await Usuario.findOne(id);

            if (!user) {
                return response
                    .status(404)
                    .json({ message: 'Usuário não encontrado' });
            }

            return response.json(user);
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async destroy(request, response) {
        try {
            const { id } = request.params;

            const user = await Usuario.findOne(id);

            if (!user) {
                return response
                    .status(404)
                    .json({ message: 'Usuário não encontrado' });
            }

            await user.delete();

            return response.status(202).json();
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }
}

module.exports = new UsuarioController();
