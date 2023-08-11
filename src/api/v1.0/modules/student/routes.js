const express = require('express');
const {Router} = express;
const router = new Router();

const { isAuth } = require('../../../../middlewares/isAuth.middleware');
const api = require('./controller');
const schema = require('./schema');
const validateSchema = require('../../../../middlewares/validation.middleware');

router.route("/students").get(isAuth, api.getAllStudents);

router.route("/students/:id").get(isAuth, api.getStudentById);

router.route("/students").post(validateSchema(schema), isAuth, api.addStudent);

router.route("/students/:id").patch(isAuth, api.updateStudentById);

router.route("/students/:id").delete(isAuth, api.deleteStudentById);

module.exports = router;