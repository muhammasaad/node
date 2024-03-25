const express = require('express');
const router = express.Router()
const teachersCRUD =  require('../controllers/teachers.controller')
const { upload } = require('../middlewares/multer')
const { AuthGuard } = require('../middlewares/authGuard')

router
    .post('/', AuthGuard, teachersCRUD.createTeacher)
    .get('/upload-pic', upload.single('image'), teachersCRUD.singleUpload)
    .get('/save-date', teachersCRUD.saveDate)

exports.router = router