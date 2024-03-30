import db from "./db.js";

export default {
    getAll: function(res) {
        db.query("SELECT * FROM AnswerChoices", [], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            }

            res.send({
                msg: "AnswerChoice data fetch success",
                data: result
            });
        });
    },

    getById: function(id, res) {
        db.query("SELECT * FROM AnswerChoices WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "AnswerChoice data fetch success",
                data: result
            });
        });
    },

    store: function(data, res) {
        db.query("INSERT INTO AnswerChoices(??) VALUES (?)", data, (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "AnswerChoice created",
                id: result.insertId,
            });
        });
    },

    edit: function(id, newData, res) {
        db.query("UPDATE AnswerChoices SET ? WHERE id=?", [newData, id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({ 
                msg: (result.affectedRows > 0?  `Updated questionChoice with id:${id}`: "Nothing to update")
            });
        })
    },

    destroy: function(id, res) {
        db.query("DELETE FROM AnswerChoices WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: (result.affectedRows > 0?  `Deleted answerChoice with id:${id}`: "Nothing to delete"),
            });
        });
    }
}
