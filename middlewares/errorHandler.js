import dotenv from "dotenv";
dotenv.config();

import ERRORS from "../configs/errors.config.js";

export default function errorHandler(err, req, res, next) {
    if(err.code == undefined) { // Errors that aren't passed next
        return res.status(500).send({
            message: ERRORS["unknown"].message,
            reason: (process.env.NODE_ENV == "DEVEL"? err.message: "[DISCLOSED]")
        })
    } 

    const {code, message} = ERRORS[err.code];
    return res.status(code).send({
        message: message,
        reason: (process.env.NODE_ENV == "DEVEL"? err.reason: "[DISCLOSED]")
    })
}