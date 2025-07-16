export const baseURL = "http://localhost:8000"

const SummaryApi = {
    register: {
        url: "api/user/register",
        method: "POST"
    },
    login: {
        url: "api/user/login",
        method: "POST"
    },
    forgot_password: {
        url: "api/user/forgot-password",
        method: "PUT"
    },
    forgot_password_otp_verification: {
        url: "api/user/verify-forgot-password-otp",
        method: "PUT"
    },
    resertPassword: {
        url: "api/user/reset-password",
        method: "PUT"
    },
    refreshToken: {
        url: "api/user/refresh-token",
        method: "POST"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "GET"
    },
    logout: {
        url: "/api/user/logout",
        method: "GET"
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: "PUT"
    },
    updateUserDetails :{
        url : "/api/user/update-user",
        method : "PUT"
    }
}

export default SummaryApi