import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {

  return (<>
    <Header />
    <main className='min-h-[78vh]'>
      <Outlet />
      {/* <Home /> */}
    </main>
    <Footer />
  </>
  )
}

export default App;