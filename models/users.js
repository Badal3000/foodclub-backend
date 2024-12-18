const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        // unique: true,
        // required: true,
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        // unique:true
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "admin", "superadmin"]
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;