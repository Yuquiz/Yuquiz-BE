import bcrypt from "bcrypt";
import model from "../models/Users.js";

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
        req.body["password"] = await hashPassword(req.body["password"]);
        const data = [ FILLABLES, FILLABLES.map(key => req.body[key])]
        await model.store(data)
            .then(result => res.send({ msg: `User created with id:${result}` }))
            .catch(err => next(err));
    },

    edit: async function(req, res, next) {
        Object.keys(req.body).forEach((key) => {
            if(!FILLABLES.includes(key)) {delete req.body[key]}
        })

        if(Object.keys(req.body).length == 0) {
            return next({code: "insufficient_data", reason: "No data to process"})
        }

        if(req.body["password"] != undefined) {
            req.body["password"] = await hashPassword(newPass);
        }

        await model.edit(req.params.id, req.body)
            .then(result => res.send({msg: result}))
            .catch(err =>  next(err));
    },

    destroy: async function(req, res, next) {
        await model.destroy(req.params.id)
            .then(result => res.send({msg: result}))
            .catch(err => next(err));
    }
}