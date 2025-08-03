import React from 'react'
import { useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import { IoSearch } from "react-icons/io5";


const ProductPage = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("")

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        setProductData(responseData.data)

        const totalPages = Math.ceil(responseData.totalCount / 12);
        setTotalPageCount(totalPages);
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally {
      setLoading(false)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1)
    }
  }

  const handleSeacrhOnchanges = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }


  useEffect(() => {
    fetchProductData()
  }, [page])

  useEffect(() => {
    let flag = true

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300)
    return () => {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-medium'>Products</h2>
        {/* search box */}
        <div className='h-full min-w-24  ml-auto bg-blue-100 px-2 p-1 flex items-center gap-2 rounded border focus-within:border-primary-200'>
          <IoSearch size={25} />
          <input
            className=' w-full h-full outline-none bg-transparent'
            placeholder='Search products here ...'
            type="text"
            name="searchBox"
            value={search}
            onChange={handleSeacrhOnchanges}
          />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }
      <div className='p-4
      bg-blue-50'>
        <div className='min-h-[56vh]'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {
              productData.map((product, index) => {
                return (
                  <ProductCard key={product._id || index} data={product} />
                )
              })
            }
          </div>
        </div>

        {/* // pagination */}

        <div className='relative flex items-center justify-between my-4'>
          {
            page !== 1 ? (
              <button onClick={handlePreviousPage} className='border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-sm'>
                Previous
              </button>
            ) : (
              <div className='w-[80px]'></div>
            )
          }
          <div className='absolute left-1/2 -translate-x-1/2'>
            <button className='px-4 py-1 bg-slate-100 rounded-sm'>
              {page}/{totalPageCount}
            </button>
          </div>
          <button onClick={handleNextPage} className='border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-sm'>
            Next
          </button>
        </div>
      </div>

    </section>

  )
}

export default ProductPage
