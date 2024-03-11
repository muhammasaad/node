const model = require('../model/user.schema');
const ResponseHanding = require('../response.handling');
const USER = model.User
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const otp = require('otp-generator')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    const findUser = await USER.findOne({ email: email })
    if (findUser) {
        return new ResponseHanding(res, 400, "User Already Exists", false, findUser);
    }
    const user = await USER.create({ name, email, password })
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    await user.save()
    return new ResponseHanding(res, 200, "Created User Successfully", true, user);
}

exports.userVerifedByEmail = async (req, res) => {
    const transport = await nodemailer.createTransport({
        host: process.env.SMTP,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: "rrohamsaad@gmail.com",
            pass: process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: "rrohamsaad@gmail.com",
        to: 'msaadamin0334@gmail.com',
        subject: 'OTP For verification',
        text: `Verification Code to walk-in: 123456`,
    };

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            return new ResponseHanding(res, 500, "Failed to send OTP", false)
        } else {
            console.log('Email sent successfully');
            return new ResponseHanding(res, 200, "Email sent successfully", true)
        }
    })
}

exports.otp = async (req, res) => {
    const generateOTP = await otp.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false })
    return new ResponseHanding(res, 200, "OTP has been Generated", true, generateOTP)
}

exports.generateJWT = async (req, res) => {
    const { email } = req.body
    const generatedJWToken = await jwt.sign({ email: email }, process.env.SECRET_KEY)
    return new ResponseHanding(res, 200, "Token is generated", true, generatedJWToken)
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await USER.findOne({ email: email })
    if (!findUser) {
        return new ResponseHanding(res, 400, "Email is incorrect", false);
    }
    const comparePassword = await bcrypt.compare(password, findUser.password)
    if (!comparePassword) {
        return new ResponseHanding(res, 200, "Password is incorrect", false);
    }
    return new ResponseHanding(res, 200, "Login Successfully", true);
}

