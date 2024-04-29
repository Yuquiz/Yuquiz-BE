import express from "express";
import controller from "../controllers/privateRoom.controller.js"
import roleAccessWare from "../middlewares/roleAccess.js"
import roomAccessWare from "../middlewares/privateRoomAccess.js";
const ROUTER = express.Router();

ROUTER.get("/", [roleAccessWare, roomAccessWare], controller.index); // Get all
ROUTER.get("/:id", [roleAccessWare, roomAccessWare], controller.getOne); // Get with id
ROUTER.post("/", roleAccessWare, controller.store); // Create something
ROUTER.put("/:id", [roleAccessWare, roomAccessWare], controller.edit); // Update with id
ROUTER.delete("/:id", [roleAccessWare, roomAccessWare], controller.destroy); // Delete with id

export default ROUTER;