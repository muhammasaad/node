const model = require('../model/user.schema');
const ResponseHanding = require('../response.handling');
const USER = model.User

exports.getUser = async (req, res) => {
    try {
        const user = await USER.findOne({ _id: req.params.id })
        if (user) {
            return new ResponseHanding(res, 200, "User Found", true, user);
        }
        return new ResponseHanding(res, 400, "User Not Found", false);
    } catch (error) {
        return new ResponseHanding(res, 500, "Internal Server Error", false, error.message);   
    }
}