import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/NavbarTemp1'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
