import React, { useEffect, useState, } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)


    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const validValue = Object.values(data).every(el => el)

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }
        if (location?.state?.email) {
            setData((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email
                }
            })
        }
    }, [])

    console.log("kkk", data)
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.newPassword !== data.confirmPassword){
            toast.error("New password and Confirm password must be same")
        }

        try {
            const response = await Axios({
                ...SummaryApi.resertPassword,  // api end point
                data: data
            })
            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email: "",
                    newPassword:"",
                    confirmPassword:""
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='w-full container mx-auto px-10'>
            <div className='bg-white my-3 w-full max-w-lg mx-auto p-6 rounded-md'>
                <p className='text-center font-medium'>Reset Password</p>

                <form className='grid gap-4 pt-4' method='POST' onSubmit={handleSubmit}>

                    <div className='grid gap-1'>
                        <label htmlFor="email" className='hover:cursor-pointer'>Email :</label>
                        <input
                            type='email'
                            id='email'
                            required
                            className='bg-blue-50 p-2 rounded border outline-none '
                            name="email"
                            value={data.email}
                            readOnly
                            placeholder='Enter your email'
                            onChange={handleChange}
                        />
                    </div>

                    <div className='grid gap-1'>
                        <label htmlFor="password" >New Password :</label>
                        <div className='bg-blue-50 p-2 rounded border flex items-center focus-within:border-primary-200'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                className='w-full bg-blue-50 outline-none'
                                name="newPassword"
                                value={data.newPassword}
                                placeholder='Enter your new password'
                                onChange={handleChange}
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaRegEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>

                        </div>
                    </div>

                    <div className='grid gap-1'>
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className='bg-blue-50 p-2 rounded border flex items-center focus-within:border-primary-200'>
              <input
                type="password"
                id='confirmPassword'
                className='w-full bg-blue-50 outline-none'
                name="confirmPassword"
                value={data.confirmPassword}
                placeholder='Confirm your password'
                onChange={handleChange}
              />
            </div>
          </div>

                    <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}
                                                text-white rounded-sm py-2 my-2 font-semibold tracking-wide hover:bg`}>
                        Reset Password</button>
                </form>

                <p>
                    Already have account ? <Link to={"/login"}
                        className='font-medium text-green-700 hover:text-green-800'>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default ResetPassword
