import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import ValideURLConvert from "../utils/ValideURLConvert"


const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const [displaySubCategory, setDisplaySubCatergory] = useState([])

  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)


  const subCategory = params.subcategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subcategory.split("-").slice(-1)[0]

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page,
          limit: 10
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        }
        else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })
      return filterData ? filterData : false
    })
    setDisplaySubCatergory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='sticky top-24 lg:top-20 '>
      <div className='container sticky top-24 mx-auto grid grid-cols-[100px,1fr] md:grid-cols-[150px,1fr] lg:grid-cols-[220px,1fr]'>
        {/* sub category */}
        <div className='bg-white min-h-[88vh] max-h-[88vh] overflow-y-scroll  flex flex-col gap-1 shadow-md scrollbrCoustom py-2'>
          {
            displaySubCategory.map((s, index) => {
              const link = `/${ValideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${ValideURLConvert(s?.name)}-${s?._id}`
              return (
                <Link to={link} className={`w-full p-1 shadow-md rounded-sm mx-auto flex flex-col lg:flex-row  items-center lg:w-full lg:h-16 lg:gap-2 hover:cursor-pointer hover:bg-green-200 ${subCategoryId === s._id ? "bg-green-200" : ""}`}>
                  <div className='w-fit lg:h-14 max-w-28 mx-auto lg:mx-0 rounded'>
                    <img src={s.image}
                      alt={`${s.name} subCategory`}
                      className='w-14 lg:w-12 h-full object-scale-down'
                    />
                  </div>
                  <p className='text-xs font-normal text-center lg:text-left lg:font-medium'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>

        {/* products */}
        <div className='stickey top-20'>
          <div className='bg-white shadow-md p-2 z-10'>
            <h3 className='font-medium'>{subCategoryName}</h3>
          </div>
          <div>
            <div className='min-h-[78vh] max-h-[78vh] overflow-y-auto'>
              <div className='grid grid-cols-1 md:grid-cols-3 min-[375px]:grid-cols-2 lg:grid-cols-3 XL1444:grid-cols-5 p-3 gap-4 '>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>
            </div>
            {
              loading && (
                <Loading />
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
