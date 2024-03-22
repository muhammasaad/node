const model = require('../model/teacher.schema');
const ResponseHanding = require('../response.handling');
const TEACHER = model.Teacher

exports.createTeacher = async (req, res) => {
    const { firstName, lastName, email, gender, phoneNumber, bloodGroup, religion, classes, address } = req.body
    if (!firstName || !lastName || !email || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required." });
    }
    const teacher = await TEACHER.findOne({ email: email })
    if (teacher) {
        return new ResponseHanding(res, 200, "Teacher Already Exists", false);
    }
    const newTeacher = await TEACHER.create({ firstName, lastName, email, gender, phoneNumber, bloodGroup, religion })
    newTeacher.classes.push(classes)
    newTeacher.address.push(address)
    await newTeacher.save()
    return new ResponseHanding(res, 200, "Teacher Added to Database", true, newTeacher);
}