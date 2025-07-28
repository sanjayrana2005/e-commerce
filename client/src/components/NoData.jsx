import React from 'react'
import images from "../assets/images/index"

const NoData = () => {
    return (
        <div className='flex flex-col items-center gap-2'>
            <img
                src={images.noDataImage}
                alt="noDataImage"
                className='w-36'
            />
            <p className='text-neutral-600'>No Data</p>
        </div>
    )
}

export default NoData
