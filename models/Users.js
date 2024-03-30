import db from "./db.js";

export default {
    getAll: function(res) {
        db.query("SELECT * FROM Users", [], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            }

            res.send({
                msg: "User data fetch success",
                data: result
            });
        });
    },

    getById: function(id, res) {
        db.query("SELECT * FROM Users WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "User data fetch success",
                data: result
            });
        });
    },

    store: function(data, res) {
        db.query("INSERT INTO Users(name) VALUES (?)", data, (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: "User created",
                id: result.insertId
            });
        });
    },

    edit: function(id, newData, res) {
        db.query("UPDATE Users SET ? WHERE id=?", [newData, id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: (result.affectedRows > 0?  `Updated User with id: ${id}`: "Nothing to update"),
            });
        });
        
    },

    destroy: function(id, res) {
        db.query("DELETE FROM Users WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({ msg: `Something went wrong (${err.errno} - ${err.code})`, }); 
                return;
            } 

            res.send({
                msg: (result.affectedRows > 0?  `Deleted user with id:${id}`: "Nothing to delete"),
            });
        });
    }
}