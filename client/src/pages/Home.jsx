import React from 'react'
import images from '../assets/images'
import { useSelector } from 'react-redux'
import ValideURLConvert from "../utils/ValideURLConvert"
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseDisplayProduct from '../components/CategoryWiseDisplayProduct'


const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)

  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListPage = (id, category) => {
    const subCategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })
      return filterData ? true : null
    })
    const url = `/${ValideURLConvert(category)}-${id}/${ValideURLConvert(subCategory.name)}-${subCategory._id}`
    navigate(url)
  }


  return (
    <section className='bg-white'>
      <div className="container mx-auto lg:px-10">
        <div className={`w-full h-full min-h-45 bg-blue-100 rounded ${!images.banner && "animate-pulse my-2"}`}>
          <img
            src={images.banner}
            alt="banner"
            className='w-full h-full hidden lg:block'
          />

          <img
            src={images.mobileBanner}
            alt="banner"
            className='w-full h-full lg:hidden'
          />
        </div>
      </div>

      <div className='container mx-auto px-4 lg:px-10 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
        {
          loadingCategory ? (
            new Array(12).fill(null).map((category, index) => {
              return (
                <div key={index + "loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow-md animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>

                </div>
              )
            })
          ) : (
            categoryData.map((category, index) => {
              return (
                <div key={category._id + "displayCategory"} className='w-full h-full' onClick={() => handleRedirectProductListPage(category._id, category.name)}>
                  <div>
                    <img
                      src={category.image}
                      alt=""
                      className='w-full h-full object-scale-down cursor-pointer'
                    />
                  </div>
                </div>
              )
            })

          )

        }
      </div>

      {/* display category product */}

      {
        categoryData.map((c, index) => {
          return (
            <CategoryWiseDisplayProduct key={c?._id + "categoryWiseProduct"} id={c?._id} name={c?.name} />
          )
        })
      }



    </section >
  )
}

export default Home
