import dotenv from "dotenv";
dotenv.config();

import ERRORS from "../configs/errors.config.js";

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