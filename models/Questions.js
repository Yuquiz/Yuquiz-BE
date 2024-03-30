import db from "./db.js";

export default {
    getAll: function(res) {
        db.query("SELECT * FROM Questions", [], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            }

            res.send({
                msg: "Question data fetch success",
                data: result
            });
        });
    },

    getById: function(id, res) {
        db.query("SELECT * FROM Questions WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "Question data fetch success",
                data: result
            });
        });
    },

    store: function(data, res) {
        db.query("INSERT INTO Questions(??) VALUES (?)", data, (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "Question created",
                id: result.insertId,
            });
        });
    },

    edit: function(id, newData, res) {
        db.query("UPDATE Questions SET ? WHERE id=?", [newData, id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({ 
                msg: (result.affectedRows > 0?  `Updated question with id:${id}`: "Nothing to update")
            });
        })
    },

    destroy: function(id, res) {
        db.query("DELETE FROM Questions WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: (result.affectedRows > 0?  `Deleted question with id:${id}`: "Nothing to delete"),
            });
        });
    }
}