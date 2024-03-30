import model from "../models/Questions.js";
import utils from "./utils.js"

export default {
    index: function(req, res) {
        model.getAll(res);
    },

    getOne: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        model.getById(req.params.id, res);
    },

    store: function(req, res) {
        const dataComplete = (
            req.body["quiz_ID"] != undefined
            && req.body["text"] != undefined
            && req.body["point"] != undefined
        )

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

            res.status(400);
            res.send({msg: errorMsg});
            return;
        }

        const data = [
            ["quiz_ID", "text", "point"],
            [req.body["quiz_ID"], req.body["text"], req.body["point"]]
        ]
        model.store(data, res);
    },

    edit: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), ["point", "text"], res)) return;

        // Ignore when doesn't exist
        const pointTypeCorrect = (req.body["point"] == undefined 
                            || !isNaN(req.body["point"]));
        if( !pointTypeCorrect ) {
            res.status(400);
            res.send({msg: "'point' should be a number"});
            return;
        }

        model.edit(req.params.id, req.body, res);
    },

    destroy: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        model.destroy(req.params.id);
    }
}