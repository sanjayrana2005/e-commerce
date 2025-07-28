import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/uploadSubCategoryModel'

const SubCategoryPage = () => {
    const [openSubCategory, setOpenSubCategory] = useState(false)
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-medium'>Sub Category</h2>
                <button onClick={() => setOpenSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
            </div>
            {
                openSubCategory && (<UploadSubCategoryModel close={()=> setOpenSubCategory(false)}/>)
            }
        </section>
    )
}

export default SubCategoryPage
