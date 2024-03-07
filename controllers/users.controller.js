const model = require('../model/user.schema');
const ResponseHanding = require('../response.handling');
const USER = model.User

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const findUser = await USER.findOne({ email: email })
    if (findUser) {
        new ResponseHanding(res, 400, "User Already Exists", false, findUser);
    }
    const user = await USER.create({ name, email, password })
    new ResponseHanding(res, 200, "Created User Successfully", true, user);
}

exports.getUsers = async (req, res) => {
    const users = await USER.find().exec()
    res.json({
        statusCode: 200,
        data: users,
        message: 'Users Retrieved successfully',
        success: true
    })
}

exports.getUser = async (req, res) => {
    const user = await USER.findOne({ email: req.params.email })
    res.json({
        statusCode: 200,
        data: user,
        message: 'User Retrieved successfully',
        success: true
    })
}

exports.updateUser = async (req, res) => {
    const { name, email } = req.body
    const user = await USER.findOneAndUpdate({ _id: req.params.id }, { name: name, email: email }, { new: true })
    res.json({
        statusCode: 200,
        data: user,
        message: 'User Updated successfully',
        success: true
    })
}

exports.deleteUser = async (req, res) => {
    const user = await USER.findOneAndDelete({ _id: req.params.id })
    res.json({
        statusCode: 200,
        data: user,
        message: 'User DELETED successfully',
        success: true
    })
}
