const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { successHandler } = require("../helpers/successHandler");
const { queryHandler } = require("../helpers/queryHandler");

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = new Error("Bad input");
            err.statusCode = 400;
            err.data = errors.array();
            throw err;
        }
        let email = req.body.email;
        let password = req.body.password;

        const sqlQueryCheck = "SELECT * FROM admin WHERE email = ?";
        // let resultCheck = await query(sqlQueryCheck, [email]);
        let resultCheck = await queryHandler(sqlQueryCheck, [email]);

        // console.log(resultCheck);
        if (resultCheck.length === 0) {
            let err = new Error("Email does not exists");
            err.statusCode = 404;
            err.data = resultCheck;
            throw err;
        }

        // console.log(resultCheck[0].password)
        const isEqual = await bcrypt.compare(password, resultCheck[0].password);
        // console.log(result)

        if (!isEqual) {
            let err = new Error("Password did not match");
            err.statusCode = 400;
            err.data = [];
            throw err;
        }

        let data = resultCheck[0];
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
        
        data = {records:resultCheck[0], token};
        successHandler(res, 200, "User Verified Successfully", data);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = new Error("Bad input");
            err.statusCode = 400;
            err.data = errors.array()[0];
            throw err;
        }
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        const sqlQueryCheck = "SELECT * FROM admin WHERE email = ?";
        let resultCheck = await queryHandler(sqlQueryCheck, [email]);

        // console.log(resultCheck.length);
        if (resultCheck.length !== 0) {
            let err = new Error("Email already exists");
            err.statusCode = 400;
            err.data = resultCheck;
            throw err;
        }

        let hashPwd = await bcrypt.hash(password, 7);

        const sqlQuery = "INSERT INTO admin SET ?";
        const values = { email, name, password: hashPwd };
        // let result = await query(sqlQuery, [values]);
        let result = await queryHandler(sqlQuery, values);

        const sqlQueryFetch = "SELECT * FROM admin WHERE user_id = ?";
        // let resultFetch = await query(sqlQueryFetch, [result.insertId]);
        let resultFetch = await queryHandler(sqlQueryFetch, [result.insertId]);
        
        data = {records:resultFetch[0]};
        successHandler(res, 201, "User Created Successfully", data);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports = {
    login,
    signup
}