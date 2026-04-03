const Joi = require('joi');

const projectSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 3 characters',
            'string.max': 'Title must not exceed 100 characters'
        }),
    
    description: Joi.string()
        .min(10)
        .max(1000)
        .messages({
            'string.min': 'Description must be at least 10 characters'
        }),
    
    capital: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'Capital must be a positive number'
        }),
    
    status: Joi.string()
        .valid('open', 'closed')
        .default('open')
        .messages({
            'any.only': 'Status must be either "open" or "closed"'
        }),
    
    maxInvestment: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'Max investment must be a positive number'
        }),
    
    curentAmount: Joi.number()
        .min(0)
        .messages({
            'number.min': 'Current amount cannot be negative'
        }),
    
    investWith: Joi.number()
        .min(0)
        .messages({
            'number.min': 'Investment amount cannot be negative'
        })
});

module.exports = projectSchema;