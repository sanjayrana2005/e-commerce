import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation()

  return (
    <section className='p-2 my-5'>
    <div className=' w-full max-w-md bg-green-400 px-3 py-4 rounded mx-auto flex flex-col items-center'>
      <p className='font-medium text-green-800 text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successsfully</p>
      <Link to={"/"} className='border rounded px-4 py-2 mt-4 border-green-800 hover:bg-green-700 text-white transition-all'>Go to Home</Link>
    </div>
      
    </section>
  )
}

export default Success
