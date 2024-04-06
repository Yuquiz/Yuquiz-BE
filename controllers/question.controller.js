import model from "../models/Questions.js";
import utils from "./utils.js"

const FILLABLES = ["quiz_ID", "text", "point"];

export default {
    index: async function(req, res) {
        await model.getAll()
            .then((result) => {
                return res.send({
                    msg: "Question fetch success",
                    data: result
                })
            })
            .catch((err) => {
                return res.status(500).send({msg: err})
            });
    },

    getOne: async function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        await model.getById(req.params.id)
            .then((result) => {
                return res.send({
                    msg: "Question fetch success",
                    data: result
                })
            })
            .catch((err) => {
                return res.status(500).send({msg: err})
            });
    },

    store: async function(req, res) {
        const dataComplete = FILLABLES.every(key => req.body[key] != undefined)

        const dataTypeCorrect = (
            !isNaN(req.body["quiz_ID"])
            && !isNaN(req.body["point"])
        )

        if( !(dataComplete && dataTypeCorrect) ) {
            const errorMsg = [];
            if(!dataComplete) {
                errorMsg.push("'quiz_ID', 'text', and 'point' was not all provided");
            } 

            if(!dataTypeCorrect) {
                errorMsg.push("'quiz_ID' and 'point' should be a number");
            }

            return res.status(400).send({msg: errorMsg});
        }

        const data = [ FILLABLES, FILLABLES.map(key => req.body[key])]
        await model.store(data)
            .then((result) => {
                return res.send({ msg: `Question created with id:${result}` })
            })
            .catch((err) => {
                return res.status(500).send({msg: err})
            });
    },

    edit: async function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), FILLABLES, res)) return;

        // Ignore when doesn't exist
        const pointTypeCorrect = (req.body["point"] == undefined 
                            || !isNaN(req.body["point"]));
        if( !pointTypeCorrect ) {
            return res.status(400).send({msg: "'point' should be a number"});
        }

        await model.edit(req.params.id, req.body)
            .then((result) => {
                return res.send({ msg: result })
            })
            .catch((err) => {
                return res.status(500).send({msg: err})
            });
    },

    destroy: async function(req, res) {
        if (utils.isInvalidID(req.params.id)) return;
        await model.destroy(req.params.id)
            .then((result) => {
                return res.send({ msg: result })
            })
            .catch((err) => {
                return res.status(500).send({msg: err})
            });
    }
}