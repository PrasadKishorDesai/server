const jwt = require("jsonwebtoken")

exports.isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            let err = new Error("Not authenticated");
            err.statusCode = 401;
            err.data = [];
            throw err;
        }
        const token = authHeader.split(' ')[1]
        // console.log(token)
        let decoded = await jwt.verify(token, 'mySuperSecretKey');
        // console.log(decoded)

        if (!decoded) {
            let err = new Error("Invalid token");
            err.statusCode = 401;
            err.data = [];
            throw err;
        }

        req.userId = decoded.user_id;

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
    next();
}
