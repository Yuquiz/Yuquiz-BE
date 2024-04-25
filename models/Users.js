import db from "../configs/db.js";

const TABLE_NAME = "Users";

export default {
    getAll: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME}`, [], (err, result) => {
                if(err) { return reject({code: "query_error", message: `SQL_ERROR ${err.errno}`}); }

                resolve(result);
            });
        })
    },

    getById: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", message: `SQL_ERROR ${err.errno}`}); }

                resolve(result[0])
            });
        })
    },

    store: function(data) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${TABLE_NAME}(??) VALUES (?)`, data, (err, result) => {
                if(err) { return reject({code: "query_error", message: `SQL_ERROR ${err.errno}`}); }

                resolve(result.insertId);
            });
        })
    },

    edit: function(id, newData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${TABLE_NAME} SET ? WHERE id=?`, [newData, id], (err, result) => {
                if(err) { return reject({code: "query_error", message: `SQL_ERROR ${err.errno}`}); }

                resolve(result.affectedRows > 0?  
                    `Updated User with id: ${id}`
                    : "Nothing to update",
                );
            });
        })
    },

    destroy: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", message: `SQL_ERROR ${err.errno}`}); }

                resolve( result.affectedRows > 0?  
                    `Deleted user with id:${id}`
                    : "Nothing to delete"
                );
            });
        })
    },

    getByUsername: function(username) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME} WHERE username=?`, [username], (err, result) => {
                if(err) { return reject({code: "query_error", message: `SQL_ERROR ${err.errno}`}); }
                if(result.length < 1) { return reject({code: "invalid_credentials", message: "No user with provided credentials"}); }
                
                resolve(result)
            })
        })
    }
}