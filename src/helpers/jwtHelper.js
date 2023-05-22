import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET;
var payload_jwt = {};

const generateToken = ({ id, name: user_name, email }) => {
    const token = jwt.sign({
        id,
        user_name,
        email,
        // exp: Date.now() + 60 * 180000 // 3 hours
        exp: Date.now() + 60 * 10000 // 10 min
    }, secret)

    return token;
}

const validateToken = (req, res, next) => {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
    if (!req.headers.authorization) {
        return res.status(401).send({ error: "JWT no exist" })
    }

    try {
        let token = req.headers.authorization.split(" ")[1];

        const payload = jwt.verify(token, secret);
        payload_jwt = payload;
        if (Date.now() > payload.exp) {
            return res.status(401).send({ error: "token expired" })
        }
    } catch (error) {
        return res.status(401).send({ error: error.message })
    }

    next();
}

const destoyToken = async (req, res, next) => {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...
    if (!req.headers.authorization) {
        return res.status(401).send({ error: "JWT no exist" })
    }

    try {
        let token = req.headers.authorization.split(" ")[1];

        const payload = await jwt.verify(token, secret);
        payload.exp = payload.iat - 10000;
    } catch (error) {
        return res.status(401).send({ error: error.message })
    }

    return next();
}

const getInfoToken = () => {
    return payload_jwt;
}

module.exports = { generateToken, validateToken, getInfoToken, destoyToken }