import React, { useState } from 'react'
import { MdCloudUpload } from "react-icons/md";
import uploadImage from '../utils/uploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5'
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/successAlert';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';



const UploadProductPage = () => {
  const [uploadProductData, setUploadProductData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},

  })

  const [imageLoading, setImageLoading] = useState(false)
  const [imageFullView, setViewImageFullView] = useState(false)
  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const [openAddFields, setOpenAddFields] = useState(false)
  const [fieldName, setFieldName] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setUploadProductData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleRemoveCategory = async (index) => {
    uploadProductData.category.splice(index, 1)
    setUploadProductData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleRemoveSubCategory = async (index) => {
    uploadProductData.subCategory.splice(index, 1)
    setUploadProductData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleUploadImage = useCallback(async (e) => {
    const files = Array.from(e.target.files || e)
    if (files.length === 0) {
      return
    }
    setImageLoading(true)

    try {
      const uploadedUrl = []

      for (let file of files) {
        const responnse = await uploadImage(file)
        const { data: ImageResponse } = responnse
        const imageUrl = ImageResponse.data.url
        uploadedUrl.push(imageUrl)
      }

      setUploadProductData((prev) => {
        return {
          ...prev,
          image: [...prev.image, ...uploadedUrl]
        }
      })
    }
    catch (error) {
      return error
    }
    finally {
      setImageLoading(false)
    }

  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    // Convert to event-like object to reuse handleUploadImage
    const fileList = new DataTransfer();
    acceptedFiles.forEach(file => fileList.items.add(file));
    const event = { target: { files: fileList.files } };
    handleUploadImage(event);
  }, [handleUploadImage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
    noClick: true, // disables default click behavior (you already have a label/button for that)
    noKeyboard: true,
  });

  const handleDeleteImage = async (index) => {
    uploadProductData.image.splice(index, 1)
    setUploadProductData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleAddField = async () => {
    setUploadProductData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: ""
        }

      }
    })
    setFieldName("")
    setOpenAddFields(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: uploadProductData
      })
      const { data: responseData } = response

      if (responseData.success) {
        successAlert({ title: responseData.message })
        setUploadProductData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }

  }

  const handleDeleteField = (key) => {
    const updatedDetails = { ...uploadProductData.more_details };
    delete updatedDetails[key];

    setUploadProductData(prev => ({
      ...prev,
      more_details: updatedDetails,
    }));
  };



  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-medium'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-3' onSubmit={handleSubmit}>

          <div className='grid gap-1'>
            <label htmlFor="name" className='font-medium'>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={uploadProductData.name}
              placeholder='Enter Product name'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="description" className='font-medium'>Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={uploadProductData.description}
              placeholder='Enter product description'
              onChange={handleChange}
              required
              rows={3}
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
            />
          </div>

          <div>
            <p className='font-medium'>Image</p>
            <div {...getRootProps()}>
              <label htmlFor='productImage' className='bg-blue-100 h-24 rounded border flex  items-center justify-center cursor-pointer '>
                <div className='flex flex-col items-center justify-center'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <MdCloudUpload size={35} />
                        <p>Upload Image</p>
                      </>

                    )
                  }

                </div>
                <input
                  type="file"
                  id='productImage'
                  hidden
                  multiple
                  onChange={handleUploadImage}
                  accept='image/*'
                />
              </label>

              <input {...getInputProps()} /> {/* This handles drag-and-drop */}

              {/* display uploaded image */}
              <div className='flex flex-wrap gap-2'>
                {
                  uploadProductData.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-2 w-20 min-w-20 bg-blue-50 border relative group rounded'>
                        <img
                          src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageFullView(img)}
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded cursor-pointer text-white hidden group-hover:block'>
                          <MdDeleteOutline />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="category" className='font-medium'>Category</label>
            <div>
              <select
                className='bg-blue-50 w-full p-2 rounded outline-none border border-primary-200'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)
                  setUploadProductData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, category]
                    }
                  })
                  setSelectCategory("")
                }}
              >
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3 mt-1'>
                {
                  uploadProductData.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "productsection"} className='flex items-center gap-2 shadow-md rounded bg-blue-50'>
                        <p>{c.name}</p>
                        <div onClick={() => handleRemoveCategory(index)} className='hover:text-red-600 hover:cursor-pointer'>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="subcategory" className='font-medium'>Sub Category</label>
            <div>
              <select
                className='bg-blue-50 w-full p-2 rounded outline-none border border-primary-200'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)
                  setUploadProductData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, subCategory]
                    }
                  })
                  setSelectSubCategory("")
                }}
              >
                <option value={""}>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3 mt-1'>
                {
                  uploadProductData.subCategory.map((c, index) => {
                    return (
                      <div key={c._id + index + "productsection"} className='flex items-center gap-2 shadow-md rounded bg-blue-50'>
                        <p>{c.name}</p>
                        <div onClick={() => handleRemoveSubCategory(index)} className='hover:text-red-600 hover:cursor-pointer'>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor="unit" className='font-medium'>Unit</label>
            <input
              type="text"
              name="unit"
              id="unit"
              value={uploadProductData.unit}
              placeholder='Enter Product unit'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="stock" className='font-medium'>Number of Stock</label>
            <input
              type="text"
              name="stock"
              id="stock"
              value={uploadProductData.stock}
              placeholder='Enter Product stock'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="price" className='font-medium'>Price of Product</label>
            <input
              type="text"
              name="price"
              id="price"
              value={uploadProductData.price}
              placeholder='Enter Product price'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor="discount" className='font-medium'>Discount</label>
            <input
              type="text"
              name="discount"
              id="discount"
              value={uploadProductData.discount}
              placeholder='Enter Product discount'
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          {/* add more fields */}

          <div>
            {
              Object?.keys(uploadProductData?.more_details)?.map((k, index) => {
                return (
                  <div className='grid gap-1 mb-2'>
                    <div className='flex items-center justify-between'>
                      <label className='font-medium' htmlFor={k}>{k}</label>
                      <div className='hover:cursor-pointer'>
                        <MdDeleteOutline
                          className='text-red-600 hover:text-red-500'
                          size={20}
                          onClick={() => handleDeleteField(k)}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      id={k}
                      value={uploadProductData?.more_details[k]}

                      onChange={(e) => {
                        const value = e.target.value
                        setUploadProductData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [k]: value
                            }
                          }
                        })

                      }}
                      required
                      className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                    />
                  </div>
                )
              })
            }
          </div>

          <div onClick={() => setOpenAddFields(true)} className='w-32 text-center hover:bg-primary-200 bg-white py-1 px-3 rounded border border-primary-200 cursor-pointer'>
            Add Fields
          </div>

          <button
            className='bg-primary-100 hover:bg-primary-200 rounded py-2 font-medium'
          >
            Submit
          </button>
        </form>

      </div>
      {
        imageFullView && (
          <ViewImage url={imageFullView} close={() => setViewImageFullView("")} />
        )
      }
      {
        openAddFields && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddFields(false)} />
        )
      }
    </section>
  )
}


export default UploadProductPage
