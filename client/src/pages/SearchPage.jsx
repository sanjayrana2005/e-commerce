import React, { useEffect, useState } from 'react'
import CardLoading from "../components/CardLoading"
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from 'react-router-dom'
import images from '../assets/images'

const SearchPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProducts,
        data: {
          search: searchText,
          page: page,
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        }
        else {
          setData((prev) => {
            return [
              ...prev,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, searchText])

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage(prev => prev + 1)
    }
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto p-5 lg:p-10'>
        <p className='font-medium'>Search Results : {data.length}</p>


        {data.length > 0 ? (

          <InfiniteScroll dataLength={data.length}
            hasMore={true}
            next={handleFetchMore}>

            <div className='min-h-[56vh] mt-3'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 XL1444:grid-cols-6 gap-4 lg:gap-5'>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct data={p} key={p?._id + "search Product" + index} />
                    )
                  })
                }

                {/* loading data */}
                {
                  loading && (
                    loadingArrayCard.map((_, index) => {
                      return (
                        <CardLoading key={"loadingSearchPage" + index} />
                      )
                    })
                  )
                }
              </div>
            </div>
          </InfiniteScroll>
        ) : (
          // no data 

          !loading && (
            <div className='flex flex-col items-center justify-center w-full mx-auto'>
              <img
                src={images.noDataImage}
                alt="noting here image"
                className='w-full  max-w-sm max-h-sm block'
              />
              <p className='font-semibold mt-2'>No Data Found</p>
            </div>
          )
        )

        }

      </div>
    </section >
  )
}

export default SearchPage
