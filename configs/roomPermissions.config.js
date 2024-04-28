export const PERMISSIONS = {
    "owner":  {
        "room": ["GET", "POST", "PUT", "DELETE"],
        "roomQuiz": ["GET", "POST", "PUT", "DELETE"],
    },
    "participant":   {
        "room": ["GET", "POST", "PUT", "DELETE"],
        "roomQuiz": ["GET"],
    }

};