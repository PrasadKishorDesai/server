import { queryHandler } from "../../../../utils/queryHandler.js";
import { successHandler } from "../../../../utils/successHandler.js";
import { HttpStatusCode } from "../../../../constants/httpStatusCode.js";
import { StudentApiError } from "./error.js";

export const getAllStudents = async (req, res, next) => {
    let currentPage = req.query.page || 1;
    const perPage = 2;
    let totalData;
    try {
        const sqlQuery = "SELECT * FROM students";
        let result = await queryHandler(sqlQuery);
        totalData = result.length;

        const sqlQueryFetch = "SELECT * FROM students LIMIT ? OFFSET ?";
        result = await queryHandler(sqlQueryFetch, [perPage, (currentPage - 1) * perPage]);

        if (result.length === 0) {
            throw new StudentApiError(HttpStatusCode.NOT_FOUND, "Students data not found");
        }

        let totalPages = Math.ceil(totalData / perPage);
        let data = { records: result, totalData, totalPages };
        successHandler(res, HttpStatusCode.OK, "Students data fetched successfully", data);

    } catch (error) {
        next(error);
    }
};

export const getStudentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sqlQuery = "SELECT * FROM students WHERE student_id = ?";
        let result = await queryHandler(sqlQuery, [id]);

        if (result.length === 0) {
            throw new StudentApiError(HttpStatusCode.NOT_FOUND, "Student data not found");
        }

        let data = { records: result[0] };
        successHandler(res, HttpStatusCode.OK, "Students data fetched successfully", data);
    } catch (error) {
        next(error);
    }
};

export const addStudent = async (req, res, next) => {
    try {
        let values = req.body;
        let userId = req.userId;
        values = { ...values, creator: userId };

        const sqlQueryUserFetch = "SELECT * FROM students WHERE phone_number = ?";
        let userResultFetch = await queryHandler(sqlQueryUserFetch, [values.phone_number]);

        if (userResultFetch.length !== 0) {
            throw new StudentApiError(HttpStatusCode.BAD_INPUT, "Duplicate student data, phone number already exists");
        }

        const sqlQuery = "INSERT INTO students SET ?";
        let result = await queryHandler(sqlQuery, values);

        const sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await queryHandler(sqlQueryFetch, [result.insertId]);

        if (resultFetch.length === 0) {
            throw new StudentApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Student data not found");
        }

        let data = { records: resultFetch[0] };
        successHandler(res, HttpStatusCode.CREATED, "Student data inserted successfully", data);

    } catch (error) {
        next(error);
    }
};

export const updateStudentById = async (req, res, next) => {
    try {
        let values = req.body;
        let id = req.params.id;

        let sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await queryHandler(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            throw new StudentApiError(HttpStatusCode.NOT_FOUND, "Student data not found");
        }

        if (resultFetch[0].creator.toString() !== req.userId.toString()) {
            throw new StudentApiError(HttpStatusCode.FORBIDDEN, "Not authorized");
        }

        const sqlQuery = "UPDATE students SET ? WHERE student_id = ?";
        let result = await queryHandler(sqlQuery, [values, id]);
        if (!result) {
            throw new StudentApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Cannot proceed request");
        }

        sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        resultFetch = await queryHandler(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            throw new StudentApiError(HttpStatusCode.NOT_FOUND, "Student data not found");
        }

        let data = { records: resultFetch[0] };
        successHandler(res, HttpStatusCode.CREATED, "Student data updated successfully", data);

    } catch (error) {
        next(error);
    }
};

export const deleteStudentById = async (req, res, next) => {
    try {
        let id = req.params.id;

        let sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await queryHandler(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            throw new StudentApiError(HttpStatusCode.NOT_FOUND, "Student data not found");
        }

        if (resultFetch[0].creator.toString() !== req.userId.toString()) {
            throw new StudentApiError(HttpStatusCode.FORBIDDEN, "Not authorized");
        }

        const sqlQuery = "DELETE FROM students WHERE student_id = ?";
        let result = await queryHandler(sqlQuery, [id]);

        let data = { records: result[0] };
        successHandler(res, HttpStatusCode.DELETED, "Student data deleted successfully", data);

    } catch (error) {
        next(error);
    }
};
