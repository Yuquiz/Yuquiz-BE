import express from "express";
import controller from "../controllers/user.controller.js"
import authJWT from "../middlewares/authJWT.js";
const ROUTER = express.Router();

ROUTER.post("/", controller.store); // Create something
ROUTER.get("/", authJWT, controller.index); // Get all
ROUTER.get("/:id", authJWT, controller.getOne); // Get with id
ROUTER.put("/:id", authJWT, controller.edit); // Update with id
ROUTER.delete("/:id", authJWT, controller.destroy); // Delete with id

export default ROUTER;