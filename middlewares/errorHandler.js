import dotenv from "dotenv";
dotenv.config();

import ERRORS from "../configs/errors.config.js";

export default function errorHandler(err, req, res, next) {
    const {code, message} = ERRORS[err.code]
    return res.status(code).send({
        message: message,
        reason: (process.env.NODE_ENV == "DEVEL"? err.reason: "[DISCLOSED]")
    })
}