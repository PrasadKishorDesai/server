const db = require('../database/mysql');
const util = require('util');
const query = util.promisify(db.query).bind(db);

const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send({
                success: false,
                message: "Bad input",
                data: errors.array()
            })
            return;
        }
        let email = req.body.email;
        let password = req.body.password;

        const sqlQueryCheck = "SELECT * FROM admin WHERE email = ?";
        let resultCheck = await query(sqlQueryCheck, [email]);

        // console.log(resultCheck);
        if (resultCheck.length === 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send({
                success: false,
                message: "Email does not exists",
                data: resultCheck
            })
            return;
        }

        // console.log(resultCheck[0].password)
        const isEqual = await bcrypt.compare(password, resultCheck[0].password);
        // console.log(result)

        if (!isEqual) {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send({
                success: false,
                message: "Password did not match",
                data: []
            })
            return;
        }

        const data = resultCheck[0];
        const token = jwt.sign(
            {
                email: data.email,
                name: data.name,
                user_id: data.user_id.toString()
            },
            'mySuperSecretKey',
            { expiresIn: '1h' }
        );
        // console.log(token);

        res.status(200).send({
            success: true,
            message: "User Verified Successfully",
            data: resultCheck[0],
            token: token
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
}

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send({
                success: false,
                message: "Bad input",
                data: errors.array()[0]
            })
            return;
        }
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        const sqlQueryCheck = "SELECT * FROM admin WHERE email = ?";
        let resultCheck = await query(sqlQueryCheck, [email]);

        // console.log(resultCheck.length);
        if (resultCheck.length !== 0) {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send({
                success: false,
                message: "Email already exists",
                data: resultCheck
            })
            return;
        }

        let hashPwd = await bcrypt.hash(password, 7);

        const sqlQuery = "INSERT INTO admin SET ?";
        const values = { email, name, password: hashPwd };
        let result = await query(sqlQuery, [values]);

        const sqlQueryFetch = "SELECT * FROM admin WHERE user_id = ?";
        let resultFetch = await query(sqlQueryFetch, [result.insertId]);
        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            data: resultFetch[0]
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
}

module.exports = {
    login,
    signup
}