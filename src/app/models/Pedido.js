const { model, Schema } = require('mongoose');

const pedidoSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = model('Pedido', pedidoSchema);
