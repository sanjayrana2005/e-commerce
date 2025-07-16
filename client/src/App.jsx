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

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }
  useEffect(() => {
    fetchUser()
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