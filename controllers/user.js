const bcrypt = require('bcryptjs');
const user = require("../models/users");
const { generateToken } = require("../utils/auth");
const { hashPassword } = require("../utils/hash");

exports.signUpUser = (req, res) => {
    const { fullname, username, password: userPassword, email } = req.body;

    // Hash the password before saving
    hashPassword(userPassword).then((hashedPassword) => {
        user.create({ fullname, username, password: hashedPassword, email })
            .then((newUser) => {
                const token = generateToken(newUser); 

                res.cookie('token', token, { 
                    httpOnly: true, 
                    secure: false,  // Set to true if using HTTPS in production
                    maxAge: 7 * 24 * 60 * 60 * 1000 
                });

                res.status(201).send({
                    user: {
                        _id: newUser._id,
                        fullname: newUser.fullname,
                        username: newUser.username,
                        email: newUser.email,
                        role: newUser.role,
                    },
                    token,
                    status: "success",
                    message: "User created successfully"
                });
            })
            .catch((err) => {
                res.status(400).send({
                    message: "Error creating user",
                    error: err.message || err
                });
            });
    }).catch((err) => {
        res.status(500).send({
            message: "Error hashing password",
            error: err.message || err
        });
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    // Find the user by username
    user.findOne({ username }).then((user) => {
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, isPasswordValid) => {
            if (err) {
                return res.status(500).send({ message: "Error comparing passwords", error: err });
            }

            if (!isPasswordValid) {
                return res.status(401).send({ message: "Invalid password" });
            }

            // Generate a token for the authenticated user
            const token = generateToken(user);
            const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

            res.status(200).cookie("token", token, {
                httpOnly: true,
                secure: false,
                maxAge: expires.getTime() - Date.now(),
                expires,
            }).send({
                token,
                status: "success",
                message: "User logged in successfully",
            });
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).send({ message: "Error logging in user", error: err });
    });
};
