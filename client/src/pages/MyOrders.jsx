import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)
  console.log("Orders", orders);

  return (
    <section>
      <div>
        <h1 className='bg-white font-medium shadow-md p-2'>Orders</h1>
        {
          !orders[0] && (
            <NoData />
          )
        }
        {
          orders.map((order, index) => {
            return (
              <div key={order._id + index + "order"} className='order rounded p-3 text-sm border mt-3'>
                <p><span className='font-medium mr-2'>Order No :</span> {order?.orderId}</p>
                <div className='flex gap-3'>
                  <img src={order.product_details.image[0]} alt={order.product_details.name + "image"}
                    className='w-14 h-14 rounded'
                  />
                  <p className='font-normal'>{order.product_details.name}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default MyOrders
