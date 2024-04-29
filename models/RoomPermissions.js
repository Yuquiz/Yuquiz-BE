import db from "../configs/db.js";

const TABLE_NAME = "RoomPermissions";

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
                    `Updated RoomPermission with id: ${id}`
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
                    `Deleted RoomPermission with id:${id}`
                    : "Nothing to delete"
                );
            });
        })
    },

    usersByRoomId: function(roomId) {
        const JOIN_TABLE_NAME = "Users"
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT ${TABLE_NAME}.*, `
                    + `${JOIN_TABLE_NAME}.*, `
                    + `${TABLE_NAME}.user_id as participant_id, `
                    + `${TABLE_NAME}.room_id as room_id, `
                    + `${JOIN_TABLE_NAME}.id as user_id `
                    + `"~" as password, `
                    + `"~" as role `
                + `FROM ${TABLE_NAME} `
                + `JOIN ${JOIN_TABLE_NAME} ON ${TABLE_NAME}.user_id = ${JOIN_TABLE_NAME}.id `
                + `WHERE room_id=? `, 
                [roomId], (err, result) => {
                    if(err) { return reject({code: "query_error", message:err})}

                    resolve(result);
                }
            );
        })
    },

    roomByUserId: function(userId) {
        const JOIN_TABLE_NAME = "PrivateRooms";
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT ${TABLE_NAME}.*, `
                    + `${JOIN_TABLE_NAME}.*, `
                    + `${TABLE_NAME}.user_id as participant_id, `
                    + `${TABLE_NAME}.room_id as room_id `
                + `FROM ${TABLE_NAME} `
                + `JOIN ${JOIN_TABLE_NAME} ON ${TABLE_NAME}.room_id = ${JOIN_TABLE_NAME}.id `
                + `WHERE ${TABLE_NAME}.user_id=? `, 
                [userId], (err, result) => {
                    if(err) { return reject({code: "query_error", message:err})}

                    resolve(result);
                }
            );
        })
    },
}