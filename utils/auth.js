const jwt = require("jsonwebtoken");

exports.generateToken = (userData) => {
    return jwt.sign(
        {
            _id: userData._id,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            fullname: userData.fullname
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

};

exports.verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch{
        return null;

    }
}

// exports.generateToken = (userId,res)=>{
//     const token = jwt.sign({userId},process.env.JWT_SECRET,{
//         expiresIn: "7d"
//     });
//     res.cookie("token",token,{
//         httpOnly:true,
//         maxAge: 7*24*60*60*1000,
//         // sameSite:"strict",
//         // secure: process.env.NODE_ENV !== "development"
//     });
//     return token;
// }
