import express from "express";
import user from "./user.route.js";
import quiz from "./quiz.route.js";
import question from "./question.route.js";
import answerChoice from "./answerChoice.route.js";
import leaderboard from "./leaderboard.route.js";
import attempt from "./attempt.route.js";
import auth from "./auth.route.js";

const ROUTER = express.Router();
ROUTER.use("/user", user);
ROUTER.use("/quiz", quiz);
ROUTER.use("/question", question);
ROUTER.use("/answer", answerChoice);
ROUTER.use("/auth", auth);
ROUTER.use("/leaderboard", leaderboard);
ROUTER.use("/attempt", attempt);

export default ROUTER;

