import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({close,confirm}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-neutral-800 bg-opacity-70 p-5 lg:p-10 flex items-center justify-center'>
      <div className='bg-white w-full max-w-md p-4 rounded'>
        <div className='flex justify-between'>
          <h1 className='font-medium'>Permanent Delete</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <p className='my-4'>Are you sure? Deleted data cannot be recovered</p>
        <div className='w-fit ml-auto flex gap-3'>
          <button onClick={close} className='px-3 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>Cancel</button>
          <button onClick={confirm} className='px-3 py-1 border rounded border-green-600 text-green-500 hover:bg-green-600 hover:text-white'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox
