import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authJWT(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if(token === undefined) {
        return res.status(401).send({msg: "No token provided in request"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
        if(err) {
            return res.status(500).send({msg: err})
        }

        console.log(decodedData);
    })

    next();
}