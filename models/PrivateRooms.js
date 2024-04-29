import db from "../configs/db.js";

const TABLE_NAME = "PrivateRooms";

export default {
    getAll: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME}`, [], (err, result) => {
                if(err) { return reject({code: "query_error", message: err}); }

                resolve(result);
            });
        })
    },

    getById: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", message: err}); }

                resolve(result[0])
            });
        })
    },

    store: function(data) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${TABLE_NAME}(??) VALUES (?)`, data, (err, result) => {
                if(err) { return reject({code: "query_error", message: err}); }

                resolve(result.insertId);
            });
        })
    },

    edit: function(id, newData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${TABLE_NAME} SET ? WHERE id=?`, [newData, id], (err, result) => {
                if(err) { return reject({code: "query_error", message: err}); }

                resolve(result.affectedRows > 0?  
                    `Updated PrivateRoom with id: ${id}`
                    : "Nothing to update",
                );
            });
        })
    },

    destroy: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", message: err}); }

                resolve( result.affectedRows > 0?  
                    `Deleted PrivateRoom with id:${id}`
                    : "Nothing to delete"
                );
            });
        })
    },
}