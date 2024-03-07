const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    name: { type: String, required: false, default: '' },
    email: { type: String, required: true, unique: true, trim: true, index: true },
    password: { type: String, required: true }
})

exports.User = mongoose.model('Users', userSchema)