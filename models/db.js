import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

const query = (sql, data) => {
    if(data.length != 0) {
        sql = mysql.format(sql, data);
    }

    connection.query(sql, (err, res) => {
        if(err) {
            console.log(err.msg);
        }
    });
}

export default query;