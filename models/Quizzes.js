import db from "./db.js";

export default {
    getAll: function(res) {
        db.query("SELECT * FROM Quizzes", [], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            }

            res.send({
                msg: "Quiz data fetch success",
                data: result
            });
        });
    },

    getById: function(id, res) {
        db.query("SELECT * FROM Quizzes WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "Quiz data fetch success",
                data: result
            });
        });
    },

    store: function(data, res) {
        db.query("INSERT INTO Quizzes(??) VALUES (?)", data, (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "Quiz created",
                id: result.insertId,
            });
        });
    },

    edit: function(id, newData, res) {
        db.query("UPDATE Quizzes SET ? WHERE id=?", [newData, id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({ 
                msg: (result.affectedRows > 0?  `Deleted quiz with id:${id}`: "Nothing to delete")
            });
        });
        
    },

    destroy: function(id, res) {
        db.query("DELETE FROM Quizzes WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: (result.affectedRows > 0?  `Deleted quiz with id:${id}`: "Nothing to delete"),
            });
        });
    }
}