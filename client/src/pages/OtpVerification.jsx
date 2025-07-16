import React, { useEffect, useRef, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const OtpVerification = () => {

    const [data, setData] = useState(["", "", "", "", "", ""])
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    }, [])



    const validValue = data.every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setData(["", "", "", "", "", ""])
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email
                    }
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='w-full container mx-auto px-10'>
            <div className='bg-white my-3 w-full max-w-lg mx-auto p-6 rounded-md'>
                <p className='text-center font-medium'>Enter OTP</p>

                <form className='grid gap-4 pt-4' method='POST' onSubmit={handleSubmit}>

                    <div className='grid gap-1'>
                        <label htmlFor="otp" className='hover:cursor-pointer'>Enter Your OTP :</label>
                        <div className='flex items-center gap-2 justify-between mt-3'>
                            {
                                data.map((element, index) => {
                                    return (
                                        <input
                                            key={"otp+index"}
                                            type='text'
                                            id='otp'
                                            ref={(ref) => {
                                                inputRef.current[index] = ref
                                                return ref
                                            }}
                                            value={data[index]}
                                            onChange={(e) => {
                                                const value = e.target.value

                                                const newData = [...data]
                                                newData[index] = value
                                                setData(newData)

                                                if (value && index < 5) {
                                                    inputRef.current[index + 1].focus()
                                                }
                                            }}
                                            maxLength={1}
                                            className='bg-blue-50 w-full max-w-15 p-2 rounded border outline-none
                                          focus-within:border-primary-200 text-center font-medium'
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}
                                        text-white rounded-sm py-2 my-2 font-semibold tracking-wide hover:bg`}>
                        Verify OTP</button>
                </form>

                <p>
                    Already have account ? <Link to={"/login"}
                        className='font-medium text-green-700 hover:text-green-800'>Login</Link>
                </p>

            </div>
        </section>
    )
}

export default OtpVerification

