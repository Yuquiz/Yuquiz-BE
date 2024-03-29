import db from "./db.js";

export default {
    getAll: function(res) {
        db.query("SELECT * FROM Users", [], (err, result) => {
            if(err) {
                res.send({
                    status: -1,
                    msg: `Something went wrong (${err.errno} - ${err.code})`,
                }); return;
            }

            res.send({
                status: 0,
                msg: "User data fetch success",
                data: result
            });
        });
    },

    getById: function(id, res) {
        db.query("SELECT * FROM Users WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({
                    status: -1,
                    msg: `Something went wrong (${err.errno} - ${err.code})`,
                }); return
            } 

            res.send({
                status: 0,
                msg: (result.length > 0? "User data fetch success": 
                                        "User data not found"),
                data: result
            });
        });
    },

    store: function(data, res) {
        db.query("INSERT INTO Users(name) VALUES (?)", data, (err, result) => {
            if(err) {
                res.send({
                    status: -1,
                    msg: `Something went wrong (${err.errno} - ${err.code})`,
                }); return
            } 

            res.send({
                status: 0,
                msg: "User created",
                data: {
                    id: result.insertId,
                    nama: data[0]
               }
            });
        });
    },

    edit: function(id, newData, res) {
        db.query("UPDATE Users SET name=? WHERE id=?", [...newData, id], (err, result) => {
            if(err) {
                res.send({
                    status: -1,
                    msg: `Something went wrong (${err.errno} - ${err.code})`,
                }); return
            } 

            res.send({
                status: 0,
                msg: `User data with id: ${id} updated`,
                result: {
                    id: id,
                    name: newData[0]
                }
            });
        });
        
    },

    destroy: function(id, res) {
        db.query("DELETE FROM Users WHERE id=?", [id], (err, result) => {
            if(err) {
                res.send({
                    status: -1,
                    msg: `Something went wrong (${err.errno} - ${err.code})`,
                }); return
            } 

            res.send({
                status: 0,
                msg: (result.affectedRows > 0? 
                    `Deleted user with id:${id}`: "Nothing happened"
                ),
            });
        });
    }
}