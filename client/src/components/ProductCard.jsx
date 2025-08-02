import React from 'react'

const ProductCard = ({ data }) => {
    return (
        <div className='w-full p-2 bg-white rounded-md'>
            <div className='w-full h-32'>
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-full object-scale-down'
                />
            </div>
            <p className='text-ellipsis line-clamp-2 font-normal'>{data?.name}</p>
            <p className='text-slate-400'>{data?.unit}</p>
        </div>
    )
}

export default ProductCard
