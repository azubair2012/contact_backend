const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "User name is Required"],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
    },
    password: {
        type: String,
        required: [true, "password is Required"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);