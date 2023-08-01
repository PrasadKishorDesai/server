const { body, check } = require("express-validator");

const signupValidation = [
    body('email', "Please enter a valid email/password")
        .trim()
        .isEmail()
        .normalizeEmail()
        .notEmpty(),
    body('password', "Please enter a valid email/password")
        .trim()
        .isLength({ min: 6 })
        .notEmpty(),
    body('confirmPassword')
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords are not matching!!!");
            }
            return true;
        }),
    check('name', 'Please enter name atleast 3 chars')
        .trim()
        .notEmpty()
        .isLength({ min: 3 }),
    
    (req, res, next) => {
        next();
    }
]

const loginValidation = [
    body('email', "Please enter a valid email/password")
        .trim()
        .isEmail()
        .normalizeEmail()
        .notEmpty(),
    body('password', "Please enter a valid email/password")
        .trim()
        .isLength({ min: 6 })
        .notEmpty(),

    (req, res, next) => {
        next();
    }
]

module.exports = {
    signupValidation,
    loginValidation
}
