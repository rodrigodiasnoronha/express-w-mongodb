const { model, Schema } = require('mongoose');

const fornecedorSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = model('Fornecedor', fornecedorSchema);
