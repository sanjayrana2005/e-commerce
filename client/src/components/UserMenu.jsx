import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Divider from './Divider'
import Axios from "../utils/Axios"
import SummaryApi from '../common/summaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
                // headers: {
                // Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                // }
            })

            if (response.data.success) {
                close()
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div>
            <div className='font-medium'>My Account</div>
            <div className='text-sm'>{user.name || user.mobile}</div>

            <Divider />

            <div className='text-sm grid gap-1 px-2'>
                <Link to={""} className='hover:bg-orange-200 py-1'>My Order</Link>
                <Link to={""} className='hover:bg-orange-200 py-1'>Saved Address</Link>
                <button onClick={handleLogout} className='text-left hover:bg-orange-200 py-1'>Log Out</button>
            </div>
        </div>
    )
}


export default UserMenu
