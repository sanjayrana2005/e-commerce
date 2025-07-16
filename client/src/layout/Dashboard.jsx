import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <section className='bg-white'>
            <div className='container mx-auto p-5 lg:px-10 grid lg:grid-cols-[250px,1fr] '>
                {/* left for menu */}
                <div className='py-4 sticky top-24 overflow-auto hidden lg:block'>
                    <UserMenu />
                </div>

                {/* right for content  */}
                <div className='bg-white p-4'>
                    <Outlet/>
                </div>


            </div>
        </section>
    )
}

export default Dashboard
