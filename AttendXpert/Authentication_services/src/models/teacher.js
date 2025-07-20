const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type:String,
        required:true,
    },
    teacher_name: {
        type: String,
        required: true
    },
    teacher_address: {
        type: String,
        required: true
    },
    teacher_dob: {
        type: Date,
        required: true
    },
    teacher_number: {
        type: String,
        required: true
    },
    teacher_parentsnumber: {
        type: String,
        required: true
    },
    teacher_mothername: {
        type: String,
        required: true
    },
    teacher_fathername: {
        type: String,
        required: true
    },
    teacher_category: {
        type: String,
        required: true
    },
    teacher_gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    teacher_photo: {
        type: String // Assuming storing photo URL
    },
    teacher_mail:{
        type:String
    },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
