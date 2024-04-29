import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import Users from "../models/Users.js";

const FILLABLES = ["name", "username", "password"];
function generateToken(userInfo, onError, onSuccess) {
    jwt.sign(
        userInfo, 
        process.env.JWT_SECRET,
        { expiresIn: 60*30 },
        (err, token) => {
            if(err) { return onError({code: "internal_error", message: err.message}) }

            onSuccess(token);
        }
    );
}

export default {
    register: async function(req, res, next) {
        Users.getByUsername(req.body["username"])
            .then(_ => next({code: "username_used", message: "Username already taken"}))
            .catch(err => {
                if(err.code != "invalid_credentials") { return next(err) }

                bcrypt.hash(req.body["password"], 10, (err, hashed) => {
                    if(err) { return next({code: "internal_error", message: err.message}) }

                    req.body["password"] = hashed
                    const newUserData = [FILLABLES, FILLABLES.map(key => req.body[key])];

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
                    if(err) { return next({code: "internal_error", message: err.message}) }

                    if(!isMatched) { return next({code: "invalid_credentials", message: "Wrong password"}) }

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