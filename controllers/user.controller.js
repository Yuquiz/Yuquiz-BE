import model from "../models/user.model.js";

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
        if(req.body["name"] == undefined) {
            res.status(400);
            res.send({ msg: "No required data was given" })
            return;
        }

        model.store([req.body["name"]], res);
    },

    edit: function(req, res) {
        if(req.body["name"] == undefined) {
            res.status(400);
            res.send({ msg: "No required data was given" })
            return;
        }

        model.edit(req.params.id, [req.body["name"]], res);
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