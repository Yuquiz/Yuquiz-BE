import express from "express";
import leaderboard from "../controllers/leaderboard.controller.js"
import dashboard from "../controllers/dashboard.controller.js"
import profile from "../controllers/profile.controller.js"

import jwtAuthWare from "../middlewares/jwtAuth.js";
const ROUTER = express.Router();

ROUTER.get("/leaderboard/:id", leaderboard.index); // id is quizId
ROUTER.get("/dashboard", jwtAuthWare, dashboard.index);
ROUTER.get("/profile", jwtAuthWare, profile.index);

export default ROUTER;