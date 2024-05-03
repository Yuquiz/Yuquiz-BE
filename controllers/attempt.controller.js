import model from "../models/Attempts.js";

const FILLABLES = ["user_id", "quiz_id", "score"];

export default {
    index: async function(req, res, next) {
        await model.getAll()
            .then(result => res.send({
                msg: "Attempt fetch success",
                data: result
            }))
            .catch(err => next(err));
    },

    getOne: async function(req, res, next) {
        await model.getById(req.params.id)
            .then(result => res.send({
                msg: "Attempt fetch success",
                data: result
            }))
            .catch(err => next(err));
    },

    store: async function(req, res, next) {
        Object.keys(req.body).forEach((key) => {
            if(!FILLABLES.includes(key)) {delete req.body[key]}
        })

        if(Object.keys(req.body).length != FILLABLES.length) {
            return next({code: "insufficient_data", reason: "No data to process"})
        }

        const data = [ FILLABLES, FILLABLES.map(key => req.body[key])]
        await model.store(data)
            .then(result => res.send({ msg: `Attempt created with id:${result}` }))
            .catch(err => next(err));
    },

    edit: async function(req, res, next) {
        Object.keys(req.body).forEach((key) => {
            if(!FILLABLES.includes(key)) {delete req.body[key]}
        })

        if(Object.keys(req.body).length == 0) {
            return next({code: "insufficient_data", reason: "No data to process"})
        }

        await model.edit(req.params.id, req.body)
            .then(result => res.send({ msg: result }))
            .catch(err => next(err));
    },

    destroy: async function(req, res, next) {
        await model.destroy(req.params.id)
            .then(result => res.send({ msg: result }))
            .catch(err => next(err));
    },

    user: async function(req, res, next) {
        await model.users(req.params.id)
            .then(result => res.send({
                msg: "User attempts on this quiz fetch success",
                data: result
            }))
            .catch(err => next(err));
    },

    quiz: async function(req, res, next) {
        await model.quizzes(req.params.id)
            .then(result => res.send({
                msg: "User quiz scores fetch success",
                data: result
            }))
            .catch(err => next(err));
    },
}