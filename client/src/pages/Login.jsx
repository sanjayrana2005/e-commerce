import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("accesstoken",response.data.data.accesstoken)
        localStorage.setItem("refreshtoken",response.data.data.refreshtoken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        })
        navigate("/")
      }

    } catch (error) {
      AxiosToastError(error)
    }

  }
  return (
    <section className='w-full container mx-auto px-10'>
      <div className='bg-white my-3 w-full max-w-lg mx-auto p-6 rounded-md'>
        <p className='text-center font-medium'>Login</p>

        <form className='grid gap-4 pt-4' method='POST' onSubmit={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor="email" className='hover:cursor-pointer'>Email :</label>
            <input
              type='email'
              id='email'
              required
              className='bg-blue-50 p-2 rounded border outline-none focus-within:border-primary-200'
              name="email"
              value={data.email}
              placeholder='Enter your email'
              onChange={handleChange}
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="password" className='hover:cursor-pointer'>Password :</label>
            <div className='bg-blue-50 p-2 rounded border flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full bg-blue-50 outline-none'
                name="password"
                value={data.password}
                placeholder='Enter your password'
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
                <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot Password ?</Link>
          </div>

          <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}
           text-white rounded-sm py-2 my-2 font-semibold tracking-wide hover:bg`}>
            Login</button>
        </form>

        <p>
          Don't have account ? <Link to={"/register"}
            className='font-medium text-green-700 hover:text-green-800'>Register</Link>
        </p>

      </div>
    </section>
  )
}

export default Login
