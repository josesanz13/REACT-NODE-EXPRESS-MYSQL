import { getConnection } from "../database/database";
import { generateToken, getInfoToken, destoyToken } from "../helpers/jwtHelper";

const bcrypt = require('bcrypt')
const salt = 10;

const getUsers = async (req, res) => {
    let response = {
        data: [],
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();
        const result = await connection.query(
            "SELECT id,name,last_name,email FROM users"
        );
        response.data = result;
        response.status = 200;

    } catch (error) {

    }

    res.json(response);

}

const createdUser = async (req, res) => {
    let response = {
        data: {},
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();
        const { name, last_name, email, password } = req.body;
        const sql_insert = "INSERT INTO users ( name,last_name,email,password ) VALUES ( ?, ?, ?, ? )";
        const hashedPassword = await bcrypt.hash(password, salt);

        const { affectedRows, insertId } = await connection.query(sql_insert, [name, last_name, email, hashedPassword]);

        if (!affectedRows) {
            throw new Error("No records have been inserted");
        }

        const sql_get_last_insert = "SELECT id,name,last_name,email FROM users WHERE id = ? ";

        let user = await connection.query(sql_get_last_insert, [insertId]);

        response.data = user;
        response.status = 200;
    } catch (error) {
        response.message = error.message;
    }

    res.json(response);
}

const getUser = async (req, res) => {
    let response = {
        data: [],
        status: 500,
        message: "",
        errors: []
    }

    try {
        const connection = await getConnection();
        const { id } = getInfoToken();
        const sql_get_user = "SELECT id,name,last_name,email FROM users WHERE id = ? ";

        let user = await connection.query(sql_get_user, [id]);

        if (!user || user.length === 0) {
            throw new Error("Datos no encontrados");
        }

        response.data = {
            user: {
                id: user[0].id,
                last_name: user[0].last_name,
                name: user[0].name,
                email: user[0].email,
            }
        }
        response.status = 200;
    } catch (error) {
        let message = error.message;
        response.errors = [{ msg: message, type: "field", path: "general" }]
        res.status(403);
    }

    res.json(response);
}

const loginUser = async (req, res) => {
    let response = {
        data: [],
        status: 500,
        message: "",
        errors: []
    }

    try {
        const connection = await getConnection();
        const sql_get_user = "SELECT id,name,last_name,email,password FROM users WHERE email = ? ";
        const { email, password } = req.body;

        let user = await connection.query(sql_get_user, [email]);

        if (!user || user.length === 0) {
            throw new Error("Usuario y/o contraseña incorrectos");
        }

        const hashedPassword = user[0].password;
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            response.status = 403;
            throw new Error("Usuario y/o contraseña incorrectos");
        }

        let token = generateToken(user[0]);

        response.data = {
            user: {
                id: user[0].id,
                last_name: user[0].last_name,
                name: user[0].name,
                email: user[0].email,
            },
            token
        }
        response.status = 200;
    } catch (error) {
        let message = error.message;
        response.errors = [{ msg: message, type: "field", path: "general" }]
        res.status(403);
    }

    res.json(response);
}

const logout = async (req, res, next) => {
    let response = {
        data: [],
        status: 500,
        message: "",
        errors: []
    }

    try {
        destoyToken(req, res, next)
        response.status = 200;
    } catch (error) {
        let message = error.message;
        response.errors = [{ msg: message, type: "field", path: "general" }]
        res.status(403);
    }

    res.json(response);
}

export const methods = {
    getUsers,
    createdUser,
    loginUser,
    getUser,
    logout
}