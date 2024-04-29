import express from "express";
import controller from "../controllers/answerChoice.controller.js";
import roleAccessWare from "../middlewares/roleAccess.js";
const ROUTER = express.Router();

ROUTER.get("/", roleAccessWare, controller.index); // Get all
ROUTER.get("/:id", roleAccessWare, controller.getOne); // Get with id
ROUTER.post("/", roleAccessWare, controller.store); // Create something
ROUTER.put("/:id", roleAccessWare, controller.edit); // Update with id
ROUTER.delete("/:id", roleAccessWare, controller.destroy); // Delete with id

export default ROUTER;