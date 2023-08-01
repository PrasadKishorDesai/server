const jwt = require("jsonwebtoken")

exports.isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            res.status(401).send({
                success: false,
                message: "Not authenticated",
                data: error.message
            })
            return;
        }
        const token = authHeader.split(' ')[1]
        // console.log(token)
        let decoded = await jwt.verify(token, 'mySuperSecretKey');
        // console.log(decoded)

        if (!decoded) {
            res.status(401).send({
                success: false,
                message: "Not authenticated",
                data: error.message
            })
            return;
        }

        req.userId = decoded.user_id;

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Invalid token",
            data: error.message
        })
    }
    next();
}
