const express = require('express');

const router = express.Router();

const api = require('../controller/studentController');
const { isAuth } = require('../middleware/isAuth');


// to add validation login using express-validator
// and also have to add validation result
// 422 => validation failed

router.get("/students", isAuth, api.getAllStudents);

router.get("/students/:id", isAuth, api.getStudentById);

router.post("/students", isAuth, api.addStudent);

router.patch("/students/:id", isAuth, api.updateStudentById);

router.delete("/students/:id", isAuth, api.deleteStudentById);


module.exports = router;