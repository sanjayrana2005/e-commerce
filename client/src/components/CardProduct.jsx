import React from 'react'
import DisplayPriceInRupee from '../utils/DisplayPriceInRupee'
import { Link } from 'react-router-dom'
import ValideURLConvert from "../utils/ValideURLConvert"


const CardProduct = ({ data }) => {

  const url = `/product/${ValideURLConvert(data.name)}-${data._id}`


  return (
    <Link to={url} className='border p-1 lg:p-4 grid gap-1 lg:gap-2 min-w-32 lg:min-w-52 rounded my-2 bg-white'>
      <Link to={url} className='min-h-20 w-full max-h-24 lg:max-h-32 rounded'>
        <img
          src={data.image[0]}
          alt={`${data.name} image`}
          className='w-full h-full  object-scale-down lg:scale-125'
        />
      </Link>

      <div className='rounded-sm text-xs w-fit  px-2 py-1  text-green-600 bg-green-200 mt-4'>
        10 min
      </div>

      <div className='font-normal text-sm lg:text-base text-ellipsis line-clamp-1 leading-4.5'>
        {data.name}
      </div>

      <div className='text-sm lg:text-base w-fit text-ellipsis line-clamp-1'>
        {data.unit}
      </div>

      <div className='flex items-center justify-between gap-2 lg:gap-3 text-sm lg:text-base'>
        <div className='font-semibold'>
          {DisplayPriceInRupee(data.price)}
        </div>
        <div className="">
          <button className='text-sm lg:text-base bg-green-600  hover:bg-green-700 text-white px-3 py-1 rounded'>
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}

export default CardProduct
