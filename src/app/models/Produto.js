const { model, Schema } = require('mongoose');

const produtoSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, default: 0 },
        owner: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    },
    { timestamps: true }
);

module.exports = model('Produto', produtoSchema);
