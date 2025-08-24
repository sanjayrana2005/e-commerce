import React, { useState } from 'react'
import DisplayPriceInRupee from '../utils/DisplayPriceInRupee'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import {loadStripe} from "@stripe/stripe-js"


const CheckOutPage = () => {

    const { notDiscountTotalPrice, quantity, totalPrice,fetchCartItem,fetchOrder } = useGlobalContext()
    const [openAddress, setOpenAddress] = useState(false)
    const addressList = useSelector(state => state.addresses.addressList)
    const [selectedAddress,setSelectedAddress] = useState(0)
    const cartItemList = useSelector(state=>state.cartItem.cart)
    const navigate = useNavigate()
    


    const handleCashOnDelivery = async () => {

        try {
            const response = await Axios({
                ...SummaryApi.cashOnDelivery,
                data:{
                    list_items:cartItemList,
                    addressId:addressList[selectedAddress]?._id,
                    totalAmount : totalPrice,
                }
            })
            const {data:responseData}=response

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItem){
                    fetchCartItem()
                }
                if(fetchOrder){
                    fetchOrder()
                }
                navigate("/success",{
                    state:{
                        text:"Order"
                    }
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleOnlonePayment = async () => {
        try {
            toast.loading("Loading...")
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

            const stripePromise = await loadStripe(stripePublicKey)

            const response = await Axios({
                ...SummaryApi.payment_url,
                data:{
                    list_items:cartItemList,
                    addressId:addressList[selectedAddress]?._id,
                     totalAmount : totalPrice,
                }
            })

            const {data:responseData}=response
            await stripePromise.redirectToCheckout({sessionId : responseData.id})

            if(fetchCartItem){
                fetchCartItem()
            }
            if(fetchOrder){
                fetchOrder()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='bg-blue-50'>
            <div className='container mx-auto px-5 lg:px-10 py-4 flex flex-col lg:flex-row gap-3'>
                <div className='flex flex-col flex-1 gap-1'>
                    {/* Address */}
                    <h3 className='font-normal'>Choose Your Saved Address</h3> 
                    <div className='bg-white p-2 flex flex-col gap-3'>
                        {
                            addressList.map((address, index) => {
                                return (
                                    <label htmlFor={"address"+index} className={`cursor-pointer ${!address.status && 'hidden'}`}>
                                        <div className='border rounded p-1 flex gap-3 hover:bg-blue-50'>
                                    <div>
                                        <input type="radio" name="address"
                                        value={index} 
                                        onChange={(e)=>setSelectedAddress(e.target.value)}
                                        id={"address"+index}
                                        className='cursor-pointer' 

                                        />
                                    </div>

                                    <div>
                                        <p>{address.address_line}</p>
                                        <p>{address.city}</p>
                                        <p>{address.state}</p>
                                        <p>{address.country} - {address.pincode}</p>
                                        <p>{address.mobile}</p>
                                    </div>
                                        
                                    </div>
                                    </label>
                                )
                            })
                        }
                        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 p-2 border border-slate-400 border-dashed flex items-center justify-center cursor-pointer'>
                        Add address
                    </div>
                    </div>
                    
                </div>

                <div className='w-full lg:max-w-md flex-1 bg-white px-2'>
                    {/* summary details */}
                    <h3 className='font-medium'>Summary</h3>
                    <div className='bg-white px-1 rounded'>
                        <h3 className='font-medium'>Bill details</h3>
                        <div className='flex justify-between ml-1'>
                            <p>Price</p>
                            <p className='flex gap-3'> <span className='line-through text-neutral-400'>{DisplayPriceInRupee(notDiscountTotalPrice)}</span> <span>{DisplayPriceInRupee(totalPrice)}</span></p>
                        </div>
                        <div className='flex justify-between ml-1'>
                            <p>Total Quantity</p>
                            <p className='flex gap-3'>{quantity === 1 ? `${quantity} Item` : `${quantity} Items`}</p>
                        </div>

                        <div className='flex justify-between ml-1'>
                            <p>Delivery Charge</p>
                            <p>Free</p>
                        </div>

                        <div className='flex justify-between ml-1'>
                            <p className='font-medium'>Total Price</p>
                            <p className='flex gap-3 font-medium'><span>{DisplayPriceInRupee(totalPrice)}</span></p>
                        </div>

                    </div>

                    <div className='flex flex-col gap-3'>
                        <button onClick={handleOnlonePayment} className='py-2  bg-green-700 hover:bg-green-600 text-white rounded'>Online Payment</button>
                        <button onClick={handleCashOnDelivery} className='py-2 text-green-600 border-2 border-green-600 hover:bg-green-600  hover:text-white rounded' >Cash On Delivery</button>
                    </div>
                </div>
            </div>
            {
                openAddress && (
                    <AddAddress close={() => setOpenAddress(false)} />
                )
            }

        </section>
    )
}

export default CheckOutPage
