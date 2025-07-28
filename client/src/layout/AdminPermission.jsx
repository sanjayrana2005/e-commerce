import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermission = ({ children }) => {
    const user = useSelector(state => state.user)
    return (
        <>
            {
                isAdmin(user.role) ? children : <p className='bg-red-100 text-red-600 font-medium p-4'>you have no permission</p>
            }
        </>
    )
}

export default AdminPermission
