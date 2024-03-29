import model from "../models/user.model.js";

export default {
    index: function(req, res) {
        model.getAll(res);
    },

    getOne: function(req, res) {
        if(isNaN(req.params.id)) {
            res.status(400);
            res.send({
                status: -1,
                msg: "id should be a number"
            })
            return;
        }

        model.getById(req.params.id, res);
    },

    store: function(req, res) {
        if(req.body["name"] == undefined) {
            res.status(400);
            res.send({
                status: -1,
                msg: "No required data was given"
            })
            return;
        }

        model.store([req.body["name"]], res);
    },

    edit: function(req, res) {
        if(req.body["name"] == undefined) {
            res.send({
                status: 0,
                msg: "Nothing to do"
            });
            return;
        }

        model.edit(req.params.id, [req.body["name"]], res);
    },

    destroy: function(req, res) {
        if(isNaN(req.params.id)) {
            res.status(400);
            res.send({
                status: -1,
                msg: "id should be a number"
            })
            return;
        }

        model.destroy(req.params.id, res);
    }
}