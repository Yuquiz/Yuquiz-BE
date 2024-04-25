import express from "express";
import leaderboard from "../controllers/leaderboard.controller.js"
const ROUTER = express.Router();

ROUTER.get("/leaderboard/:id", leaderboard.index); // id is quizId
ROUTER.get("/dashboard/:id", leaderboard.index); // Get with id
ROUTER.get("/profile/:id", leaderboard.index); // Get with id

export default ROUTER;