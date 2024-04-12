import express from "express";
import controller from "../controllers/auth.controller.js"
const ROUTER = express.Router();

ROUTER.post("/register", controller.register);
ROUTER.post("/login", controller.login);

export default ROUTER;