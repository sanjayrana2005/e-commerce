import axios from 'axios'
import SummaryApi, { baseURL } from '../common/summaryApi'

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

// sending access token oh the header

Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accesstoken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// extend the life span of token with the help of refresh token

Axios.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = localStorage.getItem("refreshtoken")

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken)

                if (newAccessToken) {
                    localStorage.setItem("accesstoken", newAccessToken)
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originalRequest)
                }
                else {
                    // Redirect to login if refresh fails
                    localStorage.removeItem("accesstoken");
                    window.location.href = "/login";
                }
            }
        }

        return Promise.reject(error)
    }
)

const refreshAccessToken = async () => {    // refreshToken in parameter
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            withCredentials: true
        })
        const accessToken = response.data.data.accessToken
        // localStorage.setItem("accessToken", accessToken)
        return accessToken
    } catch (error) {
        return error
    }
}
export default Axios