import express from "express";
import controller from "../controllers/leaderboard.controller.js"
const ROUTER = express.Router();

ROUTER.get("/:id", controller.index); // Get with id

export default ROUTER;