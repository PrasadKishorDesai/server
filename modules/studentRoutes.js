const express = require('express');

const router = express.Router();

const api = require('./studentController');

// to add validation login using express-validator
// and also have to add validation result
// 422 => validation failed

router.get("/students", api.getAllStudents);

router.get("/students/:id", api.getStudentById);

router.post("/students", api.addStudent);

router.patch("/students/:id", api.updateStudentById);

router.delete("/students/:id", api.deleteStudentById);


module.exports = router;