export default {
    index: function(req, res) {
        res.send("Get all");
    },

    getOne: function(req, res) {
        res.send(`Get ${req.params.id}`);
    },

    store: function(req, res) {
        res.send(`Store`);
    },

    edit: function(req, res) {
        res.send(`Edit ${req.params.id}`);
    },

    destroy: function(req, res) {
        res.send(`Delete ${req.params.id}`);
    }
}