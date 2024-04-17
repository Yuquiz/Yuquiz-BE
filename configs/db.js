import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

export default {
    query: function(sql, data = [], callback) {
        if(data.length != 0) {
            sql = mysql.format(sql, data);
        }

        connection.query(sql, callback);
    }
}