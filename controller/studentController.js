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
        const sqlQuery = "SELECT * FROM students WHERE student_id = ?";
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
        let userId = req.userId;
        // console.log(req.userId);
        values = {...values, creator: userId};
        const sqlQuery = "INSERT INTO students SET ?";
        let result = await query(sqlQuery, [values]);

        const sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await query(sqlQueryFetch, [result.insertId]);
        
        const sqlQueryUserFetch = "SELECT * FROM admin WHERE user_id = ?";
        let userResultFetch = await query(sqlQueryUserFetch, [userId]);
        // console.log(userResultFetch[0].name)
        let user = userResultFetch[0];

        res.status(201).send({
            success: true,
            message: "Student data inserted successfully",
            data: resultFetch[0],
            creator: {_id: userId, name: user.name}
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
        
        let sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await query(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            res.status(404).send({
                success: false,
                message: "Student data not found",
                data: []
            })
            return;
        }

        if (resultFetch[0].creator.toString() !== req.userId.toString()) {
            res.status(403).send({
                success: false,
                message: "Not authorized",
                data: []
            })
            return;
        }

        const sqlQuery = "UPDATE students SET ? WHERE student_id = ?";
        let result = await query(sqlQuery, [values, id]);

        sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        resultFetch = await query(sqlQueryFetch, [id]);

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
        
        let sqlQueryFetch = "SELECT * FROM students WHERE student_id = ?";
        let resultFetch = await query(sqlQueryFetch, [id]);

        if (resultFetch[0].length === 0) {
            res.status(404).send({
                success: false,
                message: "Student data not found",
                data: []
            })
            return;
        }

        if (resultFetch[0].creator.toString() !== req.userId.toString()) {
            res.status(403).send({
                success: false,
                message: "Not authorized",
                data: []
            })
            return;
        }

        const sqlQuery = "DELETE FROM students WHERE student_id = ?";
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
