import express from "express";
const { Router } = express;
const router = new Router();

import { isAuth } from "../../../../middlewares/index.js";
import * as api from "./controller.js";
import { schema } from "./schema.js";
import { validateSchema } from "../../../../middlewares/index.js";

router.route("/students").get(isAuth, api.getAllStudents);

router.route("/students/:id").get(isAuth, api.getStudentById);

router.route("/students").post(validateSchema(schema), isAuth, api.addStudent);

router.route("/students/:id").patch(isAuth, api.updateStudentById);

router.route("/students/:id").delete(isAuth, api.deleteStudentById);

export default router;