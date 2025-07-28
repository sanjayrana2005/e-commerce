import React, { useState } from 'react'
import images from "../assets/images/index"
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobie from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
import UserMenu from './UserMenu';



const Header = () => {
  const [isMobile] = useMobie()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const redirectToLoginPage = () => {
    navigate("/login")
  }

  const handleCloseMenu = () => {
    setOpenUserMenu(false)
  }

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login")
      return
    }
    navigate("/user")
  }

  return (
    <header className='bg-white h-24 lg:h-20 lg:drop-shadow-md sticky top-0 flex flex-col justify-center gap-1 z-40'>
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
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                <FaRegCircleUser size={26} />
              </button>

              {/* Desktop Part */}
              <div className='hidden lg:flex items-center gap-10 '>
                {
                  user?._id ? (
                    <div className='relative'>
                      <div onClick={() => setOpenUserMenu(prev => !prev)} className='select-none flex items-center gap-1 cursor-pointer'>
                        <p>Account</p>
                        {
                          openUserMenu ?
                            (
                              <GoTriangleUp size={25} />
                            ) :
                            (
                              <GoTriangleDown size={25} />
                            )
                        }
                      </div>
                      {
                        openUserMenu && <div className='absolute right-0 top-12'>
                          <div className='bg-white rounded-md p-4 min-w-52 lg:shadow-lg'>
                            <UserMenu close={handleCloseMenu} />
                          </div>
                        </div>
                      }

                    </div>
                  ) : (
                    <button onClickCapture={redirectToLoginPage} className='text-lg px-2'>Login</button>
                  )
                }
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
