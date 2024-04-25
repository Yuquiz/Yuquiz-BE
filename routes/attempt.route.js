import express from "express";
import controller from "../controllers/attempt.controller.js"
import roleAccessWare from "../middlewares/roleAccess.js";
const ROUTER = express.Router();

ROUTER.get("/", roleAccessWare, controller.index); // Get all
ROUTER.get("/quiz/:id", roleAccessWare, controller.user); // Get users who did the quiz with id
ROUTER.get("/user/:id", roleAccessWare, controller.quiz); // Get quiz which was done by user with id
ROUTER.get("/:id", roleAccessWare, controller.getOne); // Get with id
ROUTER.post("/", roleAccessWare, controller.store); // Create something
ROUTER.put("/:id", roleAccessWare, controller.edit); // Update with id
ROUTER.delete("/:id", roleAccessWare, controller.destroy); // Delete with id

export default ROUTER;