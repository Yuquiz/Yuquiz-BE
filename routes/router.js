import express from "express";

import user from "./user.route.js";
import quiz from "./quiz.route.js";
import question from "./question.route.js";
import answerChoice from "./answerChoice.route.js";
import attempt from "./attempt.route.js";
import auth from "./auth.route.js";
import privateRoom from "./privateRoom.route.js";
import roomPermission from "./roomPermission.route.js";
import roomQuiz from "./roomQuiz.route.js";
import app from "./app.route.js";

import jwtAuthWare from "../middlewares/jwtAuth.js";

const ROUTER = express.Router();
ROUTER.use("/user", jwtAuthWare, user);
ROUTER.use("/quiz", jwtAuthWare, quiz);
ROUTER.use("/question", jwtAuthWare, question);
ROUTER.use("/answer", jwtAuthWare, answerChoice);
ROUTER.use("/attempt", jwtAuthWare, attempt);
ROUTER.use("/room", jwtAuthWare, privateRoom);
ROUTER.use("/roomPermission", jwtAuthWare, roomPermission);
ROUTER.use("/roomQuiz", jwtAuthWare, roomQuiz);

ROUTER.use("/", (req, res) => res.send({msg: "Welcome to Quizin!"}));
ROUTER.use("/auth", auth);
ROUTER.use("/app", app);

export default ROUTER;

