import bcrypt from "bcrypt";
import model from "../models/Users.js";
import utils from "./utils.js"

const FILLABLES = ["name", "username", "password"];

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {reject("")}
            resolve(hash);
        })
    })
}

export default {
    index: async function(req, res, next) {
        await model.getAll()
            .then((result) => {
                return res.send({
                    msg: "User data fetch success",
                    data: result
                });
            })
            .catch(err => next(err));
    },

    getOne: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.getById(req.params.id)
            .then((result) => {
                return res.send({
                    msg: "User data fetch success",
                    data: result,
                });
            })
            .catch(err => next(err));
    },

    store: async function(req, res, next) {
        const dataComplete = FILLABLES.every(key => req.body[key] != undefined)
        if(!dataComplete) {
            return next({code: "insufficient_data", reason: "No data needs to be inserted"})
        }

        req.body["password"] = await hashPassword(req.body["password"]);
        await model.store(FILLABLES.map(key => req.body[key]))
            .then(result => res.send({ msg: `User created with id ${result}`}))
            .catch(err => next(err) );
    },

    edit: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), FILLABLES, res)) return;

        const hasChangeData = FILLABLES.some(key => req.body[key] != undefined)
        if(!hasChangeData) {
            return next({code: "insufficient_data", reason: "No data needs to be changed"})
        }

        const newPass = req.body["password"]
        if(newPass != undefined) {
            req.body["password"] = await hashPassword(newPass);
        }

        await model.edit(req.params.id, req.body)
            .then(result => res.send({msg: result}))
            .catch(err =>  next(err));
    },

    destroy: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.destroy(req.params.id)
            .then(result => res.send({msg: result}))
            .catch(err => next(err));
    }
}