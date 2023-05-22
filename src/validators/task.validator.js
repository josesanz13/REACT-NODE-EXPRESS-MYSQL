import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper";

const validateTaskCreate = [
    check('description')
        .exists().withMessage('El campo descripcion es obligatorio').bail()
        .notEmpty().withMessage('El campo descripcion no puede estar vacio').bail()
        .isLength({ max: 300 }).withMessage('Máximo de caracteres permitidos [ 300 ]').bail(),
    check('title')
        .exists().withMessage('El campo tarea es obligatorio').bail()
        .notEmpty().withMessage('El campo tarea no puede estar vacio').bail()
        .isLength({ max: 50 }).withMessage('Máximo de caracteres permitidos [ 50 ]').bail(),
    check('status')
        .exists().withMessage('El campo estado es obligatorio').bail()
        .notEmpty().withMessage('El campo estado no puede estar vacio').bail()
        .isNumeric().withMessage('El campo estado debe ser numerico').bail(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateTaskUpdate = [
    check('description')
        .exists().withMessage('El campo descripcion es obligatorio').bail()
        .notEmpty().withMessage('El campo descripcion no puede estar vacio').bail()
        .isLength({ max: 300 }).withMessage('Máximo de caracteres permitidos [ 60 ]').bail(),
    check('title')
        .exists().withMessage('El campo tarea es obligatorio').bail()
        .notEmpty().withMessage('El campo tarea no puede estar vacio').bail()
        .isLength({ max: 50 }).withMessage('Máximo de caracteres permitidos [ 50 ]').bail(),
    check('status')
        .exists().withMessage('El campo estado es obligatorio').bail()
        .notEmpty().withMessage('El campo estado no puede estar vacio').bail()
        .isNumeric().withMessage('El campo estado debe ser numerico').bail(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    validateTaskCreate,
    validateTaskUpdate
}