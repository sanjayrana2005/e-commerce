const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div>
        <p>Dear ${name}</p>
        <p>you have requested to resest password, Please use below OTP to reset your password</p>
        <div style="background:yellow;font-size:20px;text-align:center;font-weight:800;padding:10px">
            ${otp}
        </div>
        <p>This OTP is valid for five minutes</p>
        <br />
        <p>Thank you</p>
        <p>Binkeyit</p>
    </div>
    `
}

module.exports = forgotPasswordTemplate;