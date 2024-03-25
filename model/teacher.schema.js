const mongoose = require('mongoose');
const { Schema } = mongoose

const teacherSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String, required: true, unique: true, trim: true, index: true, validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: false,
        default: 'male'
    },
    uploadPic: {
        type: String,
    },
    phoneNumber: { type: String, required: true, default: '' },
    DOB: { type: Date, required: false },
    bloodGroup: { type: String, required: false },
    religion: { type: String, required: false, default: 'islam' },
    classes: [{ type: Number, required: true }],
    address: [String],
    hiring: {
        type: Date,
        required: true,
        default: Date.now,
    },
    profilePic: { type: String }
})

exports.Teacher = mongoose.model('Teachers', teacherSchema)