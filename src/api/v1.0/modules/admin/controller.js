import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminApiError } from "./error.js";
import { HttpStatusCode } from "../../../../constants/httpStatusCode.js";
import { successHandler } from "../../../../utils/successHandler.js";
import { queryHandler } from "../../../../utils/queryHandler.js";

export const login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        const sqlQueryCheck = "SELECT * FROM admin WHERE email = ?";
        let resultCheck = await queryHandler(sqlQueryCheck, [email]);

        if (resultCheck.length === 0) {
            throw new AdminApiError(HttpStatusCode.NOT_FOUND, "Email does not exists");
        }

        const isEqual = await bcrypt.compare(password, resultCheck[0].password);

        if (!isEqual) {
            throw new AdminApiError(HttpStatusCode.BAD_INPUT, "Password did not match");
        }

        let data = resultCheck[0];
        const token = jwt.sign(
            {
                email: data.email,
                name: data.name,
                user_id: data.user_id.toString()
            },
            "mySuperSecretKey",
            { expiresIn: "1h" }
        );

        data = { records: resultCheck[0], token };
        successHandler(res, HttpStatusCode.OK, "User Verified Successfully", data);

    } catch (error) {
        next(error);
    }
};

export const signup = async (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        const sqlQueryCheck = "SELECT * FROM admin WHERE email = ?";
        let resultCheck = await queryHandler(sqlQueryCheck, [email]);

        if (resultCheck.length !== 0) {
            throw new AdminApiError(HttpStatusCode.BAD_INPUT, "Email already exists");
        }

        let hashPwd = await bcrypt.hash(password, 7);

        const sqlQuery = "INSERT INTO admin SET ?";
        const values = { email, name, password: hashPwd };
        let result = await queryHandler(sqlQuery, values);

        if (!result) {
            throw new AdminApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Internal server error occured, cannot sign up");
        }

        const sqlQueryFetch = "SELECT * FROM admin WHERE user_id = ?";
        let resultFetch = await queryHandler(sqlQueryFetch, [result.insertId]);

        if (resultFetch[0].length === 0) {
            throw new AdminApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Internal server error");
        }

        let data = { records: resultFetch[0] };
        successHandler(res, HttpStatusCode.CREATED, "User Created Successfully", data);

    } catch (error) {
        next(error);
    }
};
