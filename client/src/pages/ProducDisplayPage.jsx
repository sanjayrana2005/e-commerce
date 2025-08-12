import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const ProducDisplayPage = () => {

  const params = useParams()
  let productId = params?.product?.split("-").slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(0)

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
  console.log("data", data);

  useEffect(() => {
    fetchProductsDetails()
  }, [params])

  return (
    <section className='container mx-auto p-4 lg:px-10 grid lg:grid-cols-2'>
      <div className=''>
        <div className='bg-white lg:min-h-[59vh] lg:max-h-[59vh] min-h-56 max-h-56 rounded-md h-full w-full'>
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
          <div className='z-10 relative flex gap-3 w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='h-20 w-20 min-h-20 min-w-20 shadow-md ' key={img + index}>
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
          <div className='w-full h-full flex justify-between absolute -mx-4'>
            <button className='bg-white w-5'>
              <FaAngleLeft />
            </button>
            <button className='bg-white w-5'>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </section>
  )
}

export default ProducDisplayPage
