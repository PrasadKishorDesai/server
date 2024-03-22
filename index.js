import express from "express";
import studentRoutes from "./student/routes.js";
import authRoutes from "./admin/routes.js";
const { Router } = express;
const router = new Router();

router.route("/health").get((req, res) => {
    res.send("route is healthy");
});

router.use("/api", studentRoutes);

router.use("/auth", authRoutes);

export default router;
