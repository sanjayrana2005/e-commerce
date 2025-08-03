import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'

const CategoryWiseDisplayProduct = ({id,name}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchCategoryWiseProduct = async () =>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategory,
                data : {
                    id : id
                }
            })
            const {data:responseData} = response
            if(responseData.success){
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

    const loadingCardNumber = new Array
    (6).fill(null)

    useEffect (() => {
            fetchCategoryWiseProduct()
    },[])
    
    return (
        <div>
            <div className='container mx-auto px-5 lg:px-12 flex items-center justify-between gap-4'>
            <h3 className='font-medium text-lg md:text-xl'>{name}</h3>
            <Link to={""} className='text-green-600 hover:text-green-400'>See All</Link>
        </div>
        <div className='flex items-center gap-5 md:gap-6 lg:gap-8 container mx-auto px-5 lg:px-12'>
            {
                loading ? (
                loadingCardNumber.map((_,index) => {
                    return (
                        <CardLoading 
                             key={"CategoryWiseProductDisplay123"+index}
                        />
                    )
                })):(
            
            
                data.map((product,index)=>{
                    return (
                        <CardProduct
                        data={product} 
                        key={product._id+"CategoryWiseProductDisplay"+index}/>
                    )
                }))
            }
        </div>
        </div>
    )
}

export default CategoryWiseDisplayProduct
