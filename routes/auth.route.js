const express = require('express');
const router = express.Router()
const authCRUD = require('../controllers/auth.controller')

router
    .post('/signup', authCRUD.signup)
    .post('/login', authCRUD.login)
    .get('/EmailVerification', authCRUD.userVerifedByEmail)
    .get('/otp', authCRUD.otp)
    .post('/jwt', authCRUD.generateJWT)


exports.router = router