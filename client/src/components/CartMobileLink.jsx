import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaCartShopping } from 'react-icons/fa6'
import DisplayPriceInRupee from '../utils/DisplayPriceInRupee'
import { Link } from 'react-router-dom'
import { FaCaretRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const CartMobileLink = () => {
    const { totalPrice, quantity } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <>
            {
                cartItem[0] && (
                    <div className='sticky bottom-0 p-2'>
                        <div className='bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm flex justify-between gap-3 lg:hidden'>

                            <div className='flex items-center gap-1'>
                                <div className='bg-green-500 p-2 w-fit rounded'>
                                    <FaCartShopping size={20} />
                                </div>
                                <div className='text-xs'>
                                    <p>{quantity > 1 ? `${quantity} items` : `${quantity} item`}</p>
                                    <p> {DisplayPriceInRupee(totalPrice)}</p>
                                </div>
                            </div>
                            <Link to={"/cart"} className='flex items-center '>
                                <span className='text-sm'>View Cart</span>
                                <FaCaretRight />
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CartMobileLink
