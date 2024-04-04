import express from "express";
import controller from "../controllers/auth.controller.js"
const ROUTER = express.Router();

ROUTER.post("/", controller.login);

export default ROUTER;