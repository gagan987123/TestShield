const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "candidate"],
        default: "candidate",
    },
    base64Image: {
        type: String, // base64 string
        default: "",
    },
});

module.exports = mongoose.model("User", userSchema);