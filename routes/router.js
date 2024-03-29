import express from "express";
import user from "./user.route.js";
import quiz from "./quiz.route.js";
import question from "./question.route.js";
import questionChoice from "./questionChoice.route.js";
import answer from "./answer.route.js";

const ROUTER = express.Router();
ROUTER.use("/user", user);
ROUTER.use("/quiz", quiz);
ROUTER.use("/question", question);
ROUTER.use("/qchoice", questionChoice);

export default ROUTER;

