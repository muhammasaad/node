const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, required: true, default: '', unique: true, index: true },
    email: {
        type: String, required: true, unique: true, trim: true, index: true, validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false, default: ''},
    isEmailVerified: { type: Boolean, default: false },
    otp: String,
    profilePic: { }
})

exports.User = mongoose.model('Users', userSchema)