import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({ url,close }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 z-50 p-4 flex justify-center items-center'>
      <div className='max-w-xs w-full max-h-[65vh] p-2 bg-white rounded-md'>
      <button onClick={close} className='ml-auto block' >
          <IoClose size={25} />
        </button>
        <img
          src={url}
          alt="full screen"
          className='w-full h-full object-scale-down'
        />
      </div>
    </div>
  )
}

export default ViewImage
