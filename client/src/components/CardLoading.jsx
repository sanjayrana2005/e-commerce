import React from 'react'

const CardLoading = () => {
  return (
    <div className='border p-2 grid gap-2 
    min-w-32 md:min-w-48 lg:min-w-48 rounded animate-pulse'>
      <div className='min-h-24 bg-blue-50 rounded'>

      </div>

      <div className='p-2 lg:p-3 bg-blue-50 rounded w-20'>

      </div>

      <div className='p-2 lg:p-3 bg-blue-50 rounded'>

      </div>

      <div className='p-2 lg:p-3 bg-blue-50 rounded w-14'>

      </div>

      <div className='flex items-center justify-between gap-3'>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-12 sm:w-20'></div>
        <div className='p-2 lg:p-3 bg-blue-50 rounded w-12 sm:w-20'></div>
      </div>
    </div>
  )
}

export default CardLoading
