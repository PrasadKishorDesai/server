const express = require('express');

const router = express.Router();

const api = require('./studentController');

router.get("/students", api.getAllStudents);

router.get("/students/:id", api.getStudentById);

router.post("/students", api.addStudent);

router.patch("/students/:id", api.updateStudentById);

router.delete("/students/:id", api.deleteStudentById);


module.exports = router;