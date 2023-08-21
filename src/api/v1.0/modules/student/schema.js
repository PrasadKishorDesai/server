import Joi from "joi";

export const schema = Joi.object({
    first_name: Joi.string()
        .min(3)
        .trim()
        .required(),
    last_name: Joi.string()
        .min(3)
        .trim()
        .required(),
    date_of_birth: Joi.date()
        .max("now")
        .required(),
    blood_group: Joi.string()
        .min(2)
        .max(3)
        .trim()
        .required(),
    gender: Joi.string()
        .trim()
        .min(4)
        .max(6)
        .trim()
        .required(),
    phone_number: Joi.string()
        .min(12)
        .max(12)
        .required(),
    country_code: Joi.string()
        .min(1)
        .trim()
        .required()
});
