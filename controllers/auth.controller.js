import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import Users from "../models/Users.js";

function generateToken(userInfo, callback) {
    jwt.sign(
        userInfo, 
        process.env.JWT_SECRET,
        { expiresIn: 60*10 },
        (err, token) => {
            if(err) {
                return res.status(500).send({
                    msg: "Error during token generation"
                })
            }

            callback(token);
        }
    );
}

export default {
    register: async function(req, res, next) {
        await Users.getByUsername(req.body["username"])
            .then(_ => res.status(400).send({msg: "Username is already taken"}))
            .catch(err => {
                if(err[0] != "inv_cred") {
                    switch(err[0]) {
                        case "sql_err": res.status(500); break;
                    }

                    return res.send({ msg: `Login failed: ${err[1]}` })
                }

                bcrypt.hash(req.body["password"], 10, (err, hashed) => {
                    if(err) { return res.status(500).send({ msg: err }) }

                    const newUserData = ["name", "username"].map(key => req.body[key]);
                    newUserData.push(hashed);
                    Users.store(newUserData)
                        .then(storeId => generateToken( { id: storeId, role: "user" }, 
                                        (token) => {
                                            return res.send({
                                                msg: `Account registered. Hello ${req.body["username"]} (U#${storeId})!`,
                                                authorization: token 
                                            })
                                        }
                        ))
                        .catch(err => res.status(500).send({ msg: err }))
                    return;
                })
            });
    },

    login: async function(req, res, next) {
        const {username: givenUsername, password: givenPassword} = req.body;

        await Users.getByUsername(givenUsername)
            .then(result => {
                const {id, username, password, role} = result[0];
                bcrypt.compare(givenPassword, password, (err, isMatched) => {
                    if(err) { return res.status(500).send({ msg: err }) }

                    if(!isMatched) {
                        return res.status(403).send({
                            msg: "Wrong password"
                        })
                    }

                    generateToken({ id: id, role: role }, (token) => res.send({
                            msg: `Hello ${username} (U#${id})!`,
                            authorization: token
                        }
                    ))
                })
            })
            .catch((err) => {
                switch(err[0]) {
                    case "sql_err": res.status(500); break;
                    case "inv_cred": res.status(403); break;
                }

                return res.send({ msg: `Login failed: ${err[1]}` })
            });
        }
}