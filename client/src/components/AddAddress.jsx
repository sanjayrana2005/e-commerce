import React from 'react'
import { useForm } from "react-hook-form"
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import {IoClose} from "react-icons/io5"
import { useGlobalContext } from '../provider/GlobalProvider'

const AddAddress = ({close}) => {
    const { register, handleSubmit,reset } = useForm()
    const {fetchAddress} = useGlobalContext()
    const onSubmit = async (data) => {
        
        const {addressLine,
            city,
            state,
            pincode,
            country,
            mobile} = data
        try {      
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    address_line : addressLine,
                    city:city,
                    state:state,
                    pincode:pincode,
                    country:country,
                    mobile:mobile
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
                    <h2 className='font-medium'>Add Address</h2>
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
                            name=""
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

export default AddAddress
