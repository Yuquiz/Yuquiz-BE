import express from "express";
import controller from "../controllers/attempt.controller.js"
const ROUTER = express.Router();

ROUTER.get("/", controller.index); // Get all
ROUTER.get("/quiz/:id", controller.user); // Get users who did the quiz with id
ROUTER.get("/user/:id", controller.quiz); // Get quiz which was done by user with id
ROUTER.get("/:id", controller.getOne); // Get with id
ROUTER.post("/", controller.store); // Create something
ROUTER.put("/:id", controller.edit); // Update with id
ROUTER.delete("/:id", controller.destroy); // Delete with id

export default ROUTER;