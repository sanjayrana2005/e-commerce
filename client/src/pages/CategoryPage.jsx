import React, { useState } from 'react'
import UploadCategoryModels from '../components/UploadCategoryModels'
import { useEffect } from 'react'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'



const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false)
    const [loading, setLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState({
        name: "",
        image: ""
    })
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ""
    })

    const allCategory = useSelector(state => state.product.allCategory)

    useEffect(() => {
        setCategoryData(allCategory)
    }, [allCategory])


    const fetchCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data: responseData } = response
            if (responseData.success) {
                setCategoryData(responseData.data)

            }
        } catch (error) {
            return error
        } finally {
            setLoading(false)
        }
    }


    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory(deleteCategory._id),
                data: deleteCategory
            })
            const { data: responseData } = response

            if (responseData) {
                toast.success(responseData.message)
                setOpenConfirmBoxDelete(false)
                fetchCategory()
            }
        } catch (error) {
            AxiosToastError(error)
        }

    }
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-medium'>Category</h2>
                <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData />
                )
            }
            <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {
                    categoryData.map((category) => {
                        return (
                            <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className='w-full object-scale-down'
                                />
                                <div className='flex items-center gap-2 h-9'>
                                    <button onClick={() => {
                                        setOpenEdit(true)
                                        setEditData(category)
                                    }} className='flex-1 bg-green-100 text-green-600 font-medium py-1 rounded-sm hover:bg-green-200'>
                                        Edit
                                    </button>
                                    <button onClick={() => {
                                        setOpenConfirmBoxDelete(true)
                                        setDeleteCategory(category)
                                    }} className='flex-1 bg-red-100 text-red-600 font-medium py-1 rounded-sm hover:bg-red-200'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                loading && (
                    <Loading />
                )
            }
            {
                openUploadCategory && (
                    <UploadCategoryModels fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />

                )
            }
            {
                openEdit && (
                    <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
                )
            }
            {
                openConfirmBoxDelete && (
                    <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(true)} confirm={handleDeleteCategory} />)
            }

        </section>
    )
}

export default CategoryPage
