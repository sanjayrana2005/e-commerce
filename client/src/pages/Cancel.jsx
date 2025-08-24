import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <section className='p-2 my-5'>
            <div className=' w-full max-w-md bg-red-400 px-3 py-4 rounded mx-auto flex flex-col items-center'>
                <p className='font-medium text-red-800 text-center'>Order Canceled</p>
                <Link to={"/"} className='border rounded px-4 py-2 mt-4 border-red-800 hover:bg-red-700 text-white transition-all'>Go to Home</Link>
            </div>

        </section>
    )
}

export default Cancel
