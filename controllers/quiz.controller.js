import model from "../models/Quizzes.js"
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
            req.body["user_ID"] != undefined
            && req.body["name"] != undefined
            && req.body["duration"] != undefined
        )

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

            res.status(400);
            res.send({msg: errorMsg});
            return;
        }

        const data = [
            ["user_ID", "name", "duration"],
            [req.body["user_ID"], req.body["name"], req.body["duration"]]
        ]
        model.store(data, res);
    },

    edit: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;

        if(Object.keys(req.body).length == 0) {
            res.status(400);
            res.send({ msg: "no data passed for this endpoint to work on" })
            return;
        }

        const isAllKeyValid = Object.keys(req.body)
                    .reduce((stillValid, key) => (
                                stillValid 
                                && ["duration", "name"].includes(key)
                            ), true
                    );
        if(!isAllKeyValid) {
            res.status(400);
            res.send({msg:"this endpoint only expects `duration` and `name"});
            return
        }

        // Ignore when doesn't exist
        const durationTypeCorrect = (req.body["duration"] == undefined 
                            || !isNaN(req.body["duration"]));
        if( !durationTypeCorrect ) {
            res.status(400);
            res.send({msg: "'duration' should be a number"});
            return;
        }

        model.edit(req.params.id, req.body, res);
    },

    destroy: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        model.destroy(req.params.id, res);
    }
}