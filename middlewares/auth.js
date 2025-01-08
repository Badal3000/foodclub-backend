
const {verifyToken} = require("../utils/auth");
const user = require("../models/users")

exports.checkAuth = (req, res, next) => {
    const cookieToken = req.cookies.token ?? "";
    const headerToken = req.headers.authorization?.split(" ")[1] ?? "";
    const token = cookieToken || headerToken;
    if (!token)
        return res
            .status(401)
            .send({ message: 'Unauthorized access' , error: true, status: "failed"});
    else{
        const user = verifyToken(token);
        req.user = user;
        next();
    }
};
