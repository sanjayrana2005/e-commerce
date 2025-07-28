import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from "../utils/Axios"
import SummaryApi from '../common/summaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin'


const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            })

            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }
    return (
        <div>

            <div className='font-medium'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>
                    {user.name || user.mobile}  <span className='font-medium text-primary-200'>{user.role === "ADMIN" ? "ADMIN" : ""}</span>
                </span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>
                    <HiOutlineExternalLink size={15} />
                </Link>
            </div>

            <Divider />

            <div className='text-sm grid gap-1 px-2'>

                {
                    isAdmin(user.role) && (<Link onClick={handleClose} to={"/dashboard/category"} className='hover:bg-orange-200 py-1 px-2'>
                        Category
                    </Link>)
                }
                {
                    isAdmin(user.role) && (<Link onClick={handleClose} to={"/dashboard/sub-category"} className='hover:bg-orange-200 py-1 px-2'>
                        Sub category
                    </Link>)
                }
                {
                    isAdmin(user.role) && (<Link onClick={handleClose} to={"/dashboard/upload-product"} className='hover:bg-orange-200 py-1 px-2'>
                        Upload product
                    </Link>)
                }
                {
                    isAdmin(user.role) && (<Link onClick={handleClose} to={"/dashboard/product"} className='hover:bg-orange-200 py-1 px-2'>
                        Product
                    </Link>)
                }

                <Link onClick={handleClose} to={"/dashboard/myorder"} className='hover:bg-orange-200 py-1 px-2'>
                    My Order
                </Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='hover:bg-orange-200 py-1 px-2'>
                    Saved Address
                </Link>
                <button onClick={handleLogout} className='text-left hover:bg-orange-200 py-1 px-2'>
                    Log Out
                </button>
            </div>
        </div >
    )
}


export default UserMenu
