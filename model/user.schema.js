const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String, required: false, default: '' },
    email: {
        type: String, required: true, unique: true, trim: true, index: true, validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: true, default: false },
    otp: String
})

exports.User = mongoose.model('Users', userSchema)