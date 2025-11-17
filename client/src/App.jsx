import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import SummaryApi from './common/summaryApi';
import Axios from './utils/Axios';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice';
import GlobalProvider from './provider/GlobalProvider';
import CartMobileLink from './components/CartMobileLink';

function App() {

  const dispatch = useDispatch()
  const location = useLocation()


  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    if(!userData) return;
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      }
      return error
    }
    finally {
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))

      }
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      }
      return error
    }
  }



  useEffect(() => {
     fetchCategory()
    fetchSubCategory()
    const token = localStorage.getItem("token");
    if (!token) return;
    fetchUser()
   
    // fetchCartItem()
  }, [])

  return (
    <GlobalProvider>
      <Header />
      <main className='min-h-[78vh]'>
        <Outlet />
        {/* <Home /> */}
      </main>
      <Footer />
      <Toaster
        position="top-right"
        containerStyle={{ top: '82px' }}
      />
      {
        location.pathname !== "/checkout" && (
          <CartMobileLink />
        )
      }
    </GlobalProvider>
  )
}

export default App;