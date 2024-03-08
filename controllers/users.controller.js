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
    new ResponseHanding(res, 200, "Users Retrieved successfully", true, users);
}

exports.getUser = async (req, res) => {
    const user = await USER.findOne({ email: req.params.email })
    new ResponseHanding(res, 200, "User Retrieved successfully", true, user);

}

exports.updateUser = async (req, res) => {
    const { name, email } = req.body
    const user = await USER.findOneAndUpdate({ _id: req.params.id }, { name: name, email: email }, { new: true })
    new ResponseHanding(res, 200, "User Updated successfully", true, user);
}

exports.deleteUser = async (req, res) => {
    const user = await USER.findOneAndDelete({ _id: req.params.id })
    new ResponseHanding(res, 200, "User DELETED successfully", true, user);
}
