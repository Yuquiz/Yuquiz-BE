import express from "express";
import controller from "../controllers/roomQuiz.controller.js"
import roleAccessWare from "../middlewares/roleAccess.js";
import roomQuizAccessWare from "../middlewares/roomQuizAccess.js";
const ROUTER = express.Router();

ROUTER.get("/", roleAccessWare, controller.index); // Get all
ROUTER.get("/:id", [roleAccessWare, roomQuizAccessWare], controller.getOne); // Get with id
ROUTER.post("/", roleAccessWare, controller.store); // Create something
ROUTER.put("/:id", [roleAccessWare, roomQuizAccessWare], controller.edit); // Update with id
ROUTER.delete("/:id", [roleAccessWare, roomQuizAccessWare], controller.destroy); // Delete with id

export default ROUTER;