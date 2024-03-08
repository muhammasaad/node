const model = require('../model/user.schema');
const ResponseHanding = require('../response.handling');
const USER = model.User
const bcrypt = require('bcrypt')

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