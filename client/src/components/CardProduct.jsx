import React from 'react'
import DisplayPriceInRupee from '../utils/DisplayPriceInRupee'
import { Link } from 'react-router-dom'
import ValideURLConvert from "../utils/ValideURLConvert"
import priceWithDiscount from '../utils/PriceWithDiscount'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AddToCartButton from './AddToCartButton'



const CardProduct = ({ data }) => {

  const url = `/product/${ValideURLConvert(data.name)}-${data._id}`

  return (
    <div className='border p-1 lg:p-4 grid gap-1 lg:gap-2 min-w-33 lg:min-w-52 rounded my-2 bg-white'>
      <Link to={url} className='min-h-20 w-full max-h-24 lg:max-h-32 rounded'>
        <img
          src={data.image[0]}
          alt={`${data.name} image`}
          className='w-full h-full  object-scale-down lg:scale-125'
        />
      </Link>

      <div className='flex items-center gap-1 justify-between sm:justify-normal'>
        <div className='rounded-sm text-xs w-fit  px-2 py-1  text-green-600 bg-green-200 mt-4'>
          10 min
        </div>
        <div>
          {
            data.discount ? <p className='rounded-sm text-xs w-fit  px-2 py-1  text-green-600 bg-green-200 mt-4'>{data.discount}% off</p> :
              <p className='rounded-sm text-xs w-fit  px-2 py-1  text-green-600 bg-green-200 mt-4 hidden'>{data.discount}% off</p>
          }
        </div>
      </div>

      <div className='font-normal text-sm lg:text-base text-ellipsis line-clamp-1 leading-6'>
        {data.name}
      </div>

      <div className='text-sm lg:text-base w-fit text-ellipsis line-clamp-1'>
        {data.unit}
      </div>

      <div className='flex items-center justify-between gap-2 lg:gap-3 text-sm lg:text-base'>
        <div className='font-semibold flex items-center flex-col lg:flex-row lg:gap-2'>
          <p>{DisplayPriceInRupee(priceWithDiscount(data.price, data.discount))}</p>
          {
            data.discount ?
              <p className='text-xs line-through'>{DisplayPriceInRupee(data.price)}</p> : ""
          }
        </div>

        <div className="">
          {
            data.stock == 0 ? (
              <p className='text-xs text-red-600'>Out of stock</p>
            ) : (
              <AddToCartButton data={data}/>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default CardProduct
