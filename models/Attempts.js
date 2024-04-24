import db from "../configs/db.js";

const TABLE_NAME = "Attempts";

export default {
    getAll: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME}`, [], (err, result) => {
                if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}

                resolve(result);
            });
        })
    },

    getById: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}

                resolve(result[0]);
            });
        })
    },

    store: function(data) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${TABLE_NAME}(??) VALUES (?)`, data, (err, result) => {
                if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}

                resolve(result.insertId);
            });
        })
    },

    edit: function(id, newData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${TABLE_NAME} SET ? WHERE id=?`, [newData, id], (err, result) => {
                if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}

                resolve(result.affectedRows > 0?  
                    `Updated attempt with id:${id}`
                    : "Nothing to update"
                )
            })
        })
    },

    destroy: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}

                resolve(result.affectedRows > 0?  
                    `Deleted attempt with id:${id}`
                    : "Nothing to delete"
                )
            });
        })
    },

    users: function(quizId) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${TABLE_NAME}.* FROM ${TABLE_NAME} JOIN Users ON ${TABLE_NAME}.user_id = Users.id WHERE quiz_id=? `, 
                [quizId], (err, result) => {
                    if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}
    
                    resolve(result);
                }
            );
        })
    },

    quizzes: function(userId) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${TABLE_NAME}.* FROM ${TABLE_NAME} JOIN Quizzes ON ${TABLE_NAME}.quiz_id = Quizzes.id WHERE ${TABLE_NAME}.user_id=? `, 
                [userId], (err, result) => {
                    if(err) { return reject({code: "query_error", reason:`${err.errno} - ${err.code}`})}

                    resolve(result);
                }
            );
        })
    },
}