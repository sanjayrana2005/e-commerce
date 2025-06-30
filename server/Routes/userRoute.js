const express = require("express");
const {registerUser,verifyEmaiController,loginController,
    logoutController,uploadAvatar, updateUserDetails, 
    forgotPassword,verifyForgotPasswordOtp,
    resetPassword,
    refreshToken} = require("../controllers/userController")
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();
router.post("/register",registerUser);
router.post("/verify-email",verifyEmaiController);
router.post("/login",loginController);
router.get("/logout",auth,logoutController);
router.put("/upload-avatar",auth,upload.single("avatar"),uploadAvatar);
router.put("/update-user",auth,updateUserDetails);
router.put("/forgot-password",forgotPassword);
router.put("/verify-forgot-password-otp",verifyForgotPasswordOtp);
router.put("/reset-password",resetPassword);
router.post("/refresh-token",refreshToken);

module.exports = router;