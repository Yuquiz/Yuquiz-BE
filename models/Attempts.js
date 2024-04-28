import db from "../configs/db.js";

const TABLE_NAME = "Attempts";

export default {
    getAll: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME}`, [], (err, result) => {
                if(err) { return reject({code: "query_error", message:err})}

                resolve(result);
            });
        })
    },

    getById: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${TABLE_NAME} WHERE id=?`, [id], (err, result) => {
                if(err) { return reject({code: "query_error", message:err})}

                resolve(result[0]);
            });
        })
    },

    store: function(data) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${TABLE_NAME}(??) VALUES (?)`, data, (err, result) => {
                if(err) { return reject({code: "query_error", message:err})}

                resolve(result.insertId);
            });
        })
    },

    edit: function(id, newData) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${TABLE_NAME} SET ? WHERE id=?`, [newData, id], (err, result) => {
                if(err) { return reject({code: "query_error", message:err})}

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
                if(err) { return reject({code: "query_error", message:err})}

                resolve(result.affectedRows > 0?  
                    `Deleted attempt with id:${id}`
                    : "Nothing to delete"
                )
            });
        })
    },

    usersByQuiz: function(quizId) {
        const JOIN_TABLE_NAME = "Users"
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT ${TABLE_NAME}.*, `
                    + `${JOIN_TABLE_NAME}.id as user_id, `
                    + `${JOIN_TABLE_NAME}.* `
                + `FROM ${TABLE_NAME} `
                + `JOIN ${JOIN_TABLE_NAME} ON ${TABLE_NAME}.user_id = ${JOIN_TABLE_NAME}.id `
                + `WHERE quiz_id=? `, 
                [quizId], (err, result) => {
                    if(err) { return reject({code: "query_error", message:err})}

                    resolve(result);
                }
            );
        })
    },

    quizzesByUser: function(userId) {
        const JOIN_TABLE_NAME = "Quizzes";
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT ${TABLE_NAME}.*, `
                    + `${JOIN_TABLE_NAME}.id as quiz_id, `
                    + `${JOIN_TABLE_NAME}.* `
                + `FROM ${TABLE_NAME} `
                + `JOIN ${JOIN_TABLE_NAME} ON ${TABLE_NAME}.quiz_id = ${JOIN_TABLE_NAME}.id `
                + `WHERE ${TABLE_NAME}.user_id=? `, 
                [userId], (err, result) => {
                    if(err) { return reject({code: "query_error", message:err})}

                    resolve(result);
                }
            );
        })
    },
}