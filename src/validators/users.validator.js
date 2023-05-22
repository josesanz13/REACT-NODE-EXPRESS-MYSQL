import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper";

const validateUserCreate = [
    check('name')
        .exists().withMessage('El campo nombre es obligatorio').bail()
        .notEmpty().withMessage('El campo nombre no puede estar vacio').bail()
        .isLength({ max: 60 }).withMessage('Máximo de caracteres permitidos [ 60 ]').bail(),
    check('last_name')
        .isLength({ max: 60 }).withMessage('Máximo de caracteres permitidos [ 60 ]').bail(),
    check('email')
        .exists().withMessage('El campo email es obligatorio').bail()
        .notEmpty().withMessage('El campo email no puede estar vacio.').bail()
        .isLength({ max: 100 }).withMessage('Máximo de caracteres permitidos [ 100 ]').bail()
        .isEmail().withMessage('Ingrese una dirección de email valida').bail()
        .trim(),
    check('password')
        .exists().withMessage('La contraseña es obligatoria').bail()
        .notEmpty().withMessage('La contraseña no contiene caracteres.').bail()
        .isLength({ min: 6, max: 100 }).withMessage('La contraseña debe de contener [minimo : 6 caracteres, maximo : 100 ]').bail(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateUserLogin = [
    check('email')
        .exists().withMessage('El campo email es obligatorio').bail()
        .notEmpty().withMessage('El campo email no puede estar vacio.').bail()
        .isLength({ max: 100 }).withMessage('Máximo de caracteres permitidos [ 100 ]').bail()
        .isEmail().withMessage('Ingrese una dirección de email valida').bail()
        .trim(),
    check('password')
        .exists().withMessage('La contraseña es obligatoria').bail()
        .notEmpty().withMessage('La contraseña no contiene caracteres.').bail()
        .isLength({ min: 6, max: 100 }).withMessage('La contraseña debe de contener [minimo : 6 caracteres, maximo : 100 ]').bail(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

module.exports = {
    validateUserCreate,
    validateUserLogin
}