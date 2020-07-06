const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    createUserValidator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),

    loginValidator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),

    createProductValidator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
        }),
    }),

    createFornecedorValidator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
        }),
    }),

    createPedidoValidator: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
        }),
    }),
};
