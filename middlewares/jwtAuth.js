import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authJWT(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if(token === undefined) {
        return next({code: "token_missing_or_invalid", message: "No token provided"})
    }

    const err = jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
        if(err) return err
        req.id = decodedData.id;
        req.role = decodedData.role;
    })
    if(err) return next({code: "token_missing_or_invalid", message: err})

    next();
}