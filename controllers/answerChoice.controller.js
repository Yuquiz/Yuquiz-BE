import model from "../models/AnswerChoices.js";
import utils from "./utils.js"

const FILLABLES = ["question_ID", "text", "isCorrect"];

export default {
    index: async function(req, res, next) {
        await model.getAll()
            .then((result) => {
                return res.send({
                    msg: "AnswerChoice fetch success",
                    data: result
                })
            })
            .catch((err) => {
                next({code: "sql_error", reason: err})
            });
    },

    getOne: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.getById(req.params.id)
            .then((result) => {
                return res.send({
                    msg: "AnswerChoice fetch success",
                    data: result
                })
            })
            .catch((err) => {
                next({code: "sql_error", reason: err})
            });
    },

    store: async function(req, res, next) {
        const dataComplete = FILLABLES.every(key => req.body[key] != undefined)

        const dataTypeCorrect = (
            !isNaN(req.body["question_ID"])
            && (!isNaN(req.body["isCorrect"]) && (
                    Number(req.body["isCorrect"]) < 2 
                    && Number(req.body["isCorrect"]) > -1
                    )
                )
        )

        if( !(dataComplete && dataTypeCorrect) ) {
            const errorMsg = [];
            if(!dataComplete) {
                errorMsg.push("'question_ID', 'text', and 'isCorrect' was not all provided");
            } 

            if(!dataTypeCorrect) {
                errorMsg.push("'question_ID' and should be a number and 'isCorrect` should be either 0 or 1");
            }

            return res.status(400).send({msg: errorMsg});
        }

        const data = [FILLABLES, FILLABLES.map(key => req.body[key]) ]
        await model.store(data)
            .then((result) => {
                return res.send({ msg: `AnswerChoice created with id:${result}` })
            })
            .catch((err) => {
                next({code: "sql_error", reason: err})
            });
    },

    edit: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), FILLABLES, res)) return;

        // Ignore when doesn't exist
        const isCorrectTypeCorrect = (req.body["isCorrect"] == undefined 
                            || (!isNaN(req.body["isCorrect"]) && (
                                        Number(req.body["isCorrect"]) < 2 
                                        && Number(req.body["isCorrect"]) > -1
                                    )
                                )
        );
        if( !isCorrectTypeCorrect ) {
            return res.status(400).send({msg: "'isCorrect' should be either 0 or 1"});
        }

        await model.edit(req.params.id, req.body)
            .then((result) => {
                return res.send({ msg: result })
            })
            .catch((err) => {
                next({code: "sql_error", reason: err})
            });
    },

    destroy: async function(req, res, next) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.destroy(req.params.id)
            .then((result) => {
                return res.send({ msg: result })
            })
            .catch((err) => {
                next({code: "sql_error", reason: err})
            });
    }
}