import { connection as db } from "../helpers/database.js";
import util from "util";
const query = util.promisify(db.query).bind(db);

export const queryHandler = async (sqlQuery, values = []) => {
    let result = await query(sqlQuery, values);
    return result;
};