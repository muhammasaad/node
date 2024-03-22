const express = require('express');
const router = express.Router()
const authCRUD = require('../controllers/auth.controller')



router
    .post('/signup', authCRUD.signup)
    .post('/verify-user', authCRUD.verifyUser)
    .post('/login', authCRUD.login)
    .post('/reset-password', authCRUD.resetPassword)
    .get('/EmailVerification', authCRUD.userVerifedByEmail)
    .get('/otp', authCRUD.otp)
    .post('/jwt', authCRUD.generateJWT)


exports.router = router