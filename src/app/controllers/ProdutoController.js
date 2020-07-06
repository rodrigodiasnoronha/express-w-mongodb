const Produto = require('../models/Produto');

class ProdutoController {
    async create(request, response) {
        const { name, price } = request.body;

        try {
            const product = await Produto.create({
                name,
                price,
                owner: request.id,
            });

            return response.status(201).json(product);
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

            const products = await Produto.find({})
                .skip(offset)
                .limit(limit)
                .populate('owner');

            return response.json({ data: products, page, limit, offset });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            const product = await Produto.findById(id);

            if (!product) {
                return response
                    .status(404)
                    .json({ message: 'Produto não encontrado' });
            }

            await product.populate('owner');

            return response.json({ product });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params;

            const product = await Produto.findById(id);

            if (!product) {
                return response
                    .status(404)
                    .json({ message: 'Produto não encontrado' });
            }

            await product.update({ ...request.body });
            await product.populate('owner');

            return response.json({ product });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async destroy(request, response) {
        try {
            const { id } = request.params;

            const product = await Produto.findById(id);

            if (!product) {
                return response
                    .status(404)
                    .json({ message: 'Produto não encontrado' });
            }

            await product.delete();

            return response.status(204).json();
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }
}

module.exports = new ProdutoController();
