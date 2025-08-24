import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"
import EditAddres from '../components/EditAddres'
import Axios from '../utils/Axios'
import SummaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useGlobalContext } from '../provider/GlobalProvider'

function Address() {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const {fetchAddress} = useGlobalContext()

  const handleDisableAddress = async (id) =>{
try {
  const response = await Axios({
    ...SummaryApi.disableAddress,
    data:{
      _id:id
    }
  })
  if(response.data.success){
    toast.success("Address removed")
    if(fetchAddress){
      fetchAddress() 
    }
  }
} catch (error) {
  AxiosToastError(error)
}
  }
  return (
    <div>
      <div className='px-3 py-2 shadow-md flex justify-between  gap-3'>
        <h2 className='font-medium'>Saved Addresses</h2>
        <button onClick={() => setOpenAddress(true)} className='border rounded px-3 py-1 hover:bg-primary-200'>Add Address</button>
      </div>
      <div className='bg-blue-50 p-2 flex flex-col gap-3 mt-1'>
        {
          addressList.map((address, index) => {
            return (
              <div className={`border rounded p-2 flex justify-between gap-3 bg-white ${!address.status && 'hidden'}`}>

                <div>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className=' max-h-7 flex gap-3'>
                <div onClick={()=>{
                  setOpenEdit(true) 
                  setEditData(address) }} className='hover:cursor-pointer bg-green-300 hover:bg-green-500 rounded p-1'>
                  <MdEdit size={20} />
                </div>
                <div onClick={()=>handleDisableAddress(address._id)} className='hover:cursor-pointer bg-red-300 hover:bg-red-500 rounded p-1'>
                  <MdDelete size={20} />
                </div>
                </div>
              </div>
            )
          })
        }
        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 p-2 border border-slate-400 border-dashed flex items-center justify-center cursor-pointer'>
          Add address
        </div>
      </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddres data={editData} close={()=>setOpenEdit(false)}/>
        )
      }
    </div>
  )
}

export default Address
