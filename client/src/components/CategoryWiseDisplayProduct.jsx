import React, { useEffect, useRef, useState } from 'react'
import { Link} from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import ValideURLConvert from "../utils/ValideURLConvert"

const CategoryWiseDisplayProduct = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product.allSubCategory)
      const loadingCardNumber = new Array
        (6).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)
            }

        } catch (error) {
            console.error("Error fetching category products", id, name, error);
            AxiosToastError(error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 450
    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 450
    }

    const handleRedirectProductListPage = () => {
        const subCategory = subCategoryData.find(sub => {
            const filterData = sub.category.some(c => {
                return c._id == id
            })
            return filterData ? true : null
        })
        const url = `/${ValideURLConvert(name)}-${id}/${ValideURLConvert(subCategory?.name)}-${subCategory?._id}`
       
        return url
    }
    const redirectURL = subCategoryData.length ?handleRedirectProductListPage() :""

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])



    return (
        <div>
            <div className='container mx-auto px-5 lg:px-12 flex items-center justify-between gap-5'>
                <h3 className='font-medium lg:text-lg md:text-xl '>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-400 w-16'>See All</Link>
            </div>
            <div className='relative flex items-center'>
                <div className='flex gap-5 md:gap-6 lg:gap-8 container mx-auto px-5 lg:px-12 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {
                        loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading
                                    key={"CategoryWiseProductDisplay123" + index}
                                />
                            )
                        })

                    }

                    {
                        data.map((product, index) => {
                            return (
                                <CardProduct
                                    data={product}
                                    key={product._id + "CategoryWiseProductDisplay" + index} />
                            )
                        })
                    }

                </div>
                <div className='w-full left-0 right-0 container mx-auto lg:px-10 max-w-full absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'><FaAngleLeft /></button>
                    <button onClick={handleScrollRight} className='relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'><FaAngleRight /></button>
                </div>
            </div>

        </div>
    )
}

export default CategoryWiseDisplayProduct
