const jwt = require("jsonwebtoken")
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1] // ["bearer", "token"]

        if (!token) {
            return res.status(401).json({
                message: "provide token",
                error:true
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        if(!decode){
            return res.status(401).json({
                message:"unauthorizes access",
                error:true,
                success:false
            })
        }

        req.userId=decode.id;
        next();
        // console.log("decode", decode);
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

module.exports = auth;