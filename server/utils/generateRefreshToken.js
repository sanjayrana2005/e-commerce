const userModel = require("../models/user-models");
const jwt = require("jsonwebtoken");

const generateRefreshToken = async (userId) => {
    const token =  jwt.sign({ _id: userId },
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn: "7d" }
    )
    const updateRefreshToken = await userModel.updateOne({ _id: userId },
        { refresh_token: token }
    )

    return token
}

module.exports = generateRefreshToken;