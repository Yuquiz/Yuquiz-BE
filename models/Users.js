import db from "./db.js";

export default {
    getAll: function() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Users", [], (err, result) => {
                if(err) {
                    reject(`Something went wrong (${err.errno} - ${err.code})`); 
                }

                resolve(result);
            });
        })
    },

    getById: function(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM Users WHERE id=?", [id], (err, result) => {
                if(err) {
                    reject(`Something went wrong (${err.errno} - ${err.code})`)
                } 

                resolve(result)
            });
        })
    },

    store: function(data) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO Users(name) VALUES (?)", data, (err, result) => {
                if(err) {
                    reject(`Something went wrong (${err.errno} - ${err.code})`); 
                } 

                resolve(result.insertId);
            });
        })
    },

    edit: function(id, newData) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE Users SET ? WHERE id=?", [newData, id], (err, result) => {
                if(err) {
                    reject(`Something went wrong (${err.errno} - ${err.code})`); 
                } 

                resolve(result.affectedRows > 0?  
                    `Updated User with id: ${id}`
                    : "Nothing to update",
                );
            });
        })
    },

    destroy: function(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM Users WHERE id=?", [id], (err, result) => {
                if(err) {
                    reject(`Something went wrong (${err.errno} - ${err.code})`)
                } 

                resolve( result.affectedRows > 0?  
                    `Deleted user with id:${id}`
                    : "Nothing to delete"
                );
            });
        })
    },

    getIDByLogin: function(username, pass) {
        return new Promise((resolve, reject) => {
            db.query("SELECT id FROM Users WHERE username=? AND password=?", 
                [username, pass], (err, result) => {
                    if(err) { reject(["sql_err", `SQL_ERROR ${err.errno}`]); }
                    
                    if(result.length < 1) { reject(["inv_cred", "Credentials provided doesn't match"]); }
                    
                    resolve(result[0])
                }
            )
        })
    }
}