import quiz from "../models/Quizzes.js";

export default async function quizAccess(req, res, next) {
    let hasPermission = req.role != "user" // Admin and superadmin bypasses ownership verification
    if(!hasPermission) {
        hasPermission = await quiz.getById(req.params.id)
            .then(result => (
                ( // Public quiz is free to be viewed by all
                    result["visibility"] == "public"
                    && req.method == "GET"  
                ) 
                || result["user_id"] == req.id // Is this the owner?
            )).catch(err => next(err));
    }

    if(!hasPermission) return next({
        code: "no_private_access", 
        message: "This quiz iz private. Please access them via `/roomQuiz`"
    })
    next()
}