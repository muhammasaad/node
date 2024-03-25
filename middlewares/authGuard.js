const jwt = require('jsonwebtoken')
const ResponseHanding = require('../response.handling');
const model = require('../model/user.schema');
const USER = model.User

exports.AuthGuard = async (req, res, next) => {
    const token = req.get('Authorization').split('Bearer ')[1];
    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        if (verify.email) {
            console.log(token)
            const user = await USER.findOne({ email: verify.email })
            if (user) {
                next();
            } else {
                return new ResponseHanding(res, 401, "Token Expired ");
            }
        }
        else {
            return new ResponseHanding(res, 401, "Unauthorized ");
        }
    } catch (error) {
        return new ResponseHanding(res, 401, "Unauthorized");
    }
}

