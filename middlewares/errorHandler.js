import dotenv from "dotenv";
dotenv.config();

import ERRORS from "../configs/errors.config.js";

export default function errorHandler(err, req, res, next) {
    err.code = err.code == undefined? "internal_error": err.code;
    const {code, message: displayMessage} = ERRORS[err.code];
    return res.status(code).send({
        message: displayMessage,
        reason: (process.env.NODE_ENV == "DEVEL"? err.message: "[DISCLOSED]")
    })
}