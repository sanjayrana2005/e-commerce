import Axios from "./Axios"
import SummaryApi from "../common/summaryApi"

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response.data
    } catch (error) {
        return error
    }
}

export default fetchUserDetails