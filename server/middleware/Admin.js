const userModel = require("../models/user-models")

const admin = async (req, res, next) => {
    try {
        const userId = req.userId

        const user = await userModel.findById(userId)

        if(user.role !== "ADMIN") {
            return res.status(400).json({
                message: "Permission denied",
                error: true,
                success: false
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            message: "Permission denied",
            error: true,
            success: false
        })
    }
} 
module.exports = admin