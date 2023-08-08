const db = require('../database/mysql');
const util = require('util');
const query = util.promisify(db.query).bind(db);

exports.queryHandler = async (sqlQuery, values=[]) => {
    let result = await query(sqlQuery, values);
    return result;
}
