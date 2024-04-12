import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import Users from "../models/Users.js";

function generateToken(userInfo, onError, callback) {
    jwt.sign(
        userInfo, 
        process.env.JWT_SECRET,
        { expiresIn: 60*10 },
        (err, token) => {
            if(err) { return onError({code: "internal_error", msg: err}) }

            callback(token);
        }
    );
}

export default {
    register: async function(req, res, next) {
        Users.getByUsername(req.body["username"])
            .then(_ => next({code: "username_used", reason: "Username already taken"}))
            .catch(err => {
                if(err.code != "invalid_credentials") { return next(err) }

                bcrypt.hash(req.body["password"], 10, (err, hashed) => {
                    if(err) { return next({code: "internal_error", reason: err}) }

                    const newUserData = ["name", "username"].map(key => req.body[key]);
                    newUserData.push(hashed);
                    Users.store(newUserData)
                        .then(storeId => generateToken( 
                            { id: storeId, role: "user" }, next,
                            (token) => {
                                return res.send({
                                    msg: `Account registered. Hello ${req.body["username"]} (U#${storeId})!`,
                                    authorization: token 
                                })
                            }
                        ))
                        .catch(err => next(err))
                })
            });
    },

    login: async function(req, res, next) {
        const {username: givenUsername, password: givenPassword} = req.body;

        Users.getByUsername(givenUsername)
            .then(result => {
                const {id, username, password, role} = result[0];
                bcrypt.compare(givenPassword, password, (err, isMatched) => {
                    if(err) { return next({code: "internal_error", reason: err}) }

                    if(!isMatched) { return next({code: "invalid_credentials", reason: "Wrong password"}) }

                    generateToken({ id: id, role: role }, next,(token) => res.send({
                            msg: `Hello ${username} (U#${id})!`,
                            authorization: token
                        }
                    ))
                })
            })
            .catch(err => next(err))
        }
}