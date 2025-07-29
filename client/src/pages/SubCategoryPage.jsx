import React, { useMemo, useState } from 'react'
import UploadSubCategoryModel from '../components/uploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import { useEffect } from 'react'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from "@tanstack/react-table"
import ViewImage from '../components/ViewImage'
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const SubCategoryPage = () => {
    const [openSubCategory, setOpenSubCategory] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageURL, setImageURL] = useState("")
    const columnHelper = createColumnHelper()


    const fetchSubCategory = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getSubCategory
            })

            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubCategory()
    }, [])

    const column = useMemo(() => [
        columnHelper.accessor("name", {
            header: "Name"
        }),
        columnHelper.accessor("image", {
            header: "Image",
            cell: ({ row }) => {
                return (
                    <div className='flex items-center justify-center'>
                        <img src={row.original.image} alt={row.original.name} className='w-9 h-9 cursor-pointer'
                            onClick={() => setImageURL(row.original.image)}
                        />
                    </div>)
            }
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: ({ row }) => {
                return (
                    <>
                        {
                            row.original.category.map((c, index) => {
                                return (
                                    <p key={c._id + "table"} className='shadow-md inline-block px-1'>{c.name} </p>
                                )
                            })
                        }
                    </>
                )
            }
        }),
        columnHelper.accessor("_id",{
            header : "Action",
            cell : ({row}) => {
                return (
                    <div className='flex items-center justify-center gap-3'>
                        <button className='p-1 bg-green-100 rounded-lg hover:text-green-600'>
                            <LuPencil size={20}/>
                        </button>
                        <button className='p-1 bg-red-100 rounded-lg hover:text-red-600'>
                            <MdDeleteOutline size={20}/>
                        </button>
                    </div>
                )
            }
        })

    ])
    const memoizedData = useMemo(() => data, [data]);
    return (
        <section>
            <div className='p-2 bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-medium'>Sub Category</h2>
                <button onClick={() => setOpenSubCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub Category</button>
            </div>

            <div>
                <DisplayTable
                    data={memoizedData}
                    column={column}
                />
            </div>

            {
                openSubCategory && (<UploadSubCategoryModel close={() => setOpenSubCategory(false)} />)
            }
            {
                imageURL &&
                <ViewImage url={imageURL} close={() => setImageURL("")} />
            }
        </section>
    )
}

export default SubCategoryPage
