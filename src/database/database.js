import mysql from "promise-mysql"
import config from "../config"

const connection = mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: config.port,
    timezone: 'utc'
})

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}
