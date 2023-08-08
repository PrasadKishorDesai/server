const { queryHandler } = require("../helpers/queryHandler");
const { successHandler } = require("../helpers/successHandler");

let getAllStudents = async (req, res) => {
    let currentPage = req.query.page || 1;
    const perPage = 2;
    let totalData;
    try {
        const sqlQuery = "SELECT * FROM students";
        let result = await queryHandler(sqlQuery);
        totalData = result.length;
        
        const sqlQueryFetch = 'SELECT * FROM students LIMIT ? OFFSET ?';
        result = await queryHandler(sqlQueryFetch, [perPage, (currentPage-1)*perPage]);

        let totalPages = Math.ceil(totalData/perPage);
        let data = {records:result, totalData, totalPages};
        successHandler(res, 200, "Students data fetched successfully", data);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

let getStudentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sqlQuery = "SELECT * FROM students WHERE student_id = ?";
        result = await queryHandler(sqlQuery, [id]);

        if (result.length === 0) {
            let err = new Error("Student data not found");
            err.statusCode = 404;
            err.data = result;
            throw err;
        }

        let data = {records:result[0]};
        successHandler(res, 200, "Students data fetched successfully", data);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

let addStudent = async (req, res) => {
    try {
        let values = req.body;
        let userId = req.userId;
        values = {...values, creator: userId};
        const sqlQuery = "INSERT INTO students SET ?";
        result = await queryHandler(sqlQuery, values);

        const sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await queryHandler(sqlQueryFetch, [result.insertId]);
        
        const sqlQueryUserFetch = "SELECT * FROM admin WHERE user_id = ?";
        let userResultFetch = await queryHandler(sqlQueryUserFetch, [userId]);
        let user = userResultFetch[0];

        let data = {records:resultFetch[0]};
        successHandler(res, 201, "Student data inserted successfully", data);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

let updateStudentById = async (req, res) => {
    try {
        let values = req.body;
        let id = req.params.id;
        
        let sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await queryHandler(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            let err = new Error("Student data not found");
            err.statusCode = 404;
            err.data = [];
            throw err;
        }

        if (resultFetch[0].creator.toString() !== req.userId.toString()) {
            let err = new Error("Not authorized");
            err.statusCode = 403;
            err.data = [];
            throw err;
        }

        const sqlQuery = "UPDATE students SET ? WHERE student_id = ?";
        let result = await queryHandler(sqlQuery, [values, id]);

        sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        resultFetch = await queryHandler(sqlQueryFetch, [id]);

        let data = {records:resultFetch[0]};
        successHandler(res, 201, "Student data updated successfully", data);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

let deleteStudentById = async (req, res) => {
    try {
        let id = req.params.id;
        
        let sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        resultFetch = await queryHandler(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            let err = new Error("Student data not found");
            err.statusCode = 404;
            err.data = [];
            throw err;
        }

        if (resultFetch[0].creator.toString() !== req.userId.toString()) {
            let err = new Error("Not authorized");
            err.statusCode = 403;
            err.data = [];
            throw err;
        }

        const sqlQuery = "DELETE FROM students WHERE student_id = ?";
        result = await queryHandler(sqlQuery, [id]);

        let data = {records:result[0]};
        successHandler(res, 204, "Student data deleted successfully", data);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById
}
