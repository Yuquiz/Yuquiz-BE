import express from "express";
import controller from "../controllers/quiz.controller.js";
import roleAccessWare from "../middlewares/roleAccess.js";
import quizAccessWare from "../middlewares/quizAccess.js";
const ROUTER = express.Router();

ROUTER.get("/", roleAccessWare, controller.index); // Get all
ROUTER.get("/:id", [roleAccessWare, quizAccessWare], controller.getOne); // Get with id
ROUTER.post("/", roleAccessWare, controller.store); // Create something
ROUTER.put("/:id", [roleAccessWare, quizAccessWare], controller.edit); // Update with id
ROUTER.delete("/:id", [roleAccessWare, quizAccessWare], controller.destroy); // Delete with id

export default ROUTER;