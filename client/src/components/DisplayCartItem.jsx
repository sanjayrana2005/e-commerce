import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import DisplayPriceInRupee from '../utils/DisplayPriceInRupee'
import { FaCaretRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import priceWithDiscount from '../utils/PriceWithDiscount'
import images from "../assets/images/index"

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice,quantity } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <section className='bg-neutral-900 fixed bottom-0 top-0 left-0 right-0 bg-opacity-60 h-screen z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex justify-between p-4 shadow-md gap-3'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'><IoClose size={25} /></Link>
                    <button className='hidden lg:block' onClick={close}><IoClose size={25} /></button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full  max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-2'>
                    {/* display items */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className='flex item-center justify-between gap-2 bg-blue-100 text-blue-500 px-3 py-2 rounded max-h-10 h-10 min-h-10'>
                                    <p>
                                        Your total savings
                                    </p>
                                    <p>
                                        {DisplayPriceInRupee(notDiscountTotalPrice - totalPrice)}
                                    </p>
                                </div>

                                <div className='bg-white p-3 flex flex-col gap-3 overflow-auto rounded'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div className='flex items-center gap-2'>
                                                        <div className='w-16 h-16 min-h-16 min-w-16 border rounded '>
                                                            <img src={item?.productId?.image[0]} alt="product image"
                                                                className='object-scale-down' />
                                                        </div>
                                                        <div>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-xs font-medium text-ellipsis line-clamp-1 text-neutral-400'>{item?.productId?.unit}</p>
                                                            <p className='text-xs font-medium text-'>{DisplayPriceInRupee(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>
                                                        <div className='ml-auto'>
                                                            <AddToCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>

                                <div className='bg-white p-3 rounded'>
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
                            </>
                        ) : (<div className='flex flex-col items-center justify-center gap-3' >
                            <img src={images.emptyCart} alt="empty cart image" className='rounded w-60 h-60' />
                            <Link to={"/"} onClick={close} className='bg-green-700 px-3 py-2 rounded text-white font-medium hover:bg-green-600' >Shop Now</Link>
                        </div>
                        )
                    }
                </div>
                {
                    cartItem[0] && (
                        <div className='p-2'>
                            <div className='bg-green-700 text-neutral-100 p-3 font-medium text-base sticky bottom-2 rounded flex items-center justify-between gap-3'>
                                <div>
                                    {DisplayPriceInRupee(totalPrice)}
                                </div>
                                <button className='flex items-center gap-1'>
                                    Proceed
                                    <span><FaCaretRight /></span>
                                </button>
                            </div>
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default DisplayCartItem
