import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import Users from "../models/Users.js";

export default {
    login: async function(req, res) {
        const {username, password} = req.body;

        const userID = await Users.getIDByUsername(username)
            .then(result => result.id )
            .catch((result) => {
                switch(result[0]) {
                    case "sql_err": res.status(500); break;
                    case "inv_cred": res.status(403); break;
                }

                return res.send({ msg: `Login failed: ${result[1]}` })
            });

        await Users.getById(userID)
            .then(async(result) => {
                if(await bcrypt.compare(password, result.password)) {
                    jwt.sign(
                        { id: userID, }, 
                        process.env.JWT_SECRET,
                        { expiresIn: 60*5 },
                        (err, token) => {
                            if(err) {
                                return res.status(500).send({
                                    msg: "Error during token generation"
                                })
                            }

                            return res.send({
                                msg: `Hello user${result.id}!`,
                                authorization: token
                            })
                        }
                    );
                } else {
                    return res.status(403).send({
                        msg: "Wrong password"
                    })
                }
            })
            .catch(err => res.status(500).send({ msg: err }));
    }
}