import model from "../models/Quizzes.js"
import utils from "./utils.js"

const FILLABLES = ["user_ID", "name", "duration"];

export default {
    index: async function(req, res) {
        await model.getAll()
            .then((result) => {
                return res.send({
                    msg: "Quiz data fetch success",
                    data: result
                });
            })
            .catch((err) => {
                next({ code: "sql_error", reason: err });
            });
    },

    getOne: async function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;

        await model.getById(req.params.id)
            .then((result) => {
                return res.send({
                    msg: "Quiz data fetch success",
                    data: result,
                });
            })
            .catch((err) => {
                next({ code: "sql_error", reason: err });
            });
    },

    store: async function(req, res) {
        const dataComplete = FILLABLES.every(key => req.body[key] != undefined)

        const dataTypeCorrect = (
            !isNaN(req.body["user_ID"])
            && !isNaN(req.body["duration"])
        )

        if( !(dataComplete && dataTypeCorrect) ) {
            const errorMsg = [];
            if(!dataComplete) {
                errorMsg.push("'user_ID', 'name', and 'duration' was not all provided");
            } 

            if(!dataTypeCorrect) {
                errorMsg.push("'user_ID' and 'duration' should be a number");
            }

            return res.status(400).send({msg: errorMsg});
        }

        const data = [FILLABLES, FILLABLES.map(key => req.body[key]) ]
        await model.store(data)
            .then((result) => {
                return res.send({ msg: `Quiz created with id ${result}` })
            })
            .catch((err) => {
                next({code: "sql_error", reason: err});
            });
    },

    edit: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), FILLABLES, res)) return;

        // Ignore when doesn't exist
        const durationTypeCorrect = (req.body["duration"] == undefined 
                            || !isNaN(req.body["duration"]));
        if( !durationTypeCorrect ) {
            return res.status(400).send({msg: "'duration' should be a number"});
        }

        await model.edit(req.params.id, req.body)
            .then((result) => {
                return res.send({msg: result});
            })
            .catch((err) => {
                next({ code: "sql_error", reason: err });
            })
    },

    destroy: async function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.destroy(req.params.id)
            .then((result) => {
                return res.send( { msg: result} )
            })
            .catch((err) => {
                next({ code: "sql_error", reason: err });
            });
    }
}