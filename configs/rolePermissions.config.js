import quiz from "../models/Quizzes.js";
import privateRooms from "../models/PrivateRooms.js";

export const PERMISSIONS = {
    "superadmin": {
        "user": ["GET", "POST", "PUT", "DELETE"],
        "quiz": ["GET", "POST", "PUT", "DELETE"],
        "question": ["GET", "POST", "PUT", "DELETE"],
        "answer": ["GET", "POST", "PUT", "DELETE"],
        "attempts": ["GET", "POST", "PUT", "DELETE"],
        "room": ["GET", "POST", "PUT", "DELETE"],
        "roomPermission": ["GET", "POST", "PUT", "DELETE"],
        "roomQuiz": ["GET", "POST", "PUT", "DELETE"],
    },
    "admin": {
        "user": ["GET", "PUT"],
        "quiz": ["GET"],
        "question": ["GET"],
        "answer": ["GET"],
        "attempts": ["GET"],
        "room": ["GET"],
        "roomPermission": ["GET"],
        "roomQuiz": ["GET"],
    },
    "user": { }
};

export const ID_RESTRICTED_HANDLERS = { 
    "user": (req, res, next) => {
        return req.params.id == req.id;
    },
    "quiz": async(req, res, next) => {
        return await quiz.getById(req.params.id)
            .then(res => res["user_id"] == req.id)
            .catch(err => next(err));
    },
    "question": (req, res) => true, // coming soon
    "answer": (req, res) => true, // coming soon
    "room": (req, res) => true, // coming soon
    "roomPermission": async(req, res, next) => {
        return await privateRooms.getById(req.params.id)
            .then(res => res["user_id"] == req.id)
            .catch(err => next(err));
    },
    "roomQuiz": (req, res) => true, // coming soon
};