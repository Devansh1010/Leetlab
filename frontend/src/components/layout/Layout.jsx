import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/NavbarTemp1'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="pt-20 px-6 pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
