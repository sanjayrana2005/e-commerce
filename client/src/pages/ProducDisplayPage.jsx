import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import DisplayPriceInRupee from '../utils/DisplayPriceInRupee'
import Divider from '../components/Divider'
import images from '../assets/images'
import priceWithDiscount from '../utils/PriceWithDiscount'
import toast from 'react-hot-toast'
import AddToCartButton from '../components/AddToCartButton'

const ProducDisplayPage = () => {

  const params = useParams()
  let productId = params?.product?.split("-").slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductsDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <section className='container mx-auto p-4 lg:px-10 grid lg:grid-cols-2'>
      <div className=''>
        <div className='bg-transparent border border-slate-300 lg:min-h-[45vh] lg:max-h-[45vh] min-h-56 max-h-56 rounded-md h-full w-full'>
          <img
            src={data.image[image]}
            alt={`${data.name} image`}
            className='w-full h-full object-scale-down'
          />
        </div>

        <div className='flex items-center justify-center gap-4'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-200 w-3 h-3 lg:w-4 lg:h-4 my-2 rounded-full ${index === image && "bg-slate-400"}`}>
                </div>
              )
            })
          }
        </div>

        <div className='grid relative'>
          <div ref={imageContainer} className='z-10 relative flex gap-3 w-full overflow-x-auto scrollbar-none lg:ml-4'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='lg:h-20 lg:w-20 h-14 w-14 lg:min-h-20 lg:min-w-20 min-w-14 min-h-14 shadow-md ' key={img + index}>
                    <img
                      src={img}
                      alt={`small image of ${data.name}`}
                      className='w-full h-full object-scale-down cursor-pointer rounded-md'
                      onClick={() => setImage(index)}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className='hidden  w-full h-full lg:flex items-center justify-between absolute -ml-3'>
            <button onClick={handleScrollLeft} className='z-10 relative bg-white p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 relative bg-white p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className='mt-3 hidden lg:grid gap-1'>
          <div>
            <p className='font-medium '>Description</p>
            <p className='text-sm'>{data.description}</p>
          </div>
          <div>
            <p className='font-medium '>Unit</p>
            <p className='text-sm'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-medium '>{element}</p>
                  <p className='text-sm'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='p-2 lg:pl-6 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit p-1 rounded'>10 min</p>
        <h2 className='text-lg font-medium lg:text-2xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <div>
          <p>Price</p>

          <div className='flex items-center gap-2 lg:gap-3'>
            <div className='mt-1 border border-green-600 px-2 py-1 rounded bg-green-100 w-fit'>
              <p className='font-medium text-lg lg:text-xl'>{DisplayPriceInRupee(priceWithDiscount(data.price, data.discount))}</p>
            </div >
            {
              data.discount ? <p className='line-through text-base font-normal'>{DisplayPriceInRupee(data.price)}</p> : ""
            }
            {data.discount ? <p className='mt-1 font-semibold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base font-normal sm:font-medium lg:text-lg text-neutral-500'>Discount</span></p> : ""
            }
          </div>
        </div>

        {/* for out of stock or add to cart */}
        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 mt-1'>Out of Stock</p>
          ) : (
            /* <button onClick={handleAddToCart} className='mt-2 px-5 py-1 bg-green-500 hover:bg-green-600 text-white rounded'>Add</button> */
            <div className='mt-2 py-1 w-20'>
              <AddToCartButton data={data} />
            </div>

          )
        }


        <h2 className='font-medium'>Why shop from binkeyit?</h2>
        <div>
          <div className='flex items-center gap-3 mt-2'>
            <img
              src={images.minuteDelivery}
              alt="superfastDelivery image"
              className='w-20 h-20 '
            />
            <div className='text-sm'>
              <div className='font-normal'>Superfast Delivery</div>
              <p>Get your order delivered to your doorstop at the earliest from dark stores near you.</p>
            </div>
          </div>

          <div className='flex items-center gap-3 mt-2'>
            <img
              src={images.bestPrice}
              alt="best price offers image"
              className='w-20 h-20 '
            />
            <div className='text-sm'>
              <div className='font-normal'>Best Prices & Offers</div>
              <p>Best price destination with offers directly from .</p>
            </div>
          </div>

          <div className='flex items-center gap-3 mt-2'>
            <img
              src={images.wideDinkeyit}
              alt="wide Assortment image"
              className='w-20 h-20 '
            />
            <div className='text-sm'>
              <div className='font-normal'>Wide Assortment</div>
              <p>Choose from 5000+ products accross foods, personal care, household & other category.</p>
            </div>
          </div>
        </div>
        
        <div className='mt-3 grid lg:hidden gap-1'>
          <div>
            <p className='font-medium '>Description</p>
            <p className='text-sm'>{data.description}</p>
          </div>
          <div>
            <p className='font-medium '>Unit</p>
            <p className='text-sm'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className='font-medium '>{element}</p>
                  <p className='text-sm'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

    </section>
  )
}

export default ProducDisplayPage
