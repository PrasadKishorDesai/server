const express = require("express");
const {Router} = express;
const router = new Router();

const authController = require("./controller");
const schema = require("./schema");
const validateSchema = require("../../../../middlewares/validation.middleware");

router.route("/login").post(validateSchema(schema.loginSchema), authController.login);

router.route("/signup").post(validateSchema(schema.signupSchema), authController.signup);

module.exports = router;