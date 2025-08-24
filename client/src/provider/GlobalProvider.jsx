import { createContext, useContext, useState } from "react";
import SummaryApi from "../common/summaryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import { useEffect } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import priceWithDiscount from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";
import { handleOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)


const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cartItem.cart)
    const [totalPrice, setTotalPrice] = useState(0)
    const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const user = useSelector(state => state?.user)

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

    const fetchOrder = async ()=>{
        try {
            const response = await Axios({
                ...SummaryApi.getOrderItems
            })
            const {data:responseData} = response

            if(responseData.success){
                dispatch(handleOrder(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

       const fetchAddress =async  () =>{
        try {
            const response = await Axios({
                ...SummaryApi.getAddress
            })
            const {data:responseData}=response

            if(responseData.success){
                dispatch(handleAddAddress(responseData.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }


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

    const handleLogOut = () => {
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }

 
    
    useEffect(() => {
        fetchCartItem()
        handleLogOut()
        fetchAddress()
        fetchOrder()
    }, [user])

    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartQuantity,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            quantity,
            notDiscountTotalPrice,
            fetchOrder
        }}>
            {children}
        </GlobalContext.Provider>
    )
}



export default GlobalProvider