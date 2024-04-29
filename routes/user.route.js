import express from "express";
import controller from "../controllers/user.controller.js"
import roleAccessWare from "../middlewares/roleAccess.js";
import userAccessWare from "../middlewares/userAccess.js";
const ROUTER = express.Router();

ROUTER.get("/", roleAccessWare, controller.index); // Get all
ROUTER.get("/:id", [roleAccessWare, userAccessWare], controller.getOne); // Get with id
ROUTER.post("/", roleAccessWare, controller.store); // Create something
ROUTER.put("/:id", [roleAccessWare, userAccessWare], controller.edit); // Update with id
ROUTER.delete("/:id", [roleAccessWare, userAccessWare], controller.destroy); // Delete with id

export default ROUTER;