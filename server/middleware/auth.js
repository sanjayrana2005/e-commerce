const jwt = require("jsonwebtoken")
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1] // ["bearer", "token"]

        if (!token) {
            return res.status(401).json({
                message: "provide token or login first",
                error: true,
                success:false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        if (!decode) {
            return res.status(401).json({
                message: "unauthorizes access",
                error: true,
                success: false
            })
        }
        req.userId = decode.id;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "you have not logged in first login",  
            error: true,
            success: false
        })

    }
}

module.exports = auth;