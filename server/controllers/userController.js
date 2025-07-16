const userModel = require("../models/user-models");
const sendEmail = require("../config/sendEmail");
const bcrypt = require("bcryptjs");
const { verifyEmailTemplate } = require("../utils/verifyEmailTemplate");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const uploadImageCloudinary = require("../utils/uploadImageCloudinary");
const generateOtp = require("../utils/generateOtp");
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate");
const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Provide email, name, and password",
                error: true,
                success: false,
            });
        }

        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({
                message: "Already registered email",
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword,

        });

        const verifyEmailURL = `${process.env.FRONTEND_URL}/verify-email?code=${newUser._id}`
        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "verify email from Binkeyit",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailURL
            })
        })
        return res.json({
            message: "User registered successfully",
            error: false,
            success: true,
            data: newUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

const verifyEmaiController = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await userModel.findOne({ _id: code })

        if (!user) {
            return res.status(400).json({
                message: error.message || error,
                error: true,
                succes: false
            })
        }
        const updateUser = await userModel.updateOne({ _id: code }, {
            verify_email: true
        })
        return res.json({
            message: "verified email",
            error: true,
            succes: false
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            succes: false
        })
    }
}

// login controller 
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "provide email or passord",
                error: true,
                succes: false
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "user not registered. Please register",
                error: true,
                succes: false
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "check password or email",
                error: true,
                succes: false
            })
        }

        const accesstoken = await generateAccessToken(user._id);
        const refreshtoken = await generateRefreshToken(user._id);

        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie("accessToken", accesstoken, cookieOption)
        res.cookie("refreshToken", refreshtoken, cookieOption)

        return res.json({
            message: "login successfuly",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshtoken
            }
        })

        // if (user.status !== "Active") {
        //     return res.status.json({
        //         message: "contact to admin",
        //         error: true,
        //         succes: false
        //     })
        // }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            succes: false
        })
    }

}

// logout controller
const logoutController = async (req, res) => {
    try {
        const userid = req.userId //middleware

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie("accessToken", cookieOption);
        res.clearCookie("refreshToken", cookieOption);

        const removeRefreshToken = await userModel.findByIdAndUpdate(userid, {
            refresh_toke: ""
        })

        return res.json({
            message: "logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            succes: false
        })
    }

}

//upload user avatar
const uploadAvatar = async (req, res) => {
    try {
        const userId = req.userId  // auth middleware
        const image = req.file;    // multer middleware
        const upload = await uploadImageCloudinary(image)

        const updateUser = await userModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.json({
            message: "uploaded image",
            error:false,
            success:true,
            data: {
                _id: userId,
                avatar: upload.url
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

//update user details
const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId  // autth middleware
        const { name, email, password, avatar, mobile } = req.body

        if (password) {
            const salt = await bcrypt.genSalt(10)
            hashPassword = await bcrypt.hash(password, salt)
        }

        const updateUser = await userModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(password && { password: hashPassword }),
            ...(mobile && { mobile: mobile }),
            ...(avatar && { avatar: avatar }),
        })

        return res.json({
            message: "updated successfully",
            error: false,
            success: true,
            data: updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// forgot password user not login
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).json({
                message: "user does not exists",
                error: true,
                success: false
            })
        }
        const otp = generateOtp()
        const expireTime = new Date(new Date().getTime() + 5 * 60 * 1000) // 5 min
        const update = await userModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: expireTime.toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot passowrd from Binkeyit",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })
        return res.json({
            message: "check your Email",
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

//verify forgot otp
const verifyForgotPasswordOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide required field email or OTP",
                error: true,
                succes: false
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(500).json({
                message: "user does not exists",
                error: true,
                success: false
            })
        }
        const currentTime = new Date()

        if (currentTime > user.forgot_password_expiry) {
            return res.status(400).json({
                message: "OTP has expired",
                error: true,
                success: false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            })
        }

        // if otp not expire
        //otp === user.forgot_password_otp
        const updateUser = await userModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp : "",
            forgot_password_expiry : ""
        })
        return res.json({
            message: "Verfiy OTP successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }
}

//reset password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "provide required fields"
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New Password and Confirm Password must be same",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)

        const update = await userModel.findOneAndUpdate(user._id, {
            password: hashPassword,
        })

        return res.json({
            message: "password changed successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// refrench token controller

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1] // [bearer token]

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid Token",
                error: true,
                success: false,
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env
            .SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }
        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken(userId)

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie("accessToken", newAccessToken, cookieOption)

        return res.json({
            message: "New access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// get login user details 
const userDetails = async (req, res) => {
    try {
        const userId = req.userId

        const user = await userModel.findById(userId).select("-password -refresh_token")
        return res.json({
            message: "user details",
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message:"Somethig is wrong",
            error:true,
            success:false
        })
    }
}


module.exports = {
    registerUser, verifyEmaiController,
    loginController, logoutController, uploadAvatar,
    updateUserDetails, forgotPassword, verifyForgotPasswordOtp,
    resetPassword, refreshToken, userDetails
}