import { createContext, useContext, useState } from "react";
import SummaryApi from "../common/summaryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import { useEffect } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import priceWithDiscount from "../utils/PriceWithDiscount";

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)


const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cartItem.cart)
    const [totalPrice, setTotalPrice] = useState(0)
    const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            })

            const { data: responseData } = response

            if (responseData.success) {
                dispatch(handleAddItemCart(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const updateCartQuantity = async (id, quantity) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItemQuantity,
                data: {
                    _id: id,
                    quantity,
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                // toast.success(responseData.message)
                fetchCartItem()
                return responseData
            }
        } catch (error) {
            AxiosToastError(error)
            return error
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId
                }
            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
        fetchCartItem()
    }, [])

    useEffect(() => {
        const totalQuantity = cartItem.reduce((prev, currentState) => {
            return prev + currentState.quantity
        }, 0)
        setQuantity(totalQuantity)

        const totalPrice = cartItem.reduce((preve, currentValue) => {
            // const priceAfterDiscount = priceWithDiscount(currentValue.productId.price,currentValue.productId.discount)

            return preve + (priceWithDiscount(currentValue?.productId?.price,currentValue?.productId?.discount) * currentValue.quantity)
        }, 0)
        setTotalPrice(totalPrice)

        const notDiscountPrice = cartItem.reduce((preve,currentValue)=>{
            return preve + (currentValue?.productId?.price * currentValue.quantity)
        },0)
        setNotDiscountTotalPrice(notDiscountPrice)
    }, [cartItem])

    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartQuantity,
            deleteCartItem,
            totalPrice,
            quantity,
            notDiscountTotalPrice
        }}>
            {children}
        </GlobalContext.Provider>
    )
}



export default GlobalProvider