import React, { useState } from 'react'
import EditProducts from './EditProducts'
import ConfirmBox from './ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'

const ProductCard = ({ data, fetchProductData }) => {
    const [editProductOpen, setEditProductOpen] = useState(false)
    const [deleteProduct, setDeleteProduct] = useState(false)

    const handleDeleteProduct = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: {
                    _id: data._id
                }
            })

            const {data:responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchProductData){
                    fetchProductData()
                }
                setDeleteProduct(false)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <div className='w-full p-2 bg-white rounded-md'>
            <div className='w-full h-32'>
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-full object-scale-down'
                />
            </div>
            <p className='mt-2 text-ellipsis line-clamp-1 font-normal'>{data?.name}</p>
            <p className='text-ellipsis line-clamp-1 text-slate-400'>{data?.unit}</p>
            <div className='grid grid-cols-2 gap-2 py-2 '>
                <button onClick={() => setEditProductOpen(true)} className='border border-green-600 bg-green-100 hover:bg-green-200 text-green-800 p-1 text-xs sm:text-sm font-normal rounded-sm'>Edit</button>
                <button onClick={() => setDeleteProduct(true)} className='border border-red-600 bg-red-100 hover:bg-red-200 text-red-800 p-1 text-xs sm:text-sm font-normal rounded-sm'>Delete</button>
            </div>
            {
                editProductOpen &&
                (
                    <EditProducts fetchProductData={fetchProductData} data={data} close={() => setEditProductOpen(false)} />
                )
            }
            {
                deleteProduct &&
                (
                    <ConfirmBox
                        close={() => setDeleteProduct(false)}
                        confirm={handleDeleteProduct}

                    />
                )
            }
        </div>
    )
}

export default ProductCard
