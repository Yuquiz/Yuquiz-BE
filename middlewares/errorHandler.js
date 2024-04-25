import dotenv from "dotenv";
dotenv.config();

import ERRORS from "../configs/errors.config.js";

export default function errorHandler(err, req, res, next) {
    if(err.code == undefined || err.code == "internal_error") { // for internal errors
        return res.status(500).send({
            message: ERRORS["internal_error"].message,
            reason: (process.env.NODE_ENV == "DEVEL"? err: "[DISCLOSED]")
        })
    } 

    const {code, message} = ERRORS[err.code];
    return res.status(code).send({
        message: message,
        reason: (process.env.NODE_ENV == "DEVEL"? err.message: "[DISCLOSED]")
    })
}