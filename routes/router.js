import express from "express";
import user from "./user.route.js";
import quiz from "./quiz.route.js";
import question from "./question.route.js";
import answerChoice from "./answerChoice.route.js";

const ROUTER = express.Router();
ROUTER.use("/user", user);
ROUTER.use("/quiz", quiz);
ROUTER.use("/question", question);
ROUTER.use("/answer", answerChoice);

export default ROUTER;

