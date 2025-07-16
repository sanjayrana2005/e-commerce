import React, { useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { updateAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";

const UserProfileEdit = ({ close }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadAvatar = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append("avatar", file)

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData
            })
            const { data: responseData } = response
            dispatch(updateAvatar(responseData.data.avatar))

        } catch (error) {
            AxiosToastError(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900
             bg-opacity-60 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded-sm p-4 flex flex-col items-center justify-center'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                    <IoClose size={20} />
                </button>
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

                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadProfile">
                        <div className='border border-primary-200 hover:bg-primary-200
                              px-4 py-1 rounded-md my-3 cursor-pointer'>
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                        <input onChange={handleUploadAvatar} type="file" accept="image/*" id="uploadProfile" className='hidden' />
                    </label>
                </form>

            </div>
        </section>
    )
}

export default UserProfileEdit
