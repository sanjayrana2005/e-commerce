const jwt = require("jsonwebtoken");

const generateAccessToken = async (userId) => {
    const token =  jwt.sign({ id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: "15m" })

        return token
}

module.exports = generateAccessToken;