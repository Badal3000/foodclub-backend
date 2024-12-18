// const { getToken } = require("../../todo/utils/auth");
const user = require("../models/users");
const {generateToken, hashPassword, comparePassword} = require("../utils/hash");



exports.signUpUser = (req, res) =>{
    const {fullname, username, password: userPassword, email} = req.body;
    const password = hashPassword(userPassword);
    user.create({ fullname, username, password, email})
    .then((data) => {
        res.status(201).send({
            user,
            status: "success",
            message: "User created successfully"
        });
    })
    .catch((err) => {
        res.status(400).send({message: " Error creating user", ...err});
    });

    
};
exports.loginUser = (req, res) => {
    const {username, password} = req.body;
    console.log(req.body)
    user.find({username}).then( (user) => {
        if(!user || user.length === 0) {
            return res.status(401).send({message: "user not found"});
        }
        const isPasswordValid = comparePassword(password, user[0].password);
        if(!isPasswordValid) {
            return res.status(401).send({message: "Invalid password"});
        }
        res.send(user);
        const token = getToken(user[0]);
        const expires = new Date(Date.now() + 7 * 24 * 60 *60 * 1000);
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            priority: "High",
            maxAge: expires.getTime() - Date.now(),
            expires,
        })
        .send({
            token,
            status: "success",
            message: "User logged in successfully",
        })

    })
    .catch((err) => {
        console.log(err);
        res.status(400).send({message: "Error logging in user", ...err});
    });

};