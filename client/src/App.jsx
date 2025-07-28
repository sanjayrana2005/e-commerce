import { Outlet } from 'react-router-dom';
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
import { setAllCategory } from './store/productSlice';

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
        
      }
    } catch (error) {
      return error
    } 
  }


  useEffect(() => {
    fetchUser()
    fetchCategory()

  }, [])

  return (<>
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
  </>
  )
}

export default App;