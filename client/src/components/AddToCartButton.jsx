import React from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import SummaryApi from '../common/summaryApi'
import Axios from '../utils/Axios'
import { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const AddToCartButton = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const { fetchCartItem, updateCartQuantity,deleteCartItem } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [cartItemDetails, setCartItemDeatails] = useState()
    const [quantity, setQuantity] = useState(0)

    const handleAddToCart = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this is in cart or not

    useEffect(() => {
        const checkingItem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingItem)
        const product = cartItem.find(item => item.productId._id === data._id)
        setQuantity(product?.quantity)
        setCartItemDeatails(product)
    }, [data, cartItem])

    const increaseQuantity = (e) => {
        e.preventDefault()
        updateCartQuantity(cartItemDetails?._id, quantity + 1)
    }
    const decreaseQuantity = (e) => {
        e.preventDefault()
        if(quantity===1){
            deleteCartItem(cartItemDetails?._id)
        }else{

            updateCartQuantity(cartItemDetails?._id, quantity - 1)
        }
    }

    return (
        <div>
            {
                isAvailableCart ? (
                    <div className='flex items-center gap-1'>
                        <button onClick={decreaseQuantity} className='font-medium text-2xl text-white flex-1 bg-green-600 hover:bg-green-700 rounded px-1'>
                            -
                        </button>
                        <p className='font-medium px-1' >{quantity}</p>
                        <button onClick={increaseQuantity} className=' font-medium text-2xl text-white flex-1 bg-green-600 hover:bg-green-700 rounded px-1'>
                            +
                        </button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart} className='text-sm lg:text-base bg-green-600  hover:bg-green-700 text-white px-3 py-1 rounded'>
                        {loading ? <Loading /> : "Add"}
                    </button>
                )
            }

        </div>
    )
}

export default AddToCartButton
