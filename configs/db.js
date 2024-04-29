import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const connection = mysql.createPool({ // https://github.com/mysqljs/mysql#connection-options
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 60 * 1000 // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
})

export default {
    query: function(sql, data = [], callback) {
        if(data.length != 0) {
            sql = mysql.format(sql, data);
        }

        connection.query(sql, callback);
    }
}
