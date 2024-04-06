import dotenv from "dotenv";
dotenv.config();

const ERRORS = {
    "auth_reject": {
        code: 401,
        message: "Provided credentials is not valid"
    },
    "bad_request": {
        code: 400,
        message: "Your request contains something not accepted by server"
    },
    "not_found": {
        code: 404,
        message: "Requested resource doesn't exist in server"
    },
    "sql_error": {
        code: 500,
        message: "An error has occured during server database operation"
    },
    "token_missing_or_invalid": {
        code: 403,
        message: "You need a valid token to access this resource" 
    },
};

export default function errorHandler(err, req, res, next) {
    const caughtError = ERRORS[err.code]
    if(caughtError === undefined) {
        return res.status(500).send({
            message: "An unknown error has occured"
        })
    }

    return res.status(caughtError.code).send({
        message: caughtError.message,
        reason: (process.env.NODE_ENV == "DEVEL"? err.reason: "[DISCLOSED]")
    })
}