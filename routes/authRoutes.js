const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');

const authValidation = require('../middleware/authValidation');

router.post("/login", [authValidation.loginValidation], authController.login);

router.post("/signup", [authValidation.signupValidation], authController.signup);

module.exports = router;
