import express from "express";
const { Router } = express;
const router = new Router();

import * as authController from "./controller.js";
import * as schema from "./schema.js";
import { validateSchema } from "../../../../middlewares/validation.middleware.js";

router.route("/login").post(validateSchema(schema.loginSchema), authController.login);

router.route("/signup").post(validateSchema(schema.signupSchema), authController.signup);

export default router;