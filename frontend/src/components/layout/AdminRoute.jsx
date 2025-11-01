import React from 'react'
import useStore from '../../store/store'
import { Loader2 } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {

    const { authUser, checkAuth } = useStore()

    if (checkAuth) return <div className='flex justify-center h-screen'><Loader2 className=' animate-spin size-10'></Loader2></div>

    if (!authUser || authUser.role != "ADMIN") return <Navigate to={'/'} />

    return <Outlet/>
}
 
export default AdminRoute