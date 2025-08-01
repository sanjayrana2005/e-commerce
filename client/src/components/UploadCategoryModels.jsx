import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import uploadImage from '../utils/uploadImage'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import toast from "react-hot-toast"
import { AxiosError } from 'axios'
import AxiosToastError from '../utils/AxiosToastError'

const UploadCategoryModels = ({ close,fetchData }) => {
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    const [loading,setLoading] =useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addCategory,
                data:data
            })
            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }
        } catch (error) {
            AxiosToastError(error)
        }finally {
            setLoading(false)
        }

    }

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const response = await uploadImage(file)
        const { data: ImageResponse } = response

        setData((prev) => {
            return {
                ...prev,
                image: ImageResponse.data.url
            }
        })

    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-full p-4 rounded'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-medium'>Category</h1>
                    <button onClick={close} className='w-fit block'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor="categoryName">Name</label>
                        <input type="text"
                            id='categoryName'
                            placeholder='Enter Category Name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='bg-blue-50 p-2 border border-blue-100 outline-none focus-within:border-primary-200 rounded'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col items-center lg:flex-row gap-4'>
                            <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center'>
                                {
                                    data.image ? (
                                        <img
                                            src={data.image}
                                            alt="category"
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-neutral-500'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor="uploadCategoryImage">
                                <div className={
                                    `${data.name ? "border-primary-200 hover:bg-primary-100" : "bg-gray-400"} px-4 py-1 rounded cursor-pointer select-none border font-medium`}>
                                    Upload Image
                                </div>
                                <input disabled={!data.name} onChange={handleUploadCategoryImage} type="file"
                                    id='uploadCategoryImage'
                                    className='hidden'
                                />

                            </label>
                        </div>
                    </div>
                    <button className={`
                        ${data.name && data.image ? "bg-primary-100 hover:bg-primary-200" : "bg-gray-400"}
                        rounded py-2 font-medium
                    `}>
                        Add Category
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UploadCategoryModels
