import express from "express";
import controller from "../controllers/user.controller.js"
import authJWT from "../middlewares/authJWT.js";
const ROUTER = express.Router();

ROUTER.use(authJWT);
ROUTER.get("/", controller.index); // Get all
ROUTER.get("/:id", controller.getOne); // Get with id
ROUTER.post("/", controller.store); // Create something
ROUTER.put("/:id", controller.edit); // Update with id
ROUTER.delete("/:id", controller.destroy); // Delete with id

export default ROUTER;