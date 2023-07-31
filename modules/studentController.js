const db = require('../database/mysql');
const util = require('util');
const query = util.promisify(db.query).bind(db);

let getAllStudents = async (req, res) => {
    let currentPage = req.query.page || 1;
    const perPage = 2;
    let totalData;
    try {
        const sqlQuery = "SELECT * FROM students";
        let result = await query(sqlQuery);
        totalData = result.length;
        
        const sqlQueryFetch = `SELECT * FROM students LIMIT ${perPage} OFFSET ${(currentPage-1)*perPage}`;
        result = await query(sqlQueryFetch);

        res.setHeader("Content-type", "application/json")
        res.status(200).send({
            success: true,
            message: "Students data fetched successfully",
            data: result,
            totalData: totalData
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
};

let getStudentById = async (req, res) => {
    try {
        const id = req.params.id;
        const sqlQuery = "SELECT * FROM students WHERE id = ?";
        const result = await query(sqlQuery, [id]);
        res.status(200).send({
            success: true,
            message: "Student data fetched successfully",
            data: result[0]
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
};

let addStudent = async (req, res) => {
    try {
        let values = req.body;
        const sqlQuery = "INSERT INTO students SET ?";
        let result = await query(sqlQuery, [values]);

        const sqlQueryFetch = "SELECT * FROM students WHERE Id = ?";
        let resultFetch = await query(sqlQueryFetch, [result.insertId]);

        res.status(201).send({
            success: true,
            message: "Student data inserted successfully",
            data: resultFetch[0]
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
};

let updateStudentById = async (req, res) => {
    try {
        let values = req.body;
        let id = req.params.id;
        const sqlQuery = "UPDATE students SET ? WHERE id = ?";
        let result = await query(sqlQuery, [values, id]);

        const sqlQueryFetch = "SELECT * FROM students WHERE id = ?";
        let resultFetch = await query(sqlQueryFetch, [id]);

        res.status(201).send({
            success: true,
            message: "Student data inserted successfully",
            data: resultFetch[0]
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
};

let deleteStudentById = async (req, res) => {
    try {
        let id = req.params.id;
        const sqlQuery = "DELETE FROM students WHERE id = ?";
        let result = await query(sqlQuery, [id]);

        res.status(204).send({
            success: true,
            message: "Student data inserted successfully",
            data: result[0]
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Connecting issue with mysql",
            data: error.message
        })
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById
}
