const Pedido = require('../models/Pedido');

class PedidoController {
    async create(request, response) {
        try {
            const { name, price, quantity } = request.body;

            const pedido = await Pedido.create({ name, price, quantity });
            return response.status(201).json({ pedido });
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

            const pedidos = await Pedido.find({}).skip(offset).limit(limit);

            return response.json({ data: pedidos, page, limit, offset });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }

    async show(request, response) {
        try {
            const { id } = request.params;

            const pedido = await Pedido.findById(id);

            if (!pedido) {
                return response
                    .status(404)
                    .json({ message: 'Pedido não encontrado' });
            }

            return response.json({ pedido });
        } catch (err) {
            return response
                .status(500)
                .json({ message: 'internal server error' });
        }
    }
}

module.exports = new PedidoController();
