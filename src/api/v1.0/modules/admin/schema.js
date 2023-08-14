const Joi = require("joi");

const signupSchema = Joi.object().keys({
    name: Joi.string()
        .min(3)
        .trim()
        .required(),
    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .trim()
        .required(),
    confirm_password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .trim()
        .required(),
    
});

const loginSchema = Joi.object().keys({
    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .trim()
        .required()
});

module.exports = {
    signupSchema,
    loginSchema
};