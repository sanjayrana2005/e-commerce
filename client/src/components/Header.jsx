import React from 'react'
import images from "../assets/images/index"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobie from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";


const Header = () => {
  const [isMobile] = useMobie()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  return (
    <header className='bg-white h-24 lg:h-20 lg:shadow-md stickey top-0 flex flex-col justify-center gap-1'>
      {
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-5 lg:px-10 justify-between '>
            {/** logo*/}
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center'>
                <img
                  src={images.logo}
                  width={170}
                  height={60}
                  alt="logo"
                  className='hidden lg:block'
                />

                <img
                  src={images.logo}
                  width={120}
                  height={60}
                  alt="logo"
                  className='lg:hidden'
                />

              </Link>
            </div>

            {/** search*/}
            <div className='hidden lg:block'>
              <Search />
            </div>

            {/** login and my cart*/}
            <div className=''>
              {/* user icon display only in mobile */}
              <button className='text-neutral-600 lg:hidden'>
                <FaRegCircleUser size={26} />
              </button>

              {/* Desktop Part */}
              <div className='hidden lg:flex items-center gap-10 '>
                <button onClickCapture={redirectToLoginPage} className='text-lg px-2'>Login</button>
                <button className='flex items-center gap-2 bg-green-800 p-3 rounded text-white hover:bg-green-700'>
                  {/* {add to cart icon} */}
                  <div className='animate-bounce'>
                    <BsCart4 size={25} />
                  </div>
                  <div className='font-semibold'>
                    <p>My Cart</p>
                  </div>
                </button>
              </div>
            </div>


          </div>
        )
      }
      {/* search area */}
      <div className='container mx-auto px-5 lg:hidden'>
        <Search />
      </div>
    </header>
  )
}

export default Header
