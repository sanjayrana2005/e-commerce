import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import axios from 'axios'
import { baseURL } from '../common/summaryApi';

const Register = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const validValue = Object.values(data).every(el => el)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error(
        "Password and Confirm Password must be same"
      )
      return
    }

  }
  return (
    <section className='w-full container mx-auto px-10'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto p-7 rounded-md'>
        <p>Welcome to Binkeyit</p>

        <form className='grid gap-4 mt-6' action="" method='POST' onClick={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              id='name'
              autoFocus
              className='bg-blue-50 p-2 rounded border outline-none focus-within:border-primary-200'
              name="name"
              value={data.name}
              placeholder='Enter your name'
              onChange={handleChange}
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="email">Email :</label>
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
            <label htmlFor="password">Password :</label>
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

          <button disabled={!validValue} className={` ${validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white rounded-sm py-2 my-2 font-semibold tracking-wide hover:bg`}>Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register
