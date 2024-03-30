import model from "../models/quiz.model.js"

export default {
    index: function(req, res) {
        model.getAll(res);
    },

    getOne: function(req, res) {
        if(isNaN(req.params.id)) {
            res.status(400);
            res.send({ msg: "id should be a number" })
            return;
        }

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
        // Ignore when doesn't exist
        const dataTypeCorrect = (req.body["duration"] == undefined 
                            || !isNaN(req.body["duration"]));
        if( !dataTypeCorrect ) {
            const errorMsg = [];

            if(!dataTypeCorrect) { errorMsg.push("'duration' should be a number"); }

            res.status(400);
            res.send({msg: errorMsg});
            return;
        }

        model.edit(req.params.id, req.body, res);
    },

    destroy: function(req, res) {
        if(isNaN(req.params.id)) {
            res.status(400);
            res.send({ msg: "id should be a number" })
            return;
        }

        model.destroy(req.params.id, res);
    }
}