import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import UserProfileEdit from '../components/UserProfileEdit';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/summaryApi';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
    const [userData, setUserData] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    })
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        })
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div className='p-4'>

            {/* profile upload and display */}
            <div className='w-20 h-20 flex items-center justify-center rounded-full
             bg-yellow-500 overflow-hidden drop-shadow-md '>
                {
                    user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className='w-full h-full '
                        />
                    ) : (
                        <FaRegCircleUser size={65} />
                    )
                }
            </div>
            <button onClick={() => setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-primary-100 px-3 
            py-1 rounded-full mt-3 hover:border-primary-200 hover:bg-primary-200'>
                Edit
            </button>
            {
                openProfileAvatarEdit && (
                    <UserProfileEdit close={() => setProfileAvatarEdit(false)} />
                )
            }

            {/* user details,mobile, change password */}

            <form className='my-3 grid' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label htmlFor='name'>Name</label>
                    <input type="text"
                        id='name'
                        placeholder='Your Name'
                        className='p-2 bg-blue-50 outline-none border
                        focus-within:border-primary-200 rounded-md'
                        value={userData.name}
                        name="name"
                        onChange={handleOnchange}
                    />
                </div>
                <div className='grid my-1'>
                    <label htmlFor='email'>Email</label>
                    <input type="email"
                        id='email'
                        placeholder='Your Email'
                        className='p-2 bg-blue-50 outline-none border
                        focus-within:border-primary-200 rounded-md'
                        value={userData.email}
                        name="email"
                        onChange={handleOnchange}
                    />
                </div>
                <div className='grid my-1'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input type="text"
                        id='mobile'
                        placeholder='Your mobile'
                        className='p-2 bg-blue-50 outline-none border
                        focus-within:border-primary-200 rounded-md'
                        value={userData.mobile}
                        name="mobile"
                        onChange={handleOnchange}
                    />
                </div>

                <button onClick={handleSubmit} className='border border-primary-100 px-4 py-2 font-medium my-1
                hover:bg-primary-100 text-primary-200 hover:text-neutral-800 rounded-md'>
                    {
                        loading ? "Loading..." : "Submit"
                    }
                </button>


            </form>



        </div>
    )
}

export default Profile
