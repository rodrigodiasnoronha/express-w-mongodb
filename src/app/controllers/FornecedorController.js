const Fornecedor = require('../models/Fornecedor');

class FornecedorController {
    async create(request, response) {
        const { name } = request.body;

        try {
            const fornecedor = await Fornecedor.create({ name });

            return response.status(201).json(fornecedor);
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

            const fornecedores = await Fornecedor.find({})
                .skip(offset)
                .limit(limit);

            return response.json({ data: fornecedores, page, limit, offset });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            const fornecedor = await Fornecedor.findById(id);

            if (!fornecedor) {
                return response
                    .status(404)
                    .json({ message: 'Fornecedor não encontrado' });
            }

            return response.json({ fornecedor });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;

            const fornecedor = await Fornecedor.findById(id);

            if (!fornecedor) {
                return response
                    .status(404)
                    .json({ message: 'Fornecedor não encontrado' });
            }

            await fornecedor.update({ ...request.body });

            return response.json({ fornecedor });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async destroy(request, response) {
        try {
            const { id } = request.params;

            const fornecedor = await Fornecedor.findById(id);

            if (!fornecedor) {
                return response
                    .status(404)
                    .json({ message: 'Fornecedor não encontrado' });
            }

            await fornecedor.delete();

            return response.status(204).json();
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }
}

module.exports = new FornecedorController();
