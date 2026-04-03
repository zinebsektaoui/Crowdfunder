const Joi = require('joi');

const investSchema = Joi.object({
    investWith: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'Investment amount must be a positive number',
            'any.required': 'Investment amount is required'
        })
});

module.exports = investSchema;