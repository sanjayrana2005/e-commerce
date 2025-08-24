
import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import {IoClose} from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'

const EditAddres = ({close,data}) => {
    const {address_line,
            city,
            state,
            pincode,
            country,
            mobile} = data
            
    const { register, handleSubmit,reset } = useForm({
        defaultValues:{
            _id:data._id,
            userId:data.userId,

            addressLine:address_line,
            city,
            state,
            pincode,
            country,
            mobile
        }
    })
    const {fetchAddress} = useGlobalContext()
    const onSubmit = async (formData) => {
        
        try {      
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data: {
                   _id: formData._id,
                userId: formData.userId,
                address_line: formData.addressLine, // map camelCase → snake_case
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                country: formData.country,
                mobile: formData.mobile
                }
            })
            const {data:responseData}=response

            if(responseData.success){
                toast.success(responseData.message)
            }
            if(close){
                close()
                reset()
                fetchAddress()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='bg-black fixed bottom-0 left-0 top-0 right-0 bg-opacity-60 z-50 p-2 flex items-center justify-center'>
            <div className='bg-white p-2 w-full max-w-lg mx-auto rounded  overflow-auto'>
                <div className='flex justify-between'>
                    <h2 className='font-medium'>Edit Address</h2>
                    <button onClick={close} className='hover:text-red-500'>
                    <IoClose size={25} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-1'>
                        <label htmlFor="addressLine">Address Line :</label>
                        <input
                            type="text"
                            name=""
                            id="addressLine"
                            className='bg-blue-50 outline-none p-2 rounded focus:outline-primary-200'
                            {...register("addressLine", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor="city">City :</label>
                        <input
                            type="text"
                            name=""
                            id="city"
                            className='bg-blue-50 outline-none p-2 rounded focus:outline-primary-200'
                            {...register("city", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor="state">State :</label>
                        <input
                            type="text"
                            name=""
                            id="state"
                            className='bg-blue-50 outline-none p-2 rounded focus:outline-primary-200'
                            {...register("state", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor="pincode">Pin Code :</label>
                        <input
                            type="text"
                            name="pincode"
                            id="pincode"
                            className='bg-blue-50 outline-none p-2 rounded focus:outline-primary-200'
                            {...register("pincode", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor="country">Country :</label>
                        <input
                            type="text"
                            name=""
                            id="country"
                            className='bg-blue-50 outline-none p-2 rounded focus:outline-primary-200'
                            {...register("country", { required: true })}
                        />
                    </div>

                    <div className='grid gap-1 mt-2'>
                        <label htmlFor="mobile">Mobile :</label>
                        <input
                            type="text"
                            name=""
                            id="mobile"
                            className='bg-blue-50 outline-none p-2 rounded focus:outline-primary-200'
                            {...register("mobile", { required: true })}
                        />
                    </div>
                    <button type='submit' className='bg-primary-200 w-full py-2 rounded mt-4 hover:bg-primary-100'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default EditAddres

