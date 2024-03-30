import model from "../models/Users.js";
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
        if(req.body["name"] == undefined) {
            res.status(400);
            res.send({ msg: "No required data was given" })
            return;
        }

        model.store([req.body["name"]], res);
    },

    edit: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        if (utils.isBodyEmpty(req.body, res)) return;
        if (utils.hasUnexpectedKey(Object.keys(req.body), ["name"], res)) return;

        if(req.body["name"] == undefined) {
            res.status(400);
            res.send({ msg: "No required data was given" })
            return;
        }

        model.edit(req.params.id, req.body, res);
    },

    destroy: function(req, res) {
        if (utils.isInvalidID(req.params.id, res)) return;
        model.destroy(req.params.id, res);
    }
}