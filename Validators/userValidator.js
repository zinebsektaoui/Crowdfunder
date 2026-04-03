const Joi = require("joi")

const userSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Le nom doit contenir au moins 3 caractères',
        'string.max': 'Le nom ne peut pas dépasser 20 caractères',
        'any.required': 'Le nom est requis'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Format d\'email invalide',
        'any.required': 'L\'email est requis'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
        'any.required': 'Le mot de passe est requis'
    }),
    role: Joi.string().valid("Admin", "Project Owner", "Investor").default('user'),
    balance: Joi.number().positive().messages({
        'number.positive': 'Le solde doit être un nombre positif'
    })
    
})


module.exports = userSchema;