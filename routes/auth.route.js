const express = require('express');
const router = express.Router()
const authCRUD = require('../controllers/auth.controller')

router
    .post('/signup', authCRUD.signup)
    .post('/login', authCRUD.login)


exports.router = router