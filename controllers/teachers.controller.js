const model = require('../model/teacher.schema');
const ResponseHanding = require('../response.handling');
const TEACHER = model.Teacher

exports.singleUpload = async (req, res) => {
    try {
        if (!req.file) {
            return new ResponseHanding(res, 400, "image not uploaded", false);
        }
        // const images = req.files.map((file) => file.path);
        const image = req.file.path;
        return new ResponseHanding(res, 200, "Image has been Uploaded", true, image);
    } catch (error) {
        return new ResponseHanding(res, 500, "Internal Server Error", false, error.message);
    }
};
exports.createTeacher = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, phoneNumber, bloodGroup, religion, classes, address, date, month, year } = req.body
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
    } catch (error) {
        return new ResponseHanding(res, 500, "Internal Server Error", false, error.message);
    }
}

exports.saveDate = async (req, res) => {
    try {
        const { date, month, year } = req.body
        if (!date || !month || !year) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const DOB = new Date(year, month, date)
        DOB.setHours(0, 0, 0, 0);
        return new ResponseHanding(res, 200, "DOB Updated", true, DOB);
    } catch (error) {
        return new ResponseHanding(res, 500, "Internal Server Error", false, error.message);
    }
}