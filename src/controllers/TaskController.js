import { getConnection } from "../database/database";
import { getInfoToken } from "../helpers/jwtHelper";

const show = async (req, res) => {
    let response = {
        data: {},
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();
        let sql = `
            SELECT 
                id,
                description,
                title,
                status,
                created_at,
                updated_at, 
                user_id 
            FROM tasks 
            WHERE user_id = ?
        `;
        const { id } = getInfoToken();
        let tasks = await connection.query(sql, [id]);

        response.data = tasks;
        response.status = 200;
    } catch (error) {
        response.message = error.message;
    }

    res.json(response)
}

const showID = async (req, res) => {
    let response = {
        data: {},
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();
        let sql = `
            SELECT 
                id,
                description,
                title,
                status
            FROM tasks 
            WHERE id = ?
        `;
        let id = req.params.id;

        if (!id || id === undefined) {
            throw new Error("No se encuentra el id");
        }

        let tasks = await connection.query(sql, [id]);

        response.data = tasks;
        response.status = 200;
    } catch (error) {
        response.message = error.message;
    }

    res.json(response)
}

const store = async (req, res) => {
    let response = {
        data: {},
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();

        let sql = "INSERT INTO tasks ( description, title, status, user_id ) VALUES( ?,?,?,? ) ";
        const { description, status, title } = req.body;
        const { id } = getInfoToken();

        const { affectedRows, insertId } = await connection.query(sql, [description, title, status, id]);

        if (!affectedRows) {
            throw new Error("No se han insertado registros");
        }

        sql = `
            SELECT 
                id,
                description,
                status,
                created_at,
                updated_at, 
                user_id 
            FROM tasks 
            WHERE id = ?
        `;

        let task = await connection.query(sql, [insertId]);

        response.data = task;
        response.status = 200;
        response.message = "Datos guardados exitosamente";
    } catch (error) {
        response.message = error.message;
    }

    res.json(response)
}

const update = async (req, res) => {
    let response = {
        data: {},
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();

        let sql = "UPDATE tasks SET description = ?, title = ?, status = ? WHERE id = ? ";
        let id = req.params.id;

        if (!id || id === undefined) {
            throw new Error("No se encuentra el id para actualizar el registro");
        }

        const { description, title, status } = req.body;

        const { affectedRows } = await connection.query(sql, [description, title, status, id]);

        if (!affectedRows) {
            throw new Error("Registro no encontrado.");
        }

        sql = `
            SELECT 
                id,
                description,
                status,
                created_at,
                updated_at, 
                user_id 
            FROM tasks 
            WHERE id = ?
        `;

        let task = await connection.query(sql, [id]);

        response.data = task;
        response.status = 200;
        response.message = "Registro actualizado exitosamente";
    } catch (error) {
        response.message = error.message;
    }

    res.json(response)
}


const remove = async (req, res) => {
    let response = {
        data: {},
        status: 500,
        message: ""
    }

    try {
        const connection = await getConnection();

        let sql = "DELETE FROM tasks WHERE id = ? ";
        let id = req.params.id;

        if (!id || id === undefined) {
            throw new Error("No se encuentra el id para eliminar el registro");
        }

        const { affectedRows } = await connection.query(sql, [id]);

        if (!affectedRows) {
            throw new Error("No se han eliminado registros");
        }

        response.status = 200;
        response.message = "Registro eliminado exitosamente";
    } catch (error) {
        response.message = error.message;
    }

    res.json(response)
}


export const methods = {
    show,
    showID,
    store,
    update,
    remove
}