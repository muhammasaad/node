const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    email: String
})
exports.user = mongoose.model('User', userSchema)