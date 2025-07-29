import React, { useState } from 'react'
import { IoClose, IoCloseCircle } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/summaryApi';
import toast from "react-hot-toast"
import AxiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModel = ({ close }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: []
  })

  const allCategory = useSelector(state => state.product.allCategory)
 

  const handleChange = (e) => {
    const { name, value } = e.target

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubCategoryImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    const response = await uploadImage(file)
    const { data: ImageResponse } = response

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url
      }
    })

  }

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(el => el._id === categoryId)
    subCategoryData.category.splice(index,1)
    setSubCategoryData((prev)=>{
      return{
        ...prev
      }
    } )

  }

  const handleSubmitSubCategory = async (e) =>{
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.createSubcategory,
        data:subCategoryData
      })

      const {data: responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        if(close){
          close()
        }
      }
    } catch (error) {
      AxiosToastError(error)
      
    }

  }


  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 z-50 bg-opacity-60 flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl bg-white p-4 rounded'>
        <div className='flex justify-between'>
          <h1 className='font-medium'>Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form className='my-3 grid gap-2' onSubmit={handleSubmitSubCategory}>
          <div className='grid gap-1'>
            <label htmlFor="name">Sub Category Name</label>
            <input
              type="text"
              id='name'
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className='p-3 bg-blue-50 outline-none border focus:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <p>Image</p>
            <div className='flex flex-col lg:flex-row items-center gap-2'>
              <div className='w-full lg:w-36 h-36 bg-blue-50 rounded flex items-center justify-center'>
                {
                  subCategoryData.image ?
                    (
                      <img
                        src={subCategoryData.image}
                        alt='subCategory'
                        className='w-full h-full object-scale-down'
                      />
                    ) : (
                      <p className='text-sm text-neutral-400'>No Image </p>
                    )
                }
              </div>
              <label htmlFor="uploadSubCategory">
                <div className='px-4 py-1 border border-primary-200  rounded hover:bg-primary-200 cursor-pointer '>
                  Upload Image
                </div>
                <input
                  type="file"
                  id='uploadSubCategory'
                  hidden
                  onChange={handleSubCategoryImage}
                />
              </label>
            </div>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="">Select Category</label>
            <div className='border focus-within:border-primary-200 rounded'>
            <div className='flex flex-wrap gap-1 '>
              {
              subCategoryData.category.map((cat,index) => {
                return (
                  <p key={cat._id+"selectedValue"} className='bg-white shadow-md mx-2 p-1 flex items-center gap-2' onClick={() => handleRemoveCategorySelected(cat._id)}>{cat.name}
                  <div className='cursor-pointer hover:text-red-500'>
                  <IoClose size={20}/>
                  </div>
                  </p>
                )
              })
            }
            </div>
              <select
                className='w-full bg-transparent border p-2 rounded outline-none'
                onChange={(e)=>{
                  const value = e.target.value
                  const categoryDetails = allCategory.find(el => el._id == value)
                  setSubCategoryData((prev)=>{
                    return{
                    ...prev,
                      category : [...prev.category,categoryDetails]
                    }

                  })
                }}
              >
                <option value={""} >Select Category</option>
                {
                  allCategory.map((category,index) => {
                    return (
                      <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
          <button className={`px-4 py-1 border 
            ${subCategoryData.name && subCategoryData.image && subCategoryData.category ? `bg-primary-200` : `bg-gray-200 rounded-sm`}
          `}>

            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

export default UploadSubCategoryModel
