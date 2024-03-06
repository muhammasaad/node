exports.createUser = async (req, res) => {
    res.status(200).json({
        success: "User has been created"
    })
    console.log("this is create User")
}