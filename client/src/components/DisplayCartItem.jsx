import React from 'react'
import { IoClose } from 'react-icons/io5'

const DisplayCartItem = () => {
    return (
        <section className='bg-neutral-900 fixed bottom-0 top-0 left-0 right-0 bg-opacity-60 h-screen'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex justify-between shadow-md p-3 gap-3 '>
                    <h2>Cart</h2>
                    <button><IoClose size={25} /></button>
                </div>
            </div>
        </section>
    )
}

export default DisplayCartItem
